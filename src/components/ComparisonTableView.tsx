import type { ComparisonTable } from "@/content/types";
import { ChemText } from "@/components/ChemText";

export function ComparisonTableView({ table }: { table: ComparisonTable }) {
  return (
    <div className="rounded-xl border border-black/10 dark:border-white/10 bg-white dark:bg-neutral-900 overflow-hidden">
      <div className="px-4 py-2 font-semibold text-sm border-b border-black/10 dark:border-white/10">
        <ChemText>{table.title}</ChemText>
      </div>
      <div className="overflow-x-auto">
        <table className="w-full text-sm min-w-[480px]">
          <thead>
            <tr className="bg-black/5 dark:bg-white/5">
              {table.headers.map((h, i) => (
                <th key={i} className="px-3 py-2 text-right font-semibold whitespace-nowrap">
                  <ChemText>{h}</ChemText>
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {table.rows.map((row, ri) => (
              <tr key={ri} className={ri % 2 ? "bg-black/[0.02] dark:bg-white/[0.02]" : undefined}>
                {row.map((cell, ci) => (
                  <td key={ci} className="px-3 py-2 align-top border-t border-black/5 dark:border-white/5">
                    <ChemText>{cell}</ChemText>
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
