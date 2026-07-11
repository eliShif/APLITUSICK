import raw from "./e2-frames.json";
import type { Mechanism3DFrame, Mechanism3DMeta } from "./schema";

/** אינדקסים קבועים (ראו gen_e2.py): 0=Cα, 1=Cβ, 2=Br(LG), 3=O(Base), 4=H של הבסיס, 5=Hβ שמוסר, 6-7=H נשארים על Cα, 8-9=H נשארים על Cβ. */
const CA = 0;
const CB = 1;
const LG = 2;
const BASE = 3;
const H_BETA = 5;

const frames = (raw as unknown as { frames: Mechanism3DFrame[] }).frames;

export const E2_MECHANISM_3D: Mechanism3DMeta = {
  slug: "e2",
  title: "E2 - אלימינציה חד-שלבית (אנטי-פריפלנרית)",
  frames,
  roles: [
    {
      index: BASE,
      label: "Base",
      color: "#1d4ed8",
      chargeWindows: [{ from: 0, to: 0.06, charge: "−" }],
      deltaWindow: { from: 0.06, to: 0.94, sign: "-" },
    },
    {
      index: LG,
      label: "LG",
      color: "#b45309",
      chargeWindows: [{ from: 0.94, to: 1, charge: "−" }],
      deltaWindow: { from: 0.06, to: 0.94, sign: "-" },
    },
  ],
  arrows: [
    { fromIndex: BASE, toIndex: H_BETA, color: "#1d4ed8", activeFrom: 0, activeTo: 0.65, style: "pair" },
    { fromIndex: H_BETA, toIndex: CB, color: "#111827", activeFrom: 0.15, activeTo: 0.75, style: "pair" },
    { fromIndex: CA, toIndex: LG, color: "#b45309", activeFrom: 0.35, activeTo: 1, style: "pair" },
  ],
  captions: [
    { from: 0, to: 0.08, text: "המגיבים: ברומואתאן במצב אנטי-פריפלנרי - Hβ ו-Br במישור אחד, בזווית 180°." },
    { from: 0.08, to: 0.42, text: "הידרוקסיד מתקרב ל-Hβ בעוד הקשר Cα-Br עדיין קיים - שלב מוקדם של המנגנון החד-שלבי." },
    { from: 0.42, to: 0.58, text: "מצב מעבר: שלושה תהליכים בו-זמנית - Base-Hβ נוצר, π חדש נוצר בין הפחמנים, Cα-Br נשבר." },
    { from: 0.58, to: 0.92, text: "הקשר π הולך ונוצר, שני הפחמנים משתטחים (sp²), הברומיד ממשיך להתרחק." },
    { from: 0.92, to: 1, text: "התוצרים: אתילן (אלקן שטוח), מים (Base-H) וברומיד חופשי." },
  ],
};
