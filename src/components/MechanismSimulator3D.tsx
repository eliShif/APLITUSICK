"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { captionForT, type Mechanism3DFrame, type Mechanism3DMeta } from "@/content/mechanisms3d/schema";

interface ScreenPt {
  x: number;
  y: number;
}

interface GLViewerLike {
  addModelsAsFrames: (data: string, format: string) => void;
  setStyle: (sel: object, style: object) => void;
  setFrame: (i: number) => void;
  zoomTo: () => void;
  render: () => void;
  getView: () => number[];
  setView: (view: number[]) => void;
  modelToScreen: (coords: ScreenPt[]) => ScreenPt[];
}

function frameToXyzBlock(frame: Mechanism3DFrame, title: string): string {
  const lines = [String(frame.atoms.length), title];
  for (const a of frame.atoms) {
    lines.push(`${a.el} ${a.pos[0].toFixed(4)} ${a.pos[1].toFixed(4)} ${a.pos[2].toFixed(4)}`);
  }
  return lines.join("\n");
}

/** דעיכת אטימות רכה בקצוות טווח הפעילות של חץ, כדי שלא "יקפוץ" פנימה/החוצה בפתאומיות. */
function arrowOpacity(t: number, from: number, to: number): number {
  const fade = 0.12;
  if (t < from - fade || t > to + fade) return 0.12;
  if (t < from) return 0.12 + (0.88 * (t - (from - fade))) / fade;
  if (t > to) return 1 - (0.88 * (t - to)) / fade;
  return 1;
}

const PLAYBACK_MS = 3200;

/**
 * סימולטור מנגנון תלת-ממדי גנרי - מונע נתונים (Mechanism3DMeta), לשימוש חוזר בכל המנגנונים.
 * כל הפריימים נטענים פעם אחת כ-multi-frame model (viewer.addModelsAsFrames) ומוצגים דרך
 * viewer.setFrame(i) - זול בהרבה מ-clear+addModel בכל טיק, ומאפשר ניגון חלק בקצב אמיתי
 * (requestAnimationFrame לפי זמן שחלף, לא setInterval קבוע). המשתמש יכול לסובב את המצלמה
 * חופשי בכל עת (גרירה בעכבר, ברירת המחדל של 3Dmol) - גם בזמן ניגון וגם כשעצור - בלי שהקוד
 * "יילחם" בסיבוב ויאפס אותו: חצי/תוויות ה-2D מחושבים מחדש בכל פריים לפי המצלמה הנוכחית
 * בפועל (viewer.modelToScreen), כך שהם נשארים מסונכרנים לאן שהמולקולה הסתובבה אליה.
 */
export function MechanismSimulator3D({ mechanism }: { mechanism: Mechanism3DMeta }) {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const viewerRef = useRef<GLViewerLike | null>(null);
  const initialViewRef = useRef<number[] | null>(null);
  const rectRef = useRef<DOMRect | null>(null);
  const rafRef = useRef<number | null>(null);
  const playStartRef = useRef<number>(0);
  const lastPtsRef = useRef<Map<number, ScreenPt> | null>(null);

  const [ready, setReady] = useState(false);
  const [frameIndex, setFrameIndex] = useState(0);
  const [playing, setPlaying] = useState(false);
  const [screenPts, setScreenPts] = useState<Map<number, ScreenPt> | null>(null);

  // כל האטומים שצריך למקם על המסך: אלו שיש להם תווית (roles) וגם כל קצה חץ (arrows) -
  // חץ יכול להצביע לאטום "טכני" (כמו הפחמן המרכזי) שאין לו תווית משלו.
  const trackedIndicesRef = useRef<number[]>([]);
  trackedIndicesRef.current = Array.from(
    new Set([...mechanism.roles.map((r) => r.index), ...mechanism.arrows.flatMap((a) => [a.fromIndex, a.toIndex])])
  );

  useEffect(() => {
    let cancelled = false;
    setReady(false);
    setFrameIndex(0);
    setPlaying(false);
    initialViewRef.current = null;
    rectRef.current = null;
    lastPtsRef.current = null;

    async function init() {
      const $3Dmol = await import("3dmol");
      if (cancelled || !containerRef.current) return;
      const viewer = $3Dmol.createViewer(containerRef.current, {
        backgroundColor: "0xffffff",
      }) as unknown as GLViewerLike;
      const allFrames = mechanism.frames.map((f) => frameToXyzBlock(f, mechanism.slug)).join("\n");
      viewer.addModelsAsFrames(allFrames, "xyz");
      viewer.setStyle({}, { stick: { radius: 0.12 }, sphere: { scale: 0.28 } });
      viewer.zoomTo();
      viewer.render();
      initialViewRef.current = viewer.getView();
      viewerRef.current = viewer;
      if (!cancelled) setReady(true);
    }
    init();
    return () => {
      cancelled = true;
    };
  }, [mechanism]);

  // מחשב מחדש את מיקומי ה-overlay (חצים/תוויות) לפי מצב המצלמה הנוכחי בפועל - בלי לגעת
  // בפריים/רינדור של המולקולה עצמה. נקרא גם מתוך renderFrame (כשמחליפים פריים) וגם
  // מלולאת ה"מעקב סיבוב" למטה (כשהמשתמש גורר בעכבר בלי לשנות פריים כלל).
  const updateOverlay = useCallback(
    (i: number) => {
      const viewer = viewerRef.current;
      const container = containerRef.current;
      if (!viewer || !container) return;
      i = Math.min(i, mechanism.frames.length - 1);
      const frame = mechanism.frames[i];
      if (!rectRef.current) rectRef.current = container.getBoundingClientRect();
      const rect = rectRef.current;
      const indices = trackedIndicesRef.current;
      const pts = indices.map((idx) => {
        const a = frame.atoms[idx];
        return { x: a.pos[0], y: a.pos[1], z: a.pos[2] };
      });
      const screen = viewer.modelToScreen(pts as unknown as ScreenPt[]);
      const toLocal = (p: ScreenPt): ScreenPt => ({
        x: p.x - rect.left - window.scrollX,
        y: p.y - rect.top - window.scrollY,
      });
      const map = new Map<number, ScreenPt>();
      indices.forEach((idx, i) => map.set(idx, toLocal(screen[i])));

      // מדלגים על עדכון state כשכלום לא זז (למשל בזמן שהמשתמש לא גורר) - כדי שהלולאה
      // הרציפה למטה לא תגרום ל-re-render מיותר 60 פעם בשנייה כשהתצוגה במנוחה.
      const prev = lastPtsRef.current;
      const changed =
        !prev ||
        prev.size !== map.size ||
        Array.from(map.entries()).some(([idx, p]) => {
          const q = prev.get(idx);
          return !q || Math.abs(q.x - p.x) > 0.4 || Math.abs(q.y - p.y) > 0.4;
        });
      if (!changed) return;
      lastPtsRef.current = map;
      setScreenPts(map);
    },
    [mechanism]
  );

  const renderFrame = useCallback(
    (i: number) => {
      const viewer = viewerRef.current;
      if (!viewer) return;
      i = Math.min(i, mechanism.frames.length - 1);
      viewer.setFrame(i);
      viewer.render();
      updateOverlay(i);
    },
    [mechanism, updateOverlay]
  );

  useEffect(() => {
    if (ready) renderFrame(frameIndex);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [ready, frameIndex, renderFrame]);

  // כשלא מנגנים, עוקבים ברקע אחרי סיבוב שהמשתמש עושה בעכבר/מגע (שלא עובר דרך React בכלל
  // - 3Dmol מטפל בגרירה ישירות על ה-canvas) ומעדכנים את מיקום ה-overlay בהתאם, כך שהחצים
  // והתוויות לא "יקפאו" במקום הישן אחרי שהאנימציה נגמרה/בזמן שהיא בהשהיה.
  useEffect(() => {
    if (!ready || playing) return;
    let raf: number;
    function loop() {
      updateOverlay(frameIndex);
      raf = requestAnimationFrame(loop);
    }
    raf = requestAnimationFrame(loop);
    return () => cancelAnimationFrame(raf);
  }, [ready, playing, frameIndex, updateOverlay]);

  useEffect(() => {
    if (!playing) return;
    rectRef.current = containerRef.current?.getBoundingClientRect() ?? null;
    const totalFrames = mechanism.frames.length;
    const startFrame = frameIndex;
    playStartRef.current = performance.now();
    const remainingMs = ((totalFrames - 1 - startFrame) / (totalFrames - 1)) * PLAYBACK_MS;

    function tick(now: number) {
      const elapsed = now - playStartRef.current;
      const progress = remainingMs > 0 ? Math.min(1, elapsed / remainingMs) : 1;
      const nextIndex = Math.round(startFrame + progress * (totalFrames - 1 - startFrame));
      setFrameIndex(nextIndex);
      if (progress >= 1) {
        setPlaying(false);
        return;
      }
      rafRef.current = requestAnimationFrame(tick);
    }
    rafRef.current = requestAnimationFrame(tick);
    return () => {
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [playing, mechanism]);

  // frameIndex may briefly point past the end of a just-switched-to mechanism with fewer
  // frames (the reset-to-0 effect runs after this render, not before) - clamp defensively.
  const safeFrameIndex = Math.min(frameIndex, mechanism.frames.length - 1);
  const t = mechanism.frames[safeFrameIndex].t;

  return (
    <div className="rounded-xl border border-black/10 dark:border-white/10 bg-white dark:bg-neutral-900 overflow-hidden">
      <div className="flex flex-wrap items-center justify-between gap-2 px-3 py-2 border-b border-black/10 dark:border-white/10 text-sm">
        <div className="font-semibold">{mechanism.title}</div>
        <button
          onClick={() => {
            const viewer = viewerRef.current;
            if (viewer && initialViewRef.current) viewer.setView(initialViewRef.current);
          }}
          className="rounded-full px-3 py-1 text-xs transition bg-black/5 dark:bg-white/10 hover:bg-black/10"
        >
          🔄 איפוס תצוגה
        </button>
      </div>

      <div className="relative h-80 sm:h-96" ref={containerRef}>
        {!ready && (
          <div className="absolute inset-0 flex items-center justify-center text-sm text-neutral-500">
            טוען מודל תלת-ממדי…
          </div>
        )}
        <div className="absolute bottom-2 right-2 rounded-full bg-black/50 text-white text-xs px-3 py-1 pointer-events-none">
          גררו כדי לסובב
        </div>
        {screenPts && (
          <svg className="absolute inset-0 pointer-events-none z-10" width="100%" height="100%">
            <defs>
              <marker id="arrow-3d-pair" viewBox="0 0 10 10" refX="8" refY="5" markerWidth="6" markerHeight="6" orient="auto-start-reverse">
                <path d="M0,0 L10,5 L0,10 z" fill="#111827" />
              </marker>
              <marker id="arrow-3d-fishhook" viewBox="0 0 10 10" refX="8" refY="5" markerWidth="7" markerHeight="7" orient="auto-start-reverse">
                <path d="M0,5 L10,5 L0,0 z" fill="#111827" />
              </marker>
            </defs>
            {mechanism.arrows.map((arrow, i) => {
              const from = screenPts.get(arrow.fromIndex);
              const to = screenPts.get(arrow.toIndex);
              if (!from || !to) return null;
              const midX = (from.x + to.x) / 2;
              const midY = Math.min(from.y, to.y) - 30;
              return (
                <path
                  key={i}
                  d={`M ${from.x} ${from.y - 12} Q ${midX} ${midY} ${to.x} ${to.y - 12}`}
                  fill="none"
                  stroke={arrow.color}
                  strokeWidth={2}
                  markerEnd={`url(#arrow-3d-${arrow.style === "fishhook" ? "fishhook" : "pair"})`}
                  opacity={arrowOpacity(t, arrow.activeFrom, arrow.activeTo)}
                />
              );
            })}
            {mechanism.roles.map((role, i) => {
              const p = screenPts.get(role.index);
              if (!p) return null;
              const charge = role.chargeWindows?.find((w) => t >= w.from && t <= w.to)?.charge ?? null;
              const showDelta = role.deltaWindow && t >= role.deltaWindow.from && t <= role.deltaWindow.to;
              return (
                <g key={i}>
                  {showDelta && (
                    <text x={p.x} y={p.y - 32} textAnchor="middle" fontSize={11} fill={role.color} style={{ direction: "ltr" }}>
                      δ{role.deltaWindow!.sign}
                    </text>
                  )}
                  <text x={p.x} y={p.y - 20} textAnchor="middle" fontSize={14} fontWeight={700} fill={role.color} style={{ direction: "ltr" }}>
                    {role.label}
                    {charge}
                  </text>
                </g>
              );
            })}
          </svg>
        )}
      </div>

      <div className="px-3 py-2 border-t border-black/10 dark:border-white/10">
        <div className="text-xs text-neutral-500 mb-2 min-h-8">{captionForT(mechanism.captions, t)}</div>
        <div className="flex items-center gap-2">
          <button
            onClick={() => {
              if (frameIndex >= mechanism.frames.length - 1) setFrameIndex(0);
              setPlaying((v) => !v);
            }}
            className="rounded-full px-3 py-1.5 text-sm bg-emerald-600 text-white hover:bg-emerald-700 transition shrink-0"
          >
            {playing ? "⏸ עצור" : "▶ נגן"}
          </button>
          <input
            type="range"
            min={0}
            max={mechanism.frames.length - 1}
            value={frameIndex}
            onChange={(e) => {
              setPlaying(false);
              setFrameIndex(Number(e.target.value));
            }}
            className="flex-1"
          />
          <span className="text-xs text-neutral-500 w-16 text-left shrink-0" dir="ltr">
            {Math.round(t * 100)}%
          </span>
        </div>
      </div>
    </div>
  );
}
