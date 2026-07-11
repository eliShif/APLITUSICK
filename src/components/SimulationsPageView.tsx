"use client";

import { useState } from "react";
import { MechanismSimulator3D } from "@/components/MechanismSimulator3D";
import { MECHANISM_3D_REGISTRY, ALL_MECHANISMS_3D } from "@/content/mechanisms3d";

export function SimulationsPageView() {
  const [selected, setSelected] = useState("sn2");
  const mechanism = MECHANISM_3D_REGISTRY[selected];

  return (
    <div className="flex flex-col gap-4">
      <div>
        <h1 className="text-2xl font-bold">🧬 סימולציות מנגנון תלת-ממדיות</h1>
        <p className="text-sm text-neutral-500 mt-1">
          מודל תלת-ממדי אמיתי (קואורדינטות RDKit) עם אנימציה של שלבי המנגנון. מצב המעבר הוא
          קירוב גיאומטרי (אינטרפולציה בין המגיבים למוצרים עם תיקון היברידיזציה), <b>לא חישוב קוונטי</b>.
        </p>
      </div>

      <div className="flex flex-col lg:flex-row gap-4">
        <aside className="lg:w-64 shrink-0">
          <div className="rounded-xl border border-black/10 dark:border-white/10 bg-white dark:bg-neutral-900 p-2 flex flex-row lg:flex-col gap-1 overflow-x-auto lg:overflow-visible">
            {ALL_MECHANISMS_3D.map((m) => {
              const available = !!MECHANISM_3D_REGISTRY[m.slug];
              return (
                <button
                  key={m.slug}
                  disabled={!available}
                  onClick={() => setSelected(m.slug)}
                  className={`text-right rounded-lg px-3 py-2 text-sm transition shrink-0 whitespace-nowrap lg:whitespace-normal ${
                    selected === m.slug
                      ? "bg-emerald-600 text-white"
                      : available
                        ? "hover:bg-black/5 dark:hover:bg-white/10"
                        : "text-neutral-400 cursor-not-allowed"
                  }`}
                >
                  {m.title}
                  {!available && <span className="block text-[10px] opacity-70">בקרוב</span>}
                </button>
              );
            })}
          </div>
        </aside>

        <div className="flex-1 min-w-0">
          {mechanism ? (
            <MechanismSimulator3D mechanism={mechanism} />
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
