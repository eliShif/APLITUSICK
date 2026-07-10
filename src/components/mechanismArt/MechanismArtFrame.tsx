export function MechanismArtFrame({
  title,
  note,
  children,
}: {
  title: string;
  note?: string;
  children: React.ReactNode;
}) {
  return (
    <div className="rounded-xl border border-black/10 dark:border-white/10 bg-white dark:bg-neutral-900 p-3">
      <div className="font-semibold text-sm mb-2">{title}</div>
      <div className="overflow-x-auto rounded-lg bg-white p-2">{children}</div>
      {note && <div className="text-xs text-neutral-500 mt-2">{note}</div>}
    </div>
  );
}

/** קוד צבעים אחיד לכל תרשימי המנגנון עם החצים - ייבאו את זה, אל תמציאו צבעים חדשים. */
export const MECH_COLORS = {
  nucleophile: "#1d4ed8", // כחול - עשיר אלקטרונים / תוקף
  electrophileLeavingGroup: "#b45309", // ענבר - קבוצה עוזבת / אלקטרופיל
  charge: "#b91c1c", // אדום - מטענים חיוביים/שליליים מודגשים
  atom: "#1f2937", // אפור כהה - אטומים ניטרליים (C, H)
  arrow: "#111827", // כמעט שחור - חצים מקווקווים
  bond: "#6b7280", // אפור בינוני - קווי קשר
};
