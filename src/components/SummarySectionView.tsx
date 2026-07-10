import type { SummarySection } from "@/content/types";
import { ReadAloudBar } from "@/components/ReadAloudBar";

function sectionToSpeechText(section: SummarySection): string {
  const parts: string[] = [section.heading];
  section.paragraphs?.forEach((p) => parts.push(p));
  section.bullets?.forEach((b) => parts.push(b));
  section.keyDifferences?.forEach((box) => {
    parts.push(box.title);
    box.items.forEach((item) => parts.push(item));
  });
  return parts.join(". ");
}

export function SummarySectionView({ section }: { section: SummarySection }) {
  return (
    <div className="space-y-3">
      <h3 className="text-lg font-extrabold tracking-tight">{section.heading}</h3>
      <ReadAloudBar text={sectionToSpeechText(section)} />
      {section.paragraphs?.map((p, i) => (
        <p key={i} className="leading-relaxed text-neutral-700 dark:text-neutral-300">
          {p}
        </p>
      ))}
      {section.bullets && section.bullets.length > 0 && (
        <ul className="list-disc pr-5 space-y-1 text-neutral-700 dark:text-neutral-300">
          {section.bullets.map((b, i) => (
            <li key={i} className="leading-relaxed">
              {b}
            </li>
          ))}
        </ul>
      )}
      {section.keyDifferences?.map((box, i) => (
        <div
          key={i}
          className="rounded-xl border-2 border-amber-400/60 bg-amber-50 dark:bg-amber-900/20 p-4"
        >
          <div className="font-extrabold tracking-tight text-amber-800 dark:text-amber-300 mb-2">
            ⚡ {box.title}
          </div>
          <ul className="list-disc pr-5 space-y-1 text-sm text-amber-900 dark:text-amber-200">
            {box.items.map((item, j) => (
              <li key={j}>{item}</li>
            ))}
          </ul>
        </div>
      ))}
    </div>
  );
}
