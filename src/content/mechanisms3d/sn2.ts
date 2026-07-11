import raw from "./sn2-frames.json";
import type { Mechanism3DFrame, Mechanism3DMeta } from "./schema";

/** אינדקסים קבועים בכל frame (ראו gen_sn2.py): 0=C, 1=Br (LG), 2=O (Nu), 3=H של ה-Nu, 4-6=שלושת ה-H של המתיל. */
const C = 0;
const LG = 1;
const NU = 2;

const frames = (raw as unknown as { frames: Mechanism3DFrame[] }).frames;

export const SN2_MECHANISM_3D: Mechanism3DMeta = {
  slug: "sn2",
  title: "SN2 - תגובת בְּרוֹמוֹמֶתָאן עם הידרוקסיד",
  frames,
  roles: [
    {
      index: NU,
      label: "Nu",
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
    { fromIndex: NU, toIndex: C, color: "#1d4ed8", activeFrom: 0, activeTo: 0.6, style: "pair" },
    { fromIndex: C, toIndex: LG, color: "#b45309", activeFrom: 0.4, activeTo: 1, style: "pair" },
  ],
  captions: [
    { from: 0, to: 0.08, text: "המגיבים: ברומומתאן וממש לפני שהידרוקסיד תוקף מהצד הנגדי ל-Br." },
    { from: 0.08, to: 0.42, text: "הידרוקסיד מתקרב להתקפה אחורית (Back-side attack) - הקשר C-Br עדיין קיים." },
    { from: 0.42, to: 0.58, text: "מצב מעבר: שני הקשרים חלקיים בו-זמנית (δ-), הפחמן כמעט שטוח (sp² זמנית)." },
    { from: 0.58, to: 0.92, text: "הקשר Nu-C נוצר, הברומיד ממשיך להתרחק - קבוצות ה-H כבר בצד ההפוך." },
    { from: 0.92, to: 1, text: "התוצרים: מתאנול וברומיד חופשי. שימו לב - קונפיגורציית ה-H התהפכה לגמרי (אינברסיה)." },
  ],
};
