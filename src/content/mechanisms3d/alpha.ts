import raw from "./alpha-frames.json";
import type { Mechanism3DFrame, Mechanism3DMeta } from "./schema";

/** אינדקסים קבועים (ראו gen_alpha.py): 0=C קרבוניל, 1=Cα, 2=O, 3=H על הקרבוניל, 4=O(Base), 5=H של הבסיס, 6=Hα שמוסר, 7-8=Hα נשארים. */
const CCARB = 0;
const CALPHA = 1;
const O = 2;
const BASE = 4;
const H_ALPHA = 6;

const frames = (raw as unknown as { frames: Mechanism3DFrame[] }).frames;

export const ALPHA_MECHANISM_3D: Mechanism3DMeta = {
  slug: "alpha",
  title: "אנוליזציה בפחמן אלפא",
  frames,
  roles: [
    { index: BASE, label: "Base", color: "#1d4ed8", chargeWindows: [{ from: 0, to: 0.05, charge: "−" }] },
    { index: O, label: "O", color: "#b91c1c", chargeWindows: [{ from: 0.55, to: 1, charge: "−" }] },
  ],
  arrows: [
    { fromIndex: BASE, toIndex: H_ALPHA, color: "#1d4ed8", activeFrom: 0, activeTo: 0.6, style: "pair" },
    { fromIndex: H_ALPHA, toIndex: CCARB, color: "#111827", activeFrom: 0.15, activeTo: 0.7, style: "pair" },
    { fromIndex: CCARB, toIndex: O, color: "#111827", activeFrom: 0.4, activeTo: 1, style: "pair" },
  ],
  bondOrders: [
    { a: CCARB, b: O, order: 2, from: 0, to: 0.4 },
    { a: CCARB, b: CALPHA, order: 2, from: 0.55, to: 1 },
  ],
  captions: [
    { from: 0, to: 0.08, text: "המגיבים: אצטלדהיד - Hα על הפחמן הסמוך לקרבוניל, בסיס מתקרב." },
    { from: 0.08, to: 0.55, text: "הבסיס מסיר Hα - האלקטרונים יוצרים קשר π חדש בין Cα לפחמן הקרבוניל." },
    { from: 0.55, to: 1, text: "קשר ה-π של הקרבוניל המקורי עובר במלואו לחמצן - נוצר אנולאט (מיוצב בתהודה בין C ל-O)." },
    { from: 0.9, to: 1, text: "התוצר: אנולאט - ההסבר לחומציות הגבוהה יחסית של Hα (pKa~20)." },
  ],
};
