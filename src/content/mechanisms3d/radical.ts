import raw from "./radical-frames.json";
import type { Mechanism3DFrame, Mechanism3DMeta } from "./schema";

/** אינדקסים קבועים (ראו gen_radical.py): 0=C, 1=H (מופשט), 2=X (רדיקל הלוגן תוקף), 3-5=שלושת H הנשארים. */
const C = 0;
const H_TARGET = 1;
const X = 2;

const frames = (raw as unknown as { frames: Mechanism3DFrame[] }).frames;

export const RADICAL_MECHANISM_3D: Mechanism3DMeta = {
  slug: "radical",
  title: "הלוגנציה רדיקלית - Propagation (הפשטת מימן)",
  frames,
  roles: [
    {
      index: X,
      label: "X",
      color: "#b45309",
      chargeWindows: [{ from: 0, to: 0.85, charge: "•" }],
    },
    {
      index: C,
      label: "C",
      color: "#1d4ed8",
      chargeWindows: [{ from: 0.85, to: 1, charge: "•" }],
    },
  ],
  arrows: [{ fromIndex: H_TARGET, toIndex: X, color: "#111827", activeFrom: 0.1, activeTo: 0.95, style: "fishhook" }],
  captions: [
    { from: 0, to: 0.15, text: "המגיבים: רדיקל הלוגן (X•) ומתאן - גישה קווית (ליניארית) אל אחד ה-H." },
    { from: 0.15, to: 0.5, text: "רדיקל ה-X מתקרב ל-H לאורך המשך קו הקשר C-H (בדומה לגישה אחורית ב-SN2)." },
    { from: 0.5, to: 0.85, text: "מצב מעבר: הקשר C-H נחלש, הפחמן מתחיל להשתטח (sp² זמני)." },
    { from: 0.85, to: 1, text: "התוצרים: רדיקל מתיל שטוח (•CH3) ו-H-X - זוג אלקטרונים בודד עבר, אלקטרון אחד נשאר על הפחמן כרדיקל חדש." },
  ],
};
