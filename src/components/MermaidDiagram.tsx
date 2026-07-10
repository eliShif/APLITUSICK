"use client";

import { useEffect, useId, useRef, useState } from "react";

export function MermaidDiagram({ chart, title, note }: { chart: string; title?: string; note?: string }) {
  const ref = useRef<HTMLDivElement | null>(null);
  const rawId = useId().replace(/:/g, "");
  const id = `mermaid-${rawId}`;
  const [error, setError] = useState(false);

  useEffect(() => {
    let cancelled = false;

    async function render() {
      try {
        const mermaid = (await import("mermaid")).default;
        mermaid.initialize({
          startOnLoad: false,
          theme: "neutral",
          securityLevel: "strict",
          fontFamily: "inherit",
        });
        const { svg } = await mermaid.render(id, chart);
        if (!cancelled && ref.current) {
          ref.current.innerHTML = svg;
        }
      } catch {
        if (!cancelled) setError(true);
      }
    }

    render();
    return () => {
      cancelled = true;
    };
  }, [chart, id]);

  return (
    <div className="rounded-xl border border-black/10 dark:border-white/10 bg-white dark:bg-neutral-900 p-3">
      {title && <div className="font-semibold text-sm mb-2">{title}</div>}
      {error ? (
        <pre className="text-xs whitespace-pre-wrap text-neutral-500 p-2">{chart}</pre>
      ) : (
        <div className="overflow-x-auto flex justify-center [&_svg]:max-w-none" ref={ref} />
      )}
      {note && <div className="text-xs text-neutral-500 mt-2">{note}</div>}
    </div>
  );
}
