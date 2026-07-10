"use client";

import { useEffect, useRef, useState } from "react";

interface Props {
  smiles: string;
  size?: number;
  className?: string;
}

export function MoleculeSkeletal({ smiles, size = 140, className }: Props) {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const [status, setStatus] = useState<"loading" | "ready" | "error">("loading");

  useEffect(() => {
    let cancelled = false;
    setStatus("loading");

    async function draw() {
      try {
        const SmilesDrawer = (await import("smiles-drawer")).default;
        const dark =
          typeof window !== "undefined" &&
          window.matchMedia?.("(prefers-color-scheme: dark)").matches;

        SmilesDrawer.parse(
          smiles,
          (tree: unknown) => {
            if (cancelled || !canvasRef.current) return;
            const drawer = new SmilesDrawer.Drawer({
              width: size,
              height: size,
              padding: size * 0.12,
              bondThickness: 1.4,
              fontSizeLarge: size * 0.12,
              fontSizeSmall: size * 0.08,
            });
            drawer.draw(tree, canvasRef.current, dark ? "dark" : "light", false);
            if (!cancelled) setStatus("ready");
          },
          () => {
            if (!cancelled) setStatus("error");
          }
        );
      } catch {
        if (!cancelled) setStatus("error");
      }
    }

    draw();
    return () => {
      cancelled = true;
    };
  }, [smiles, size]);

  if (status === "error") return null;

  return (
    <canvas
      ref={canvasRef}
      width={size}
      height={size}
      className={className}
      style={{ width: size, height: size, opacity: status === "ready" ? 1 : 0 }}
      aria-hidden
    />
  );
}
