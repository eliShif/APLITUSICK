import raw from "./carbonyl-frames.json";
import type { Mechanism3DFrame, Mechanism3DMeta } from "./schema";

/** אינדקסים קבועים (ראו gen_carbonyl.py): 0=C, 1=O (קרבוניל -> אלקוקסיד O-), 2=Nu (O), 3=H של ה-Nu, 4-5=H של הפחמן. */
const C = 0;
const O = 1;
const NU = 2;

const frames = (raw as unknown as { frames: Mechanism3DFrame[] }).frames;

export const CARBONYL_MECHANISM_3D: Mechanism3DMeta = {
  slug: "carbonyl",
  title: "סיפוח נוקלאופילי לקרבוניל",
  frames,
  roles: [
    {
      index: NU,
      label: "Nu",
      color: "#1d4ed8",
      chargeWindows: [{ from: 0, to: 0.08, charge: "−" }],
    },
    {
      index: O,
      label: "O",
      color: "#b91c1c",
      chargeWindows: [{ from: 0.55, to: 1, charge: "−" }],
    },
  ],
  arrows: [
    { fromIndex: NU, toIndex: C, color: "#1d4ed8", activeFrom: 0, activeTo: 0.65, style: "pair" },
    { fromIndex: C, toIndex: O, color: "#111827", activeFrom: 0.35, activeTo: 1, style: "pair" },
  ],
  bondOrders: [{ a: C, b: O, order: 2, from: 0, to: 0.55 }],
  captions: [
    { from: 0, to: 0.08, text: "המגיבים: פורמלדהיד (קרבוניל שטוח) ונוקלאופיל (כאן הידרוקסיד) מתקרב." },
    { from: 0.08, to: 0.55, text: "הנוקלאופיל תוקף את פחמן הקרבוניל - הפחמן מתחיל להשתטח לכיוון sp³." },
    { from: 0.55, to: 1, text: "הקשר π נשבר, זוג האלקטרונים עובר לחלוטין אל החמצן - נוצר תווך טטראהדרלי טעון (O⁻)." },
  ],
};
