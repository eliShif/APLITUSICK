"use client";

import { useCallback, useEffect, useRef, useState } from "react";

interface BreakImage {
  id: string;
  url: string;
  kind: "dog" | "cat" | "funny";
  caption?: string;
}

type Filter = "all" | "dog" | "cat" | "funny";

const MIN_ITEM_PX = 150;
const GRID_GAP_PX = 12;
const MAX_TOTAL = 40;

async function fetchPets(kind: "dog" | "cat" | "funny", count: number): Promise<BreakImage[]> {
  const res = await fetch(`/api/pets?kind=${kind}&count=${count}`);
  const data: { images: BreakImage[] } = await res.json();
  return data.images ?? [];
}

/** מודד את הרוחב/גובה הפנויים של הגריד ומחשב כמה עמודות/שורות מלאות נכנסות בלי גלילה. */
function useGridCapacity(gridRef: React.RefObject<HTMLDivElement | null>) {
  const [capacity, setCapacity] = useState({ columns: 2, rows: 3 });

  const recompute = useCallback(() => {
    const el = gridRef.current;
    if (!el) return;
    const width = el.clientWidth;
    if (width <= 0) return;

    const columns = Math.max(2, Math.floor((width + GRID_GAP_PX) / (MIN_ITEM_PX + GRID_GAP_PX)));
    const itemSize = (width - (columns - 1) * GRID_GAP_PX) / columns;

    const top = el.getBoundingClientRect().top;
    const availableHeight = window.innerHeight - top - 16;
    const rows = Math.max(1, Math.floor((availableHeight + GRID_GAP_PX) / (itemSize + GRID_GAP_PX)));

    setCapacity((prev) => (prev.columns === columns && prev.rows === rows ? prev : { columns, rows }));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    recompute();
    const onResize = () => recompute();
    window.addEventListener("resize", onResize);
    window.addEventListener("orientationchange", onResize);
    const ro = new ResizeObserver(() => recompute());
    if (gridRef.current) ro.observe(gridRef.current);
    return () => {
      window.removeEventListener("resize", onResize);
      window.removeEventListener("orientationchange", onResize);
      ro.disconnect();
    };
  }, [recompute, gridRef]);

  return capacity;
}

export function RefreshBreak() {
  const [images, setImages] = useState<BreakImage[]>([]);
  const [filter, setFilter] = useState<Filter>("all");
  const [loading, setLoading] = useState(false);
  const [lightbox, setLightbox] = useState<BreakImage | null>(null);
  const [autoRefresh, setAutoRefresh] = useState(true);

  const gridRef = useRef<HTMLDivElement | null>(null);
  const { columns, rows } = useGridCapacity(gridRef);
  const total = Math.min(MAX_TOTAL, columns * rows);

  // עוקב אחרי בקשת הטעינה העדכנית ביותר - כדי שתשובה איטית מפילטר קודם (כמו
  // "הכל" שדורש 3 קריאות מקבילות) לא תדרוס תוצאה שכבר הגיעה מפילטר מאוחר יותר.
  const requestIdRef = useRef(0);

  const load = useCallback(async (f: Filter, count: number, cols: number) => {
    const requestId = ++requestIdRef.current;
    setLoading(true);
    try {
      let next: BreakImage[] = [];
      if (f === "dog" || f === "cat" || f === "funny") {
        next = await fetchPets(f, count);
      } else {
        const third = Math.ceil(count / 3);
        const [dogs, cats, funny] = await Promise.all([
          fetchPets("dog", third),
          fetchPets("cat", third),
          fetchPets("funny", third),
        ]);
        next = [...dogs, ...cats, ...funny].sort(() => Math.random() - 0.5).slice(0, count);
      }
      if (requestId !== requestIdRef.current) return; // בקשה ישנה - יש תוצאה עדכנית יותר בדרך/שכבר הגיעה
      // חיתוך לשורות מלאות בלבד - אם המקור החזיר פחות תמונות מהמבוקש (למשל
      // בפילטר "מצחיקים" עם היצע דל), עדיף להציג פחות תמונות בשורה שלמה
      // מאשר שורה אחרונה חסרה.
      const fullRows = Math.floor(next.length / cols) * cols;
      setImages(fullRows > 0 ? next.slice(0, fullRows) : next);
    } catch {
      // ignore - keep previous grid on network error
    } finally {
      if (requestId === requestIdRef.current) setLoading(false);
    }
  }, []);

  useEffect(() => {
    load(filter, total, columns);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [filter, total, columns]);

  useEffect(() => {
    if (!autoRefresh) return;
    const interval = setInterval(() => load(filter, total, columns), 20000);
    return () => clearInterval(interval);
  }, [autoRefresh, filter, total, columns, load]);

  useEffect(() => {
    if (!lightbox) return;
    function onKey(e: KeyboardEvent) {
      if (e.key === "Escape") setLightbox(null);
    }
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [lightbox]);

  async function download(img: BreakImage) {
    try {
      const res = await fetch(img.url, { mode: "cors" });
      const blob = await res.blob();
      const objectUrl = URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = objectUrl;
      const ext = img.url.split(".").pop()?.split("?")[0] || "jpg";
      a.download = `${img.kind}-${img.id.replace(/[^a-z0-9]/gi, "").slice(-10)}.${ext}`;
      document.body.appendChild(a);
      a.click();
      a.remove();
      URL.revokeObjectURL(objectUrl);
    } catch {
      window.open(img.url, "_blank", "noopener,noreferrer");
    }
  }

  return (
    <div className="space-y-4">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div>
          <h1 className="text-2xl font-extrabold tracking-tight">הפסקת התרעננות 🐶🐱</h1>
          <p className="text-sm text-neutral-500 mt-1">
            קצת אוויר לראש בין נושא לנושא - תמונות חמודות ומצחיקות שמתעדכנות אוטומטית
          </p>
        </div>
        <div className="flex flex-wrap items-center gap-2">
          {([
            ["all", "הכל"],
            ["dog", "כלבים 🐶"],
            ["cat", "חתולים 🐱"],
            ["funny", "מצחיקים 🤣"],
          ] as [Filter, string][]).map(([val, label]) => (
            <button
              key={val}
              onClick={() => setFilter(val)}
              className={`rounded-full px-3 py-1.5 text-sm transition ${
                filter === val
                  ? "bg-emerald-600 text-white"
                  : "bg-black/5 dark:bg-white/10 hover:bg-black/10"
              }`}
            >
              {label}
            </button>
          ))}
          <button
            onClick={() => load(filter, total, columns)}
            disabled={loading}
            className="rounded-full bg-neutral-800 dark:bg-white/10 text-white px-3 py-1.5 text-sm font-semibold hover:opacity-90 disabled:opacity-50"
          >
            {loading ? "טוען…" : "עוד תמונות"}
          </button>
          <button
            onClick={() => setAutoRefresh((v) => !v)}
            className={`rounded-full px-3 py-1.5 text-sm transition ${
              autoRefresh ? "bg-emerald-600/20 text-emerald-700 dark:text-emerald-400" : "bg-black/5 dark:bg-white/10"
            }`}
          >
            {autoRefresh ? "רענון אוטומטי: פעיל" : "רענון אוטומטי: כבוי"}
          </button>
        </div>
      </div>

      <div
        ref={gridRef}
        className="grid"
        style={{ gridTemplateColumns: `repeat(${columns}, minmax(0, 1fr))`, gap: GRID_GAP_PX }}
      >
        {images.map((img) => (
          <button
            key={img.id}
            onClick={() => setLightbox(img)}
            className="group relative aspect-square overflow-hidden rounded-xl border border-black/10 dark:border-white/10 bg-black/5"
          >
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={img.url}
              alt={img.caption ?? (img.kind === "dog" ? "כלב רנדומלי" : img.kind === "cat" ? "חתול רנדומלי" : "תמונה מצחיקה")}
              loading="lazy"
              className="h-full w-full object-cover transition group-hover:scale-105"
            />
            {img.kind === "funny" && img.caption && (
              <span className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/75 to-transparent px-2 pb-1.5 pt-4 text-right text-[11px] font-semibold text-white line-clamp-2">
                {img.caption}
              </span>
            )}
            <span className="absolute bottom-1 left-1 rounded-full bg-black/50 px-2 py-0.5 text-xs text-white opacity-0 transition group-hover:opacity-100">
              הגדל
            </span>
          </button>
        ))}
      </div>

      {lightbox && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 p-4"
          onClick={() => setLightbox(null)}
        >
          <div className="relative max-h-full max-w-3xl" onClick={(e) => e.stopPropagation()}>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={lightbox.url}
              alt={lightbox.caption ?? (lightbox.kind === "dog" ? "כלב רנדומלי" : lightbox.kind === "cat" ? "חתול רנדומלי" : "תמונה מצחיקה")}
              className="max-h-[75vh] w-auto rounded-xl object-contain"
            />
            {lightbox.caption && (
              <p className="mt-2 text-center text-sm text-white/90">{lightbox.caption}</p>
            )}
            <div className="mt-3 flex justify-center gap-3">
              <button
                onClick={() => download(lightbox)}
                className="rounded-full bg-emerald-600 text-white px-5 py-2 text-sm font-semibold hover:bg-emerald-700"
              >
                הורדה ⬇️
              </button>
              <button
                onClick={() => setLightbox(null)}
                className="rounded-full bg-white/10 text-white px-5 py-2 text-sm font-semibold hover:bg-white/20"
              >
                סגירה ✕
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
