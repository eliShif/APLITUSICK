"use client";

import { useMemo, useState } from "react";
import type { QuizQuestion } from "@/content/types";
import { shuffle, normalizeText } from "@/lib/shuffle";

interface PreparedQuestion {
  q: QuizQuestion;
  // עבור שאלות "order" - הסדר המעורבב שמוצג למשתמש (אינדקסים למקור steps)
  shuffledStepOrder?: number[];
}

function prepare(questions: QuizQuestion[]): PreparedQuestion[] {
  return shuffle(questions).map((q) => {
    if (q.type === "order") {
      return { q, shuffledStepOrder: shuffle(q.steps.map((_, i) => i)) };
    }
    return { q };
  });
}

export function Quiz({ questions }: { questions: QuizQuestion[] }) {
  const [prepared, setPrepared] = useState<PreparedQuestion[]>(() => prepare(questions));
  const [index, setIndex] = useState(0);
  const [score, setScore] = useState(0);
  const [answered, setAnswered] = useState(false);
  const [isCorrect, setIsCorrect] = useState(false);
  const [fillValue, setFillValue] = useState("");
  const [orderPicks, setOrderPicks] = useState<number[]>([]);
  const [finished, setFinished] = useState(false);

  const current = prepared[index];

  function resetQuestionState() {
    setAnswered(false);
    setIsCorrect(false);
    setFillValue("");
    setOrderPicks([]);
  }

  function commitAnswer(correct: boolean) {
    setAnswered(true);
    setIsCorrect(correct);
    if (correct) setScore((s) => s + 1);
  }

  function next() {
    if (index + 1 >= prepared.length) {
      setFinished(true);
      return;
    }
    setIndex((i) => i + 1);
    resetQuestionState();
  }

  function restart() {
    setPrepared(prepare(questions));
    setIndex(0);
    setScore(0);
    setFinished(false);
    resetQuestionState();
  }

  const progressPct = useMemo(
    () => Math.round(((finished ? prepared.length : index) / prepared.length) * 100),
    [index, finished, prepared.length]
  );

  if (prepared.length === 0) {
    return <div className="text-sm text-neutral-500">אין שאלות זמינות לנושא זה כרגע.</div>;
  }

  if (finished) {
    const pct = Math.round((score / prepared.length) * 100);
    return (
      <div className="rounded-xl border border-black/10 dark:border-white/10 p-6 text-center space-y-4 bg-white dark:bg-neutral-900">
        <div className="text-4xl">{pct >= 80 ? "🎉" : pct >= 50 ? "💪" : "📚"}</div>
        <div className="text-xl font-bold">
          הציון שלך: {score} מתוך {prepared.length} ({pct}%)
        </div>
        <p className="text-sm text-neutral-500">
          {pct >= 80 ? "מעולה! שליטה טובה בנושא." : pct >= 50 ? "לא רע, כדאי לחזור על הסיכום." : "כדאי לחזור על הסיכום ולנסות שוב."}
        </p>
        <button
          onClick={restart}
          className="rounded-full bg-emerald-600 text-white px-5 py-2 text-sm font-semibold hover:bg-emerald-700 transition"
        >
          נסה שוב (שאלות מעורבבות)
        </button>
      </div>
    );
  }

  const q = current.q;

  return (
    <div className="space-y-4">
      <div className="h-1.5 rounded-full bg-black/10 dark:bg-white/10 overflow-hidden">
        <div className="h-full bg-emerald-600 transition-all" style={{ width: `${progressPct}%` }} />
      </div>
      <div className="text-xs text-neutral-500">
        שאלה {index + 1} מתוך {prepared.length}
      </div>

      <div className="rounded-xl border border-black/10 dark:border-white/10 bg-white dark:bg-neutral-900 p-5 space-y-4">
        <div className="font-semibold leading-relaxed">{q.question}</div>

        {q.type === "mc" && (
          <div className="grid gap-2">
            {q.options.map((opt, i) => {
              const showState = answered;
              const isSelectedCorrect = showState && i === q.correctIndex;
              return (
                <button
                  key={i}
                  disabled={answered}
                  onClick={() => commitAnswer(i === q.correctIndex)}
                  className={`text-right rounded-lg border px-4 py-2 text-sm transition ${
                    isSelectedCorrect
                      ? "border-emerald-600 bg-emerald-50 dark:bg-emerald-900/30"
                      : showState
                      ? "border-black/10 dark:border-white/10 opacity-60"
                      : "border-black/10 dark:border-white/10 hover:border-emerald-500"
                  }`}
                >
                  {opt}
                </button>
              );
            })}
          </div>
        )}

        {q.type === "tf" && (
          <div className="flex gap-3">
            {[true, false].map((val) => (
              <button
                key={String(val)}
                disabled={answered}
                onClick={() => commitAnswer(val === q.correct)}
                className={`flex-1 rounded-lg border px-4 py-3 text-sm font-semibold transition ${
                  answered && val === q.correct
                    ? "border-emerald-600 bg-emerald-50 dark:bg-emerald-900/30"
                    : "border-black/10 dark:border-white/10 hover:border-emerald-500"
                } ${answered ? "opacity-90" : ""}`}
              >
                {val ? "נכון" : "לא נכון"}
              </button>
            ))}
          </div>
        )}

        {q.type === "fill" && (
          <div className="flex flex-col gap-2">
            <input
              value={fillValue}
              disabled={answered}
              onChange={(e) => setFillValue(e.target.value)}
              placeholder="הקלד/י תשובה..."
              dir="auto"
              className="rounded-lg border border-black/10 dark:border-white/10 px-3 py-2 text-sm bg-transparent focus:outline-none focus:border-emerald-500"
            />
            {!answered && (
              <button
                onClick={() =>
                  commitAnswer(q.answers.some((a) => normalizeText(a) === normalizeText(fillValue)))
                }
                className="self-start rounded-full bg-neutral-800 dark:bg-white/10 text-white px-4 py-1.5 text-xs font-semibold hover:opacity-90"
              >
                בדוק/י תשובה
              </button>
            )}
            {answered && (
              <div className="text-xs text-neutral-500">
                תשובה מקובלת: {q.answers.join(" / ")}
              </div>
            )}
          </div>
        )}

        {q.type === "order" && (
          <OrderQuestion
            steps={q.steps}
            shuffledOrder={current.shuffledStepOrder ?? []}
            correctOrder={q.correctOrder}
            answered={answered}
            picks={orderPicks}
            setPicks={setOrderPicks}
            onSubmit={(picks) => commitAnswer(picks.join(",") === q.correctOrder.join(","))}
          />
        )}

        {answered && (
          <div
            className={`rounded-lg px-4 py-2 text-sm ${
              isCorrect
                ? "bg-emerald-50 dark:bg-emerald-900/30 text-emerald-800 dark:text-emerald-300"
                : "bg-rose-50 dark:bg-rose-900/30 text-rose-800 dark:text-rose-300"
            }`}
          >
            {isCorrect ? "תשובה נכונה!" : "לא מדויק."} {q.explanation && <span> {q.explanation}</span>}
          </div>
        )}

        {answered && (
          <button
            onClick={next}
            className="rounded-full bg-emerald-600 text-white px-5 py-2 text-sm font-semibold hover:bg-emerald-700 transition"
          >
            {index + 1 >= prepared.length ? "סיום" : "השאלה הבאה"}
          </button>
        )}
      </div>
    </div>
  );
}

function OrderQuestion({
  steps,
  shuffledOrder,
  correctOrder,
  answered,
  picks,
  setPicks,
  onSubmit,
}: {
  steps: string[];
  shuffledOrder: number[];
  correctOrder: number[];
  answered: boolean;
  picks: number[];
  setPicks: (p: number[]) => void;
  onSubmit: (picks: number[]) => void;
}) {
  void correctOrder;
  function toggle(i: number) {
    if (answered) return;
    if (picks.includes(i)) {
      setPicks(picks.filter((p) => p !== i));
    } else {
      setPicks([...picks, i]);
    }
  }

  return (
    <div className="space-y-3">
      <div className="text-xs text-neutral-500">לחץ/י על השלבים לפי הסדר הנכון (מהראשון לאחרון)</div>
      <div className="grid gap-2">
        {shuffledOrder.map((origIndex) => {
          const pickPosition = picks.indexOf(origIndex);
          return (
            <button
              key={origIndex}
              disabled={answered}
              onClick={() => toggle(origIndex)}
              className={`flex items-center gap-3 text-right rounded-lg border px-4 py-2 text-sm transition ${
                pickPosition >= 0
                  ? "border-emerald-500 bg-emerald-50 dark:bg-emerald-900/30"
                  : "border-black/10 dark:border-white/10 hover:border-emerald-500"
              }`}
            >
              <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-black/10 dark:bg-white/10 text-xs font-bold">
                {pickPosition >= 0 ? pickPosition + 1 : ""}
              </span>
              {steps[origIndex]}
            </button>
          );
        })}
      </div>
      {!answered && (
        <button
          disabled={picks.length !== steps.length}
          onClick={() => onSubmit(picks)}
          className="rounded-full bg-neutral-800 dark:bg-white/10 disabled:opacity-40 text-white px-4 py-1.5 text-xs font-semibold hover:opacity-90"
        >
          בדוק/י סדר
        </button>
      )}
    </div>
  );
}
