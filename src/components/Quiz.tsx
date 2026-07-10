"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import type { PointerEvent as ReactPointerEvent } from "react";
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
  const [orderArrangement, setOrderArrangement] = useState<number[]>([]);
  const [finished, setFinished] = useState(false);

  const current = prepared[index];

  // שאלת "order" מתחילה מהסדר המעורבב של השאלה הנוכחית - מתעדכן בכל מעבר שאלה
  useEffect(() => {
    if (current?.q.type === "order") {
      setOrderArrangement(current.shuffledStepOrder ?? []);
    }
  }, [current]);

  function resetQuestionState() {
    setAnswered(false);
    setIsCorrect(false);
    setFillValue("");
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
            order={orderArrangement}
            setOrder={setOrderArrangement}
            answered={answered}
            onSubmit={() => commitAnswer(orderArrangement.join(",") === q.correctOrder.join(","))}
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

const ROW_GAP_PX = 8;

function moveItem(arr: number[], from: number, to: number): number[] {
  const next = [...arr];
  const [item] = next.splice(from, 1);
  next.splice(to, 0, item);
  return next;
}

/** רשימה הניתנת לגרירה אמיתית (Pointer Events - עובד גם במגע וגם בעכבר) לסידור שלבי מנגנון. */
function OrderQuestion({
  steps,
  order,
  setOrder,
  answered,
  onSubmit,
}: {
  steps: string[];
  order: number[];
  setOrder: (o: number[]) => void;
  answered: boolean;
  onSubmit: () => void;
}) {
  const itemRefs = useRef<Map<number, HTMLDivElement>>(new Map());
  const dragState = useRef<{ stepIndex: number; startY: number; startSlot: number; rowHeight: number } | null>(
    null
  );
  const [draggingStep, setDraggingStep] = useState<number | null>(null);
  const [dragY, setDragY] = useState(0);

  function registerRef(stepIndex: number) {
    return (el: HTMLDivElement | null) => {
      if (el) itemRefs.current.set(stepIndex, el);
      else itemRefs.current.delete(stepIndex);
    };
  }

  function handlePointerDown(e: ReactPointerEvent<HTMLDivElement>, stepIndex: number) {
    if (answered) return;
    const el = itemRefs.current.get(stepIndex);
    if (!el) return;
    e.currentTarget.setPointerCapture(e.pointerId);
    dragState.current = {
      stepIndex,
      startY: e.clientY,
      startSlot: order.indexOf(stepIndex),
      rowHeight: el.getBoundingClientRect().height + ROW_GAP_PX,
    };
    setDraggingStep(stepIndex);
    setDragY(0);
  }

  function handlePointerMove(e: ReactPointerEvent<HTMLDivElement>) {
    const drag = dragState.current;
    if (!drag) return;
    const deltaY = e.clientY - drag.startY;
    setDragY(deltaY);

    const slotsMoved = Math.round(deltaY / drag.rowHeight);
    const targetSlot = Math.min(Math.max(drag.startSlot + slotsMoved, 0), order.length - 1);
    const currentSlot = order.indexOf(drag.stepIndex);
    if (targetSlot !== currentSlot) {
      setOrder(moveItem(order, currentSlot, targetSlot));
    }
  }

  function endDrag() {
    dragState.current = null;
    setDraggingStep(null);
    setDragY(0);
  }

  return (
    <div className="space-y-3">
      <div className="text-xs text-neutral-500">גררו את השלבים כדי לסדר אותם מהראשון לאחרון</div>
      <div className="flex flex-col" style={{ gap: ROW_GAP_PX }}>
        {order.map((stepIndex, slot) => {
          const isDragging = draggingStep === stepIndex;
          return (
            <div
              key={stepIndex}
              ref={registerRef(stepIndex)}
              onPointerDown={(e) => handlePointerDown(e, stepIndex)}
              onPointerMove={handlePointerMove}
              onPointerUp={endDrag}
              onPointerCancel={endDrag}
              className={`flex items-center gap-3 rounded-lg border bg-white dark:bg-neutral-900 px-4 py-2.5 text-sm select-none ${
                answered
                  ? "border-black/10 dark:border-white/10"
                  : "border-black/10 dark:border-white/10 cursor-grab active:cursor-grabbing"
              }`}
              style={{
                touchAction: "none",
                transform: isDragging ? `translateY(${dragY}px)` : undefined,
                position: isDragging ? "relative" : undefined,
                zIndex: isDragging ? 10 : undefined,
                boxShadow: isDragging ? "0 8px 20px rgba(0,0,0,0.15)" : undefined,
                transition: isDragging ? "none" : "transform 150ms",
              }}
            >
              <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-black/10 dark:bg-white/10 text-xs font-bold">
                {slot + 1}
              </span>
              <span className="flex-1">{steps[stepIndex]}</span>
              {!answered && <span className="shrink-0 text-neutral-400">⠿</span>}
            </div>
          );
        })}
      </div>
      {!answered && (
        <button
          onClick={onSubmit}
          className="rounded-full bg-neutral-800 dark:bg-white/10 text-white px-4 py-1.5 text-xs font-semibold hover:opacity-90"
        >
          בדוק/י סדר
        </button>
      )}
    </div>
  );
}
