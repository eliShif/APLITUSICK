"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { SN2_MECHANISM_3D, sn2StepCaption, SN2_ATOM_INDEX, type Mechanism3DFrame } from "@/content/mechanisms3d/sn2";

interface ScreenPt {
  x: number;
  y: number;
}

interface GLViewerLike {
  clear: () => void;
  addModel: (data: string, format: string) => void;
  setStyle: (sel: object, style: object) => void;
  zoomTo: () => void;
  render: () => void;
  getView: () => number[];
  setView: (view: number[]) => void;
  modelToScreen: (coords: ScreenPt[]) => ScreenPt[];
}

function frameToXyz(frame: Mechanism3DFrame): string {
  const lines = [String(frame.atoms.length), "sn2"];
  for (const a of frame.atoms) {
    lines.push(`${a.el} ${a.pos[0].toFixed(4)} ${a.pos[1].toFixed(4)} ${a.pos[2].toFixed(4)}`);
  }
  return lines.join("\n");
}

const FRAME_MS = 45;

/**
 * סימולטור מנגנון תלת-ממדי - דוגמת ייחוס ל-SN2. מציג רצף פריימים אמיתיים (RDKit, ראו
 * src/content/mechanisms3d/sn2-frames.json) עם 3Dmol.js, ומצלמה נעולה בזווית קבועה בזמן
 * ניגון ("מצב צפייה") כדי שכתובת/חצים 2D (מחושבים דרך viewer.modelToScreen) יישארו מסונכרנים
 * למיקום האטומים על המסך. "מצב חקירה" עוצר את הניגון ומאפשר סיבוב חופשי בעכבר, בלי overlay.
 */
export function MechanismSimulator3D() {
  const data = SN2_MECHANISM_3D;
  const containerRef = useRef<HTMLDivElement | null>(null);
  const viewerRef = useRef<GLViewerLike | null>(null);
  const fixedViewRef = useRef<number[] | null>(null);
  const [ready, setReady] = useState(false);
  const [frameIndex, setFrameIndex] = useState(0);
  const [playing, setPlaying] = useState(false);
  const [exploring, setExploring] = useState(false);
  const [overlay, setOverlay] = useState<{ c: ScreenPt; lg: ScreenPt; nu: ScreenPt } | null>(null);

  useEffect(() => {
    let cancelled = false;
    async function init() {
      const $3Dmol = await import("3dmol");
      if (cancelled || !containerRef.current) return;
      const viewer = $3Dmol.createViewer(containerRef.current, {
        backgroundColor: "0xffffff",
      }) as unknown as GLViewerLike;
      viewer.addModel(frameToXyz(data.frames[0]), "xyz");
      viewer.setStyle({}, { stick: { radius: 0.12 }, sphere: { scale: 0.28 } });
      viewer.zoomTo();
      viewer.render();
      fixedViewRef.current = viewer.getView();
      viewerRef.current = viewer;
      if (!cancelled) setReady(true);
    }
    init();
    return () => {
      cancelled = true;
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const renderFrame = useCallback(
    (i: number, keepExploreView: boolean) => {
      const viewer = viewerRef.current;
      const container = containerRef.current;
      if (!viewer || !container) return;
      const frame = data.frames[i];
      viewer.clear();
      viewer.addModel(frameToXyz(frame), "xyz");
      viewer.setStyle({}, { stick: { radius: 0.12 }, sphere: { scale: 0.28 } });
      if (fixedViewRef.current && !keepExploreView) viewer.setView(fixedViewRef.current);
      viewer.render();

      if (keepExploreView) {
        setOverlay(null);
        return;
      }
      const atoms = [
        frame.atoms[SN2_ATOM_INDEX.C],
        frame.atoms[SN2_ATOM_INDEX.LG],
        frame.atoms[SN2_ATOM_INDEX.NU],
      ];
      const pts = atoms.map((a) => ({ x: a.pos[0], y: a.pos[1], z: a.pos[2] }));
      const screen = viewer.modelToScreen(pts as unknown as ScreenPt[]);
      const rect = container.getBoundingClientRect();
      const toLocal = (p: ScreenPt): ScreenPt => ({
        x: p.x - rect.left - window.scrollX,
        y: p.y - rect.top - window.scrollY,
      });
      setOverlay({ c: toLocal(screen[0]), lg: toLocal(screen[1]), nu: toLocal(screen[2]) });
    },
    [data.frames]
  );

  useEffect(() => {
    if (ready) renderFrame(frameIndex, exploring);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [ready, frameIndex, renderFrame, exploring]);

  useEffect(() => {
    if (!playing || exploring) return;
    const id = setInterval(() => {
      setFrameIndex((i) => {
        if (i >= data.frames.length - 1) {
          setPlaying(false);
          return i;
        }
        return i + 1;
      });
    }, FRAME_MS);
    return () => clearInterval(id);
  }, [playing, exploring, data.frames.length]);

  const t = data.frames[frameIndex].t;
  const nuCharge = t < 0.06 ? "−" : null; // ⁻ על ה-Nu רק כשעדיין לא נוצר קשר
  const lgCharge = t > 0.94 ? "−" : null; // ⁻ על ה-LG רק אחרי שהקשר נותק לגמרי
  const showDelta = t >= 0.06 && t <= 0.94;

  return (
    <div className="rounded-xl border border-black/10 dark:border-white/10 bg-white dark:bg-neutral-900 overflow-hidden">
      <div className="flex flex-wrap items-center justify-between gap-2 px-3 py-2 border-b border-black/10 dark:border-white/10 text-sm">
        <div className="font-semibold">{data.title}</div>
        <button
          onClick={() => {
            setPlaying(false);
            setExploring((v) => !v);
          }}
          className={`rounded-full px-3 py-1 text-xs transition ${
            exploring ? "bg-emerald-600 text-white" : "bg-black/5 dark:bg-white/10 hover:bg-black/10"
          }`}
        >
          {exploring ? "חזרה למצב צפייה" : "🔄 מצב חקירה (סיבוב חופשי)"}
        </button>
      </div>

      <div className="relative h-80 sm:h-96" ref={containerRef}>
        {!ready && (
          <div className="absolute inset-0 flex items-center justify-center text-sm text-neutral-500">
            טוען מודל תלת-ממדי…
          </div>
        )}
        {overlay && !exploring && (
          <svg className="absolute inset-0 pointer-events-none" width="100%" height="100%">
            <defs>
              <marker id="arrow-3d" viewBox="0 0 10 10" refX="8" refY="5" markerWidth="6" markerHeight="6" orient="auto-start-reverse">
                <path d="M0,0 L10,5 L0,10 z" fill="#111827" />
              </marker>
            </defs>
            {/* חץ אלקטרונים: זוג בודד של Nu אל C */}
            <path
              d={`M ${overlay.nu.x} ${overlay.nu.y - 14} Q ${(overlay.nu.x + overlay.c.x) / 2} ${Math.min(overlay.nu.y, overlay.c.y) - 30} ${overlay.c.x - 10} ${overlay.c.y}`}
              fill="none"
              stroke="#1d4ed8"
              strokeWidth={2}
              markerEnd="url(#arrow-3d)"
              opacity={t < 0.6 ? 1 : 0.15}
            />
            {/* חץ אלקטרונים: קשר C-LG אל LG */}
            <path
              d={`M ${overlay.c.x + 10} ${overlay.c.y} Q ${(overlay.c.x + overlay.lg.x) / 2} ${Math.min(overlay.lg.y, overlay.c.y) - 30} ${overlay.lg.x} ${overlay.lg.y - 14}`}
              fill="none"
              stroke="#b45309"
              strokeWidth={2}
              markerEnd="url(#arrow-3d)"
              opacity={t > 0.4 ? 1 : 0.15}
            />
            {showDelta && (
              <text x={overlay.nu.x} y={overlay.nu.y - 32} textAnchor="middle" fontSize={11} fill="#1d4ed8" style={{ direction: "ltr" }}>
                δ−
              </text>
            )}
            <text x={overlay.nu.x} y={overlay.nu.y - 20} textAnchor="middle" fontSize={14} fontWeight={700} fill="#1d4ed8" style={{ direction: "ltr" }}>
              Nu{nuCharge}
            </text>
            {showDelta && (
              <text x={overlay.lg.x} y={overlay.lg.y - 32} textAnchor="middle" fontSize={11} fill="#b45309" style={{ direction: "ltr" }}>
                δ−
              </text>
            )}
            <text x={overlay.lg.x} y={overlay.lg.y - 20} textAnchor="middle" fontSize={14} fontWeight={700} fill="#b45309" style={{ direction: "ltr" }}>
              LG{lgCharge}
            </text>
          </svg>
        )}
        {exploring && (
          <div className="absolute bottom-2 right-2 rounded-full bg-black/60 text-white text-xs px-3 py-1">
            גררו כדי לסובב · הסימולציה מושהית
          </div>
        )}
      </div>

      <div className="px-3 py-2 border-t border-black/10 dark:border-white/10">
        <div className="text-xs text-neutral-500 mb-2 min-h-8">{sn2StepCaption(t)}</div>
        <div className="flex items-center gap-2">
          <button
            onClick={() => {
              if (frameIndex >= data.frames.length - 1) setFrameIndex(0);
              setExploring(false);
              setPlaying((v) => !v);
            }}
            className="rounded-full px-3 py-1.5 text-sm bg-emerald-600 text-white hover:bg-emerald-700 transition shrink-0"
          >
            {playing ? "⏸ עצור" : "▶ נגן"}
          </button>
          <input
            type="range"
            min={0}
            max={data.frames.length - 1}
            value={frameIndex}
            disabled={exploring}
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
