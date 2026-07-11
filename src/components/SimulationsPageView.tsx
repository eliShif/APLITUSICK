"use client";

import { useState } from "react";
import { MechanismSimulator3D } from "@/components/MechanismSimulator3D";

interface MechanismEntry {
  slug: string;
  title: string;
  available: boolean;
}

/** רשימת המנגנונים הזמינים לסימולציה - SN2 הוא ה-POC הראשון; השאר יתווספו לאחר אישור הסגנון. */
const MECHANISM_LIST: MechanismEntry[] = [
  { slug: "sn2", title: "SN2 - התקפה אחורית והיפוך קונפיגורציה", available: true },
  { slug: "sn1", title: "SN1 - קרבוקטיון ורצמיזציה", available: false },
  { slug: "e2", title: "E2 - אלימינציה חד-שלבית", available: false },
  { slug: "e1", title: "E1 - אלימינציה דו-שלבית", available: false },
  { slug: "radical", title: "הלוגנציה רדיקלית", available: false },
  { slug: "addition", title: "סיפוח אלקטרופילי לאלקן", available: false },
  { slug: "resonance", title: "תהודה אלילית", available: false },
  { slug: "aromatic", title: "תגובת סובסטיטוציה ארומטית", available: false },
  { slug: "carbonyl", title: "סיפוח נוקלאופילי לקרבוניל", available: false },
];

export function SimulationsPageView() {
  const [selected, setSelected] = useState("sn2");
  const entry = MECHANISM_LIST.find((m) => m.slug === selected) ?? MECHANISM_LIST[0];

  return (
    <div className="flex flex-col gap-4">
      <div>
        <h1 className="text-2xl font-bold">🧬 סימולציות מנגנון תלת-ממדיות</h1>
        <p className="text-sm text-neutral-500 mt-1">
          מודל תלת-ממדי אמיתי (קואורדינטות RDKit) עם אנימציה של שלבי המנגנון. מצב המעבר הוא
          קירוב גיאומטרי (אינטרפולציה בין המגיבים למוצרים עם תיקון היברידיזציה), <b>לא חישוב קוונטי</b>.
          כרגע זמין רק SN2 כדוגמת ייחוס - שאר המנגנונים יתווספו לאחר אישור הסגנון.
        </p>
      </div>

      <div className="flex flex-col lg:flex-row gap-4">
        <aside className="lg:w-64 shrink-0">
          <div className="rounded-xl border border-black/10 dark:border-white/10 bg-white dark:bg-neutral-900 p-2 flex flex-row lg:flex-col gap-1 overflow-x-auto lg:overflow-visible">
            {MECHANISM_LIST.map((m) => (
              <button
                key={m.slug}
                disabled={!m.available}
                onClick={() => setSelected(m.slug)}
                className={`text-right rounded-lg px-3 py-2 text-sm transition shrink-0 whitespace-nowrap lg:whitespace-normal ${
                  selected === m.slug
                    ? "bg-emerald-600 text-white"
                    : m.available
                      ? "hover:bg-black/5 dark:hover:bg-white/10"
                      : "text-neutral-400 cursor-not-allowed"
                }`}
              >
                {m.title}
                {!m.available && <span className="block text-[10px] opacity-70">בקרוב</span>}
              </button>
            ))}
          </div>
        </aside>

        <div className="flex-1 min-w-0">
          {entry.available && entry.slug === "sn2" ? (
            <MechanismSimulator3D />
          ) : (
            <div className="rounded-xl border border-black/10 dark:border-white/10 bg-white dark:bg-neutral-900 p-8 text-center text-sm text-neutral-500">
              המנגנון הזה עוד לא זמין בסימולציה התלת-ממדית.
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
