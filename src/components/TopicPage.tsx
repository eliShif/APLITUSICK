"use client";

import dynamic from "next/dynamic";
import { useState } from "react";
import type { Topic } from "@/content/types";
import { SummarySectionView } from "@/components/SummarySectionView";
import { ComparisonTableView } from "@/components/ComparisonTableView";
import { MermaidDiagram } from "@/components/MermaidDiagram";
import { Molecule3DViewer } from "@/components/Molecule3DViewer";
import { MECHANISM_ART } from "@/components/mechanismArt";

const Quiz = dynamic(() => import("@/components/Quiz").then((m) => m.Quiz), { ssr: false });
const MatchingGame = dynamic(
  () => import("@/components/MatchingGame").then((m) => m.MatchingGame),
  { ssr: false }
);

type TabId = "summary" | "diagrams" | "molecules" | "quiz" | "matching";

export function TopicPageView({ topic }: { topic: Topic }) {
  const tabs: { id: TabId; label: string }[] = [
    { id: "summary", label: "סיכום" },
    ...(topic.diagrams?.length ? [{ id: "diagrams" as const, label: "מנגנונים ותרשימי זרימה" }] : []),
    ...(topic.molecules?.length ? [{ id: "molecules" as const, label: "מודלים תלת-ממדיים" }] : []),
    { id: "quiz", label: "שאלון" },
    ...(topic.matchingGame ? [{ id: "matching" as const, label: "משחק התאמה" }] : []),
  ];
  const [tab, setTab] = useState<TabId>("summary");
  const MechanismArt = MECHANISM_ART[topic.slug];

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight">
          {topic.icon} {topic.title}
        </h1>
        {topic.subtitle && <p className="text-neutral-500 mt-1.5 leading-relaxed">{topic.subtitle}</p>}
      </div>

      <div className="flex flex-wrap gap-2 border-b border-black/10 dark:border-white/10 pb-2 overflow-x-auto">
        {tabs.map((t) => (
          <button
            key={t.id}
            onClick={() => setTab(t.id)}
            className={`whitespace-nowrap rounded-full px-4 py-1.5 text-sm font-semibold transition ${
              tab === t.id
                ? "bg-emerald-600 text-white"
                : "bg-black/5 dark:bg-white/10 hover:bg-black/10"
            }`}
          >
            {t.label}
          </button>
        ))}
      </div>

      {tab === "summary" && (
        <div className="space-y-8">
          {topic.summary.map((section, i) => (
            <SummarySectionView key={i} section={section} />
          ))}
          {topic.comparisonTables?.map((table, i) => (
            <ComparisonTableView key={i} table={table} />
          ))}
        </div>
      )}

      {tab === "diagrams" && (
        <div className="space-y-6">
          {MechanismArt && <MechanismArt />}
          {topic.diagrams?.map((d, i) => (
            <MermaidDiagram key={i} chart={d.mermaid} title={d.title} note={d.note} />
          ))}
        </div>
      )}

      {tab === "molecules" && (
        <div className="grid gap-4 sm:grid-cols-2">
          {topic.molecules?.map((m, i) => (
            <Molecule3DViewer key={i} molecule={m} />
          ))}
        </div>
      )}

      {tab === "quiz" && <Quiz questions={topic.quiz} />}

      {tab === "matching" && topic.matchingGame && <MatchingGame game={topic.matchingGame} />}
    </div>
  );
}
