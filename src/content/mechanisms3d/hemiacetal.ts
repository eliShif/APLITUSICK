import raw from "./hemiacetal-frames.json";
import type { Mechanism3DFrame, Mechanism3DMeta } from "./schema";

/** אינדקסים קבועים (ראו gen_hemiacetal.py): 0=O נוקלאופילי (טבעתי), 1-3=פחמני שרשרת, 4=C קרבוניל, 5=O קרבוניל/אלקוקסיד, 6=H על O0, 7=H על C4, 8=O של H3O+, 9=H נוסף. */
const O_NU = 0;
const C4 = 4;
const O_CARB = 5;
const H3O = 8;

const frames = (raw as unknown as { frames: Mechanism3DFrame[] }).frames;

export const HEMIACETAL_MECHANISM_3D: Mechanism3DMeta = {
  slug: "hemiacetal",
  title: "יצירת המיאצטל תוך-מולקולרית (מודל מקוצר לגלוקוז)",
  frames,
  roles: [
    { index: O_CARB, label: "O", color: "#b91c1c", chargeWindows: [{ from: 0.58, to: 0.68, charge: "−" }] },
    { index: H3O, label: "H₃O", color: "#1d4ed8", chargeWindows: [{ from: 0, to: 0.68, charge: "+" }] },
  ],
  arrows: [
    { fromIndex: O_NU, toIndex: C4, color: "#1d4ed8", activeFrom: 0, activeTo: 0.7, style: "pair" },
    { fromIndex: C4, toIndex: O_CARB, color: "#111827", activeFrom: 0.35, activeTo: 0.75, style: "pair" },
    { fromIndex: O_CARB, toIndex: H3O, color: "#b91c1c", activeFrom: 0.6, activeTo: 1, style: "pair" },
  ],
  captions: [
    { from: 0, to: 0.08, text: "המגיב: 4-הידרוקסיבוטנאל - מולקולה אחת עם OH וקרבוניל. (גלוקוז עובר בדיוק אותו מנגנון, עם טבעת בת 6)." },
    { from: 0.08, to: 0.55, text: "שלב 1: החמצן ההידרוקסילי תוקף תוך-מולקולרית את פחמן הקרבוניל - נסגרת טבעת בת 5." },
    { from: 0.55, to: 0.68, text: "התווך: אלקוקסיד טבעתי טעון שלילית." },
    { from: 0.68, to: 1, text: "שלב 2: פרוטונציה (מ-H3O+ בסביבה החומצית) - נוצר המיאצטל ניטרלי." },
    { from: 0.9, to: 1, text: "התוצר: המיאצטל טבעתי - הפחמן האנומרי יכול להיות α או β (לא מוצג כאן)." },
  ],
};
