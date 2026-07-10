"use client";

import { useLayoutEffect, useRef, useState, useCallback } from "react";
import type { MatchingGame as MatchingGameType } from "@/content/types";
import { shuffle } from "@/lib/shuffle";

interface LineCoord {
  key: string;
  x1: number;
  y1: number;
  x2: number;
  y2: number;
  correct: boolean;
}

export function MatchingGame({ game }: { game: MatchingGameType }) {
  const pairs = game.pairs;
  const [leftOrder, setLeftOrder] = useState<number[]>(() => shuffle(pairs.map((_, i) => i)));
  const [rightOrder, setRightOrder] = useState<number[]>(() => shuffle(pairs.map((_, i) => i)));
  const [matched, setMatched] = useState<Set<number>>(new Set());
  const [selectedLeft, setSelectedLeft] = useState<number | null>(null);
  const [wrongPair, setWrongPair] = useState<{ left: number; right: number } | null>(null);
  const [mistakes, setMistakes] = useState(0);
  const [tick, setTick] = useState(0);

  const containerRef = useRef<HTMLDivElement | null>(null);
  const itemRefs = useRef<Map<string, HTMLButtonElement>>(new Map());
  const [lines, setLines] = useState<LineCoord[]>([]);

  const registerRef = useCallback(
    (key: string) => (el: HTMLButtonElement | null) => {
      if (el) itemRefs.current.set(key, el);
      else itemRefs.current.delete(key);
    },
    []
  );

  const recomputeLines = useCallback(() => {
    const container = containerRef.current;
    if (!container) return;
    const cRect = container.getBoundingClientRect();
    const next: LineCoord[] = [];

    matched.forEach((pairIdx) => {
      const leftEl = itemRefs.current.get(`L-${pairIdx}`);
      const rightEl = itemRefs.current.get(`R-${pairIdx}`);
      if (!leftEl || !rightEl) return;
      const l = leftEl.getBoundingClientRect();
      const r = rightEl.getBoundingClientRect();
      next.push({
        key: `m-${pairIdx}`,
        x1: l.left + l.width / 2 - cRect.left,
        y1: l.top + l.height / 2 - cRect.top,
        x2: r.left + r.width / 2 - cRect.left,
        y2: r.top + r.height / 2 - cRect.top,
        correct: true,
      });
    });

    if (wrongPair) {
      const leftEl = itemRefs.current.get(`L-${wrongPair.left}`);
      const rightEl = itemRefs.current.get(`R-${wrongPair.right}`);
      if (leftEl && rightEl) {
        const l = leftEl.getBoundingClientRect();
        const r = rightEl.getBoundingClientRect();
        next.push({
          key: "wrong",
          x1: l.left + l.width / 2 - cRect.left,
          y1: l.top + l.height / 2 - cRect.top,
          x2: r.left + r.width / 2 - cRect.left,
          y2: r.top + r.height / 2 - cRect.top,
          correct: false,
        });
      }
    }
    setLines(next);
  }, [matched, wrongPair]);

  useLayoutEffect(() => {
    recomputeLines();
  }, [recomputeLines, tick]);

  useLayoutEffect(() => {
    const onResize = () => setTick((t) => t + 1);
    window.addEventListener("resize", onResize);
    window.addEventListener("scroll", onResize, true);
    return () => {
      window.removeEventListener("resize", onResize);
      window.removeEventListener("scroll", onResize, true);
    };
  }, []);

  function pickLeft(pairIdx: number) {
    if (matched.has(pairIdx)) return;
    setSelectedLeft(pairIdx === selectedLeft ? null : pairIdx);
  }

  function pickRight(pairIdx: number) {
    if (matched.has(pairIdx) || selectedLeft === null) return;
    if (selectedLeft === pairIdx) {
      const next = new Set(matched);
      next.add(pairIdx);
      setMatched(next);
      setSelectedLeft(null);
      setTick((t) => t + 1);
    } else {
      setMistakes((m) => m + 1);
      setWrongPair({ left: selectedLeft, right: pairIdx });
      setSelectedLeft(null);
      setTimeout(() => setWrongPair(null), 700);
    }
  }

  function restart() {
    setLeftOrder(shuffle(pairs.map((_, i) => i)));
    setRightOrder(shuffle(pairs.map((_, i) => i)));
    setMatched(new Set());
    setSelectedLeft(null);
    setWrongPair(null);
    setMistakes(0);
  }

  const done = matched.size === pairs.length;

  return (
    <div className="space-y-3">
      <div>
        <div className="font-semibold">{game.title}</div>
        {game.instructions && <div className="text-xs text-neutral-500 mt-1">{game.instructions}</div>}
      </div>

      {done ? (
        <div className="rounded-xl border border-black/10 dark:border-white/10 p-6 text-center space-y-3 bg-white dark:bg-neutral-900">
          <div className="text-3xl">✅</div>
          <div className="font-bold">כל הכבוד! התאמת את כל הזוגות</div>
          <div className="text-sm text-neutral-500">מספר טעויות: {mistakes}</div>
          <button
            onClick={restart}
            className="rounded-full bg-emerald-600 text-white px-5 py-2 text-sm font-semibold hover:bg-emerald-700 transition"
          >
            שחק/י שוב (סדר מעורבב)
          </button>
        </div>
      ) : (
        <div ref={containerRef} className="relative rounded-xl border border-black/10 dark:border-white/10 bg-white dark:bg-neutral-900 p-4">
          <svg className="pointer-events-none absolute inset-0 h-full w-full">
            {lines.map((ln) => (
              <line
                key={ln.key}
                x1={ln.x1}
                y1={ln.y1}
                x2={ln.x2}
                y2={ln.y2}
                stroke={ln.correct ? "#059669" : "#e11d48"}
                strokeWidth={2.5}
                strokeLinecap="round"
              />
            ))}
          </svg>

          <div className="relative grid grid-cols-2 gap-x-6 gap-y-2">
            <div className="flex flex-col gap-2">
              {leftOrder.map((pairIdx) => {
                const isMatched = matched.has(pairIdx);
                const isSelected = selectedLeft === pairIdx;
                return (
                  <button
                    key={pairIdx}
                    ref={registerRef(`L-${pairIdx}`)}
                    disabled={isMatched}
                    onClick={() => pickLeft(pairIdx)}
                    className={`rounded-lg border px-3 py-2 text-sm text-right transition ${
                      isMatched
                        ? "border-emerald-500 bg-emerald-50 dark:bg-emerald-900/30 opacity-70"
                        : isSelected
                        ? "border-emerald-600 ring-2 ring-emerald-400"
                        : "border-black/10 dark:border-white/10 hover:border-emerald-500"
                    }`}
                  >
                    {pairs[pairIdx].left}
                  </button>
                );
              })}
            </div>
            <div className="flex flex-col gap-2">
              {rightOrder.map((pairIdx) => {
                const isMatched = matched.has(pairIdx);
                return (
                  <button
                    key={pairIdx}
                    ref={registerRef(`R-${pairIdx}`)}
                    disabled={isMatched}
                    onClick={() => pickRight(pairIdx)}
                    className={`rounded-lg border px-3 py-2 text-sm text-right transition ${
                      isMatched
                        ? "border-emerald-500 bg-emerald-50 dark:bg-emerald-900/30 opacity-70"
                        : "border-black/10 dark:border-white/10 hover:border-emerald-500"
                    }`}
                  >
                    {pairs[pairIdx].right}
                  </button>
                );
              })}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
