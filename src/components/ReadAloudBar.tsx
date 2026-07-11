"use client";

import { useMemo } from "react";
import { useHebrewReadAloud } from "@/lib/useHebrewReadAloud";

const RATES = [0.75, 1, 1.25, 1.5, 1.75, 2];

function stripForSpeech(text: string): string {
  return text
    .replace(/[\u{1F300}-\u{1FAFF}\u{2600}-\u{27BF}]/gu, "")
    .replace(/\s+/g, " ")
    .trim();
}

export function ReadAloudBar({ text }: { text: string }) {
  const cleanText = useMemo(() => stripForSpeech(text), [text]);
  const { supported, phase, loadPct, playing, rate, fallback, chunkProgress, toggle, restart, skip, changeRate } =
    useHebrewReadAloud(cleanText);

  if (!supported) return null;

  const isBusy = phase === "loading-model" || phase === "generating";

  return (
    <div className="flex flex-wrap items-center gap-1.5 rounded-lg bg-black/[0.03] dark:bg-white/[0.05] px-2.5 py-1.5">
      <button
        onClick={toggle}
        disabled={phase === "loading-model"}
        aria-label={playing ? "עצור הקראה" : "הקרא בקול"}
        className={`rounded-full px-3 py-1 text-xs font-semibold transition disabled:opacity-60 ${
          playing ? "bg-emerald-600 text-white" : "bg-black/5 dark:bg-white/10 hover:bg-black/10"
        }`}
      >
        {phase === "loading-model"
          ? `טוען קול (${loadPct}%)…`
          : phase === "generating"
          ? chunkProgress.total > 1
            ? `מכין קטע ${chunkProgress.current}/${chunkProgress.total}…`
            : "מייצר קול…"
          : playing
          ? "⏸ עצור"
          : "🔊 הקראה"}
      </button>
      <button
        onClick={() => skip(-5)}
        disabled={fallback}
        aria-label="אחורה 5 שניות"
        title="אחורה 5 שניות"
        className="rounded-full bg-black/5 dark:bg-white/10 hover:bg-black/10 disabled:opacity-40 px-2.5 py-1 text-xs font-semibold"
      >
        ⏪ 5 שנ׳
      </button>
      <button
        onClick={() => skip(5)}
        disabled={fallback}
        aria-label="קדימה 5 שניות"
        title="קדימה 5 שניות"
        className="rounded-full bg-black/5 dark:bg-white/10 hover:bg-black/10 disabled:opacity-40 px-2.5 py-1 text-xs font-semibold"
      >
        5 שנ׳ ⏩
      </button>
      <button
        onClick={restart}
        disabled={isBusy}
        aria-label="התחל מחדש"
        title="התחל מחדש"
        className="rounded-full bg-black/5 dark:bg-white/10 hover:bg-black/10 disabled:opacity-40 px-2.5 py-1 text-xs font-semibold"
      >
        🔁 התחלה
      </button>
      <select
        value={rate}
        onChange={(e) => changeRate(Number(e.target.value))}
        aria-label="מהירות הקראה"
        className="rounded-full bg-black/5 dark:bg-white/10 hover:bg-black/10 px-2 py-1 text-xs font-semibold cursor-pointer"
      >
        {RATES.map((r) => (
          <option key={r} value={r}>
            {r}x
          </option>
        ))}
      </select>
      {fallback && (
        <span className="text-[11px] text-neutral-400">
          קול הרשת לא נטען - עברנו לקול המובנה של הדפדפן (בלי דילוג מדויק)
        </span>
      )}
    </div>
  );
}
