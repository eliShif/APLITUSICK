import raw from "./addition-frames.json";
import type { Mechanism3DFrame, Mechanism3DMeta } from "./schema";

/** אינדקסים קבועים (ראו gen_addition.py): 0=C1, 1=C2 (הופך לקרבוקטיון), 2=H חדש, 3=Br, 4-5=H של C1, 6-7=H של C2. */
const C1 = 0;
const C2 = 1;
const H_NEW = 2;
const BR = 3;

const frames = (raw as unknown as { frames: Mechanism3DFrame[] }).frames;

export const ADDITION_MECHANISM_3D: Mechanism3DMeta = {
  slug: "addition",
  title: "סיפוח אלקטרופילי - HBr לאתילן",
  frames,
  roles: [
    {
      index: C2,
      label: "C",
      color: "#b91c1c",
      chargeWindows: [{ from: 0.08, to: 0.48, charge: "+" }],
    },
    {
      index: BR,
      label: "Br",
      color: "#b45309",
      chargeWindows: [{ from: 0.42, to: 0.62, charge: "−" }],
    },
  ],
  arrows: [
    { fromIndex: C1, toIndex: H_NEW, color: "#1d4ed8", activeFrom: 0, activeTo: 0.55, style: "pair" },
    { fromIndex: H_NEW, toIndex: BR, color: "#b45309", activeFrom: 0, activeTo: 0.45, style: "pair" },
    { fromIndex: BR, toIndex: C2, color: "#b45309", activeFrom: 0.45, activeTo: 1, style: "pair" },
  ],
  captions: [
    { from: 0, to: 0.08, text: "המגיבים: אתילן (אלקן שטוח) ו-H-Br מתקרב אל ענן ה-π." },
    { from: 0.08, to: 0.48, text: "אלקטרוני ה-π תוקפים את ה-H (אלקטרופיל) - נוצר קשר C-H חדש, C1 הופך ל-sp³." },
    { from: 0.42, to: 0.62, text: "התווך: קרבוקטיון על C2 (עדיין שטוח, sp²) + ברומיד חופשי שהשתחרר מ-H." },
    { from: 0.55, to: 1, text: "הברומיד תוקף את הקרבוקטיון - C2 הופך שוב ל-sp³." },
    { from: 0.9, to: 1, text: "התוצר: ברומואתאן. (בדוגמה אמיתית עם אלקן א-סימטרי - כלל מרקובניקוב קובע לאיזה פחמן ה-H מתווסף)." },
  ],
};
