import raw from "./alcohol-e1-frames.json";
import type { Mechanism3DFrame, Mechanism3DMeta } from "./schema";

/** אינדקסים קבועים (ראו gen_alcohol_e1.py): 0=Cα, 1=O(LG), 2=H של אותו O, 3=Cβ, 4=O(Base), 5=H של הבסיס, 6=Hβ שמוסר, 7-8=Hβ נשארים, 9-10=מתילים צופים. */
const CA = 0;
const LG = 1;
const CB = 3;
const BASE = 4;
const H_BETA = 6;

const frames = (raw as unknown as { frames: Mechanism3DFrame[] }).frames;

export const ALCOHOL_E1_MECHANISM_3D: Mechanism3DMeta = {
  slug: "alcohol-e1",
  title: "התייבשות אלכוהול (E1) - טרט-בוטנול",
  frames,
  roles: [
    { index: LG, label: "H₂O", color: "#b45309" },
    { index: BASE, label: "Base", color: "#1d4ed8", chargeWindows: [{ from: 0, to: 0.05, charge: "−" }] },
  ],
  arrows: [
    { fromIndex: CA, toIndex: LG, color: "#b45309", activeFrom: 0, activeTo: 0.55, style: "pair" },
    { fromIndex: BASE, toIndex: H_BETA, color: "#1d4ed8", activeFrom: 0.5, activeTo: 0.85, style: "pair" },
    { fromIndex: H_BETA, toIndex: CA, color: "#111827", activeFrom: 0.6, activeTo: 1, style: "pair" },
  ],
  bondOrders: [{ a: CA, b: CB, order: 2, from: 0.55, to: 1 }],
  captions: [
    { from: 0, to: 0.1, text: "המגיב: טרט-בוטנול. בתנאים חומציים, ה-OH מקבל תחילה פרוטון (לא מוצג כאן) והופך ל-OH2+ - קבוצה פורשת טובה." },
    { from: 0.1, to: 0.48, text: "שלב 1 (איטי, קובע קצב): המים עוזבים - נוצר קרבוקטיון." },
    { from: 0.48, to: 0.52, text: "התווך: קרבוקטיון שטוח (sp²)." },
    { from: 0.52, to: 0.85, text: "שלב 2 (מהיר): בסיס מסיר Hβ - נוצר קשר π חדש (אלימינציה)." },
    { from: 0.85, to: 1, text: "התוצר: איזובוטילן (תוצר זייצב, הכי מסועף) + מים." },
  ],
};
