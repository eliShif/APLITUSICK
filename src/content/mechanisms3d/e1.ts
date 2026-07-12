import raw from "./e1-frames.json";
import type { Mechanism3DFrame, Mechanism3DMeta } from "./schema";

/** אינדקסים קבועים (ראו gen_e1.py): 0=Cα, 1=Br(LG), 2=Cβ (הופך ל-CH2=), 3=O(Base), 4=H של הבסיס, 5=Hβ שמוסר, 6-7=H נשארים על Cβ, 8-9=שתי קבוצות מתיל צופות. */
const CA = 0;
const LG = 1;
const CB = 2;
const BASE = 3;
const H_BETA = 5;

const frames = (raw as unknown as { frames: Mechanism3DFrame[] }).frames;

export const E1_MECHANISM_3D: Mechanism3DMeta = {
  slug: "e1",
  title: "E1 - יוניזציה ואלימינציה (דו-שלבי)",
  frames,
  roles: [
    {
      index: BASE,
      label: "Base",
      color: "#1d4ed8",
      deltaWindow: { from: 0.55, to: 0.95, sign: "-" },
    },
    {
      index: LG,
      label: "LG",
      color: "#b45309",
      chargeWindows: [{ from: 0.5, to: 1, charge: "−" }],
      deltaWindow: { from: 0.05, to: 0.45, sign: "-" },
    },
  ],
  arrows: [
    { fromIndex: CA, toIndex: LG, color: "#b45309", activeFrom: 0, activeTo: 0.55, style: "pair" },
    { fromIndex: BASE, toIndex: H_BETA, color: "#1d4ed8", activeFrom: 0.5, activeTo: 0.85, style: "pair" },
    { fromIndex: H_BETA, toIndex: CB, color: "#111827", activeFrom: 0.6, activeTo: 1, style: "pair" },
  ],
  captions: [
    { from: 0, to: 0.1, text: "המגיב: טרט-בוטיל ברומיד - פחמן מרכזי טטראהדרלי." },
    { from: 0.1, to: 0.48, text: "שלב 1 (איטי, קובע קצב): הקשר C-Br נשבר - נוצר קרבוקטיון." },
    { from: 0.48, to: 0.52, text: "התווך: קרבוקטיון שטוח (sp²) - שלוש קבוצות המתיל במישור אחד." },
    { from: 0.52, to: 0.85, text: "שלב 2 (מהיר): בסיס מסיר Hβ מאחת מקבוצות המתיל - נוצר קשר π חדש." },
    { from: 0.85, to: 1, text: "התוצרים: איזובוטילן (אלקן), Base-H וברומיד חופשי - זהו תוצר זייצב (הכי מסועף)." },
  ],
};
