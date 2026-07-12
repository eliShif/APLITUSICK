import raw from "./aldol-frames.json";
import type { Mechanism3DFrame, Mechanism3DMeta } from "./schema";

/** אינדקסים קבועים (ראו gen_aldol.py): 0=Cα, 1=C קרבוניל 1, 2=O1, 3=H עליו, 4=O הבסיס, 5=H שלו, 6=Hα1 (מוסר בשלב א), 7=Hα2 (מוסר בשלב ג), 8=C קרבוניל 2, 9=O2, 10=H עליו, 11=מתיל מולקולה 2, 12=H על C קרבוניל 2. */
const CA = 0;
const CC1 = 1;
const O1 = 2;
const BASE = 4;
const HA1 = 6;
const HA2 = 7;
const CC2 = 8;
const O2 = 9;

const frames = (raw as unknown as { frames: Mechanism3DFrame[] }).frames;

export const ALDOL_MECHANISM_3D: Mechanism3DMeta = {
  slug: "aldol",
  title: "עיבוי אלדולי - שני שווי אצטלדהיד",
  frames,
  roles: [
    { index: BASE, label: "Base", color: "#1d4ed8" },
    { index: O1, label: "O", color: "#b91c1c", deltaWindow: { from: 0.1, to: 0.34, sign: "-" } },
    { index: O2, label: "O", color: "#b45309", chargeWindows: [{ from: 0.58, to: 0.68, charge: "−" }] },
  ],
  arrows: [
    { fromIndex: BASE, toIndex: HA1, color: "#1d4ed8", activeFrom: 0, activeTo: 0.38, style: "pair" },
    { fromIndex: HA1, toIndex: CC1, color: "#111827", activeFrom: 0.12, activeTo: 0.4, style: "pair" },
    { fromIndex: CA, toIndex: CC2, color: "#1d4ed8", activeFrom: 0.36, activeTo: 0.68, style: "pair" },
    { fromIndex: CC2, toIndex: O2, color: "#b45309", activeFrom: 0.55, activeTo: 0.72, style: "pair" },
    { fromIndex: BASE, toIndex: HA2, color: "#1d4ed8", activeFrom: 0.7, activeTo: 0.95, style: "pair" },
    { fromIndex: HA2, toIndex: CC2, color: "#111827", activeFrom: 0.78, activeTo: 1, style: "pair" },
    { fromIndex: CC2, toIndex: O2, color: "#b45309", activeFrom: 0.75, activeTo: 1, style: "pair" },
  ],
  bondOrders: [
    { a: CC1, b: O1, order: 2, from: 0, to: 0.1 },
    { a: CA, b: CC1, order: 2, from: 0.1, to: 0.36 },
    { a: CC1, b: O1, order: 2, from: 0.36, to: 1 },
    { a: CC2, b: O2, order: 2, from: 0, to: 0.35 },
    { a: CA, b: CC2, order: 2, from: 0.8, to: 1 },
  ],
  captions: [
    { from: 0, to: 0.08, text: "שני שווי אצטלדהיד: מולקולה אחת תאבד Hα ותהפוך לאנולאט נוקלאופילי." },
    { from: 0.08, to: 0.35, text: "שלב 1: בסיס מסיר Hα - נוצר אנולאט (מיוצב בתהודה בין הפחמן לחמצן)." },
    { from: 0.35, to: 0.55, text: "שלב 2: הפחמן הנוקלאופילי של האנולאט תוקף את פחמן הקרבוניל של המולקולה השנייה." },
    { from: 0.55, to: 0.68, text: "התוצר (אדיציה אלדולית): בטא-הידרוקסי אלדהיד - קשר C-C חדש, OH חדש." },
    { from: 0.68, to: 0.95, text: "שלב 3 (התייבשות): בסיס מסיר Hα נוסף בעוד ה-OH עוזב - נוצר קשר π מצומד חדש." },
    { from: 0.9, to: 1, text: "התוצר הסופי: קרוטונאלדהיד (אנל מצומד) - זהו 'עיבוי' כי אבד מים בנוסף לקשר C-C." },
  ],
};
