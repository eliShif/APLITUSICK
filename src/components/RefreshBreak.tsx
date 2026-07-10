"use client";

import { useCallback, useEffect, useState } from "react";

interface BreakImage {
  id: string;
  url: string;
  kind: "dog" | "cat";
}

type Filter = "all" | "dog" | "cat";

async function fetchPets(kind: "dog" | "cat", count: number): Promise<BreakImage[]> {
  const res = await fetch(`/api/pets?kind=${kind}&count=${count}`);
  const data: { images: BreakImage[] } = await res.json();
  return data.images ?? [];
}

export function RefreshBreak() {
  const [images, setImages] = useState<BreakImage[]>([]);
  const [filter, setFilter] = useState<Filter>("all");
  const [loading, setLoading] = useState(false);
  const [lightbox, setLightbox] = useState<BreakImage | null>(null);
  const [autoRefresh, setAutoRefresh] = useState(true);

  const load = useCallback(async (f: Filter) => {
    setLoading(true);
    try {
      let next: BreakImage[] = [];
      if (f === "dog") next = await fetchPets("dog", 12);
      else if (f === "cat") next = await fetchPets("cat", 12);
      else {
        const [dogs, cats] = await Promise.all([fetchPets("dog", 6), fetchPets("cat", 6)]);
        next = [...dogs, ...cats].sort(() => Math.random() - 0.5);
      }
      setImages(next);
    } catch {
      // ignore - keep previous grid on network error
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    load(filter);
  }, [filter, load]);

  useEffect(() => {
    if (!autoRefresh) return;
    const interval = setInterval(() => load(filter), 20000);
    return () => clearInterval(interval);
  }, [autoRefresh, filter, load]);

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
      a.download = `${img.kind}-${img.id}.${ext}`;
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
          <h1 className="text-2xl font-bold">הפסקת התרעננות 🐶🐱</h1>
          <p className="text-sm text-neutral-500">קצת אוויר לראש בין נושא לנושא - התמונות מתעדכנות אוטומטית</p>
        </div>
        <div className="flex flex-wrap items-center gap-2">
          {([
            ["all", "הכל"],
            ["dog", "כלבים 🐶"],
            ["cat", "חתולים 🐱"],
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
            onClick={() => load(filter)}
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

      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 xl:grid-cols-5 gap-3">
        {images.map((img) => (
          <button
            key={img.id}
            onClick={() => setLightbox(img)}
            className="group relative aspect-square overflow-hidden rounded-xl border border-black/10 dark:border-white/10 bg-black/5"
          >
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={img.url}
              alt={img.kind === "dog" ? "כלב רנדומלי" : "חתול רנדומלי"}
              loading="lazy"
              className="h-full w-full object-cover transition group-hover:scale-105"
            />
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
              alt={lightbox.kind === "dog" ? "כלב רנדומלי" : "חתול רנדומלי"}
              className="max-h-[80vh] w-auto rounded-xl object-contain"
            />
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
