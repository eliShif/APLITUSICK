"use client";

import { useEffect, useRef, useState } from "react";
import type { Molecule } from "@/content/types";

type ViewerStyle = "stick" | "sphere" | "line";

interface GLViewerLike {
  clear: () => void;
  addModel: (data: string, format: string) => void;
  setStyle: (sel: object, style: object) => void;
  zoomTo: () => void;
  render: () => void;
  resize: () => void;
  spin: (axis: string | boolean) => void;
}

export function Molecule3DViewer({ molecule }: { molecule: Molecule }) {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const viewerRef = useRef<GLViewerLike | null>(null);
  const [status, setStatus] = useState<"loading" | "ready" | "error">(
    molecule.pubchemCid ? "loading" : "error"
  );
  const [style, setStyle] = useState<ViewerStyle>("stick");
  const [spinning, setSpinning] = useState(false);

  useEffect(() => {
    let cancelled = false;
    if (!molecule.pubchemCid || !containerRef.current) return;

    async function load() {
      try {
        const [$3Dmol, sdfRes] = await Promise.all([
          import("3dmol"),
          fetch(
            `https://pubchem.ncbi.nlm.nih.gov/rest/pug/compound/cid/${molecule.pubchemCid}/record/SDF/?record_type=3d`
          ),
        ]);
        if (!sdfRes.ok) throw new Error("pubchem fetch failed");
        const sdf = await sdfRes.text();
        if (cancelled || !containerRef.current) return;

        const viewer = $3Dmol.createViewer(containerRef.current, {
          backgroundColor: "0xffffff",
        }) as unknown as GLViewerLike;
        viewer.addModel(sdf, "sdf");
        viewer.setStyle({}, { stick: { radius: 0.15 }, sphere: { scale: 0.25 } });
        viewer.zoomTo();
        viewer.render();
        viewerRef.current = viewer;
        setStatus("ready");
      } catch {
        if (!cancelled) setStatus("error");
      }
    }

    load();
    return () => {
      cancelled = true;
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [molecule.pubchemCid]);

  useEffect(() => {
    const viewer = viewerRef.current;
    if (!viewer || status !== "ready") return;
    if (style === "stick") {
      viewer.setStyle({}, { stick: { radius: 0.15 }, sphere: { scale: 0.25 } });
    } else if (style === "sphere") {
      viewer.setStyle({}, { sphere: { scale: 0.9 } });
    } else {
      viewer.setStyle({}, { line: { linewidth: 3 } });
    }
    viewer.render();
  }, [style, status]);

  useEffect(() => {
    const viewer = viewerRef.current;
    if (!viewer || status !== "ready") return;
    viewer.spin(spinning ? "y" : false);
  }, [spinning, status]);

  return (
    <div className="rounded-xl border border-black/10 dark:border-white/10 bg-white dark:bg-neutral-900 overflow-hidden">
      <div className="flex items-center justify-between gap-2 px-3 py-2 border-b border-black/10 dark:border-white/10 text-sm">
        <div className="font-semibold">
          {molecule.name}
          {molecule.formula && (
            <span className="text-neutral-500 font-normal"> · {molecule.formula}</span>
          )}
        </div>
        {status === "ready" && (
          <div className="flex items-center gap-1">
            {(["stick", "sphere", "line"] as ViewerStyle[]).map((s) => (
              <button
                key={s}
                onClick={() => setStyle(s)}
                className={`rounded-full px-2 py-1 text-xs transition ${
                  style === s
                    ? "bg-emerald-600 text-white"
                    : "bg-black/5 dark:bg-white/10 hover:bg-black/10"
                }`}
              >
                {s === "stick" ? "מוטות" : s === "sphere" ? "כדורים" : "קווים"}
              </button>
            ))}
            <button
              onClick={() => setSpinning((v) => !v)}
              className={`rounded-full px-2 py-1 text-xs transition ${
                spinning ? "bg-emerald-600 text-white" : "bg-black/5 dark:bg-white/10 hover:bg-black/10"
              }`}
            >
              {spinning ? "עצור סיבוב" : "סובב"}
            </button>
          </div>
        )}
      </div>

      <div className="relative h-64 sm:h-72">
        {status === "loading" && (
          <div className="absolute inset-0 flex items-center justify-center text-sm text-neutral-500">
            טוען מודל תלת-ממדי…
          </div>
        )}
        {status === "error" && (
          <div className="absolute inset-0 flex flex-col items-center justify-center gap-1 text-center px-4 text-sm text-neutral-500">
            <span className="text-3xl">🧪</span>
            <span>אין חיבור לאינטרנט / לא נמצא מודל תלת-ממדי עבור {molecule.name}</span>
            {molecule.formula && <span className="font-mono">{molecule.formula}</span>}
          </div>
        )}
        <div ref={containerRef} className="absolute inset-0" />
      </div>
      {molecule.caption && (
        <div className="px-3 py-2 text-xs text-neutral-500 border-t border-black/10 dark:border-white/10">
          {molecule.caption}
        </div>
      )}
    </div>
  );
}
