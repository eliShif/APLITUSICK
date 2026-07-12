import raw from "./carboxylic-frames.json";
import type { Mechanism3DFrame, Mechanism3DMeta } from "./schema";

/** אינדקסים קבועים (ראו gen_carboxylic.py): 0=C, 1=O (קרבוניל<->אלקוקסיד), 2=Cl(LG), 3=Nu(O), 4=H של ה-Nu, 5=מתיל צופה. */
const C = 0;
const O = 1;
const LG = 2;
const NU = 3;

const frames = (raw as unknown as { frames: Mechanism3DFrame[] }).frames;

export const CARBOXYLIC_MECHANISM_3D: Mechanism3DMeta = {
  slug: "carboxylic",
  title: "תגובת נגזרת קרבוקסילית - תוספת-אלימינציה",
  frames,
  roles: [
    { index: NU, label: "Nu", color: "#1d4ed8", chargeWindows: [{ from: 0, to: 0.05, charge: "−" }] },
    { index: O, label: "O", color: "#b91c1c", chargeWindows: [{ from: 0.42, to: 0.58, charge: "−" }] },
    { index: LG, label: "LG", color: "#b45309", chargeWindows: [{ from: 0.95, to: 1, charge: "−" }] },
  ],
  arrows: [
    { fromIndex: NU, toIndex: C, color: "#1d4ed8", activeFrom: 0, activeTo: 0.55, style: "pair" },
    { fromIndex: C, toIndex: O, color: "#111827", activeFrom: 0.3, activeTo: 0.6, style: "pair" },
    { fromIndex: O, toIndex: C, color: "#111827", activeFrom: 0.5, activeTo: 0.8, style: "pair" },
    { fromIndex: C, toIndex: LG, color: "#b45309", activeFrom: 0.55, activeTo: 1, style: "pair" },
  ],
  bondOrders: [
    { a: C, b: O, order: 2, from: 0, to: 0.3 },
    { a: C, b: O, order: 2, from: 0.58, to: 1 },
  ],
  captions: [
    { from: 0, to: 0.08, text: "המגיבים: אציל כלוריד (קרבוניל שטוח) ונוקלאופיל מתקרב." },
    { from: 0.08, to: 0.42, text: "שלב 1 (תוספת): הנוקלאופיל תוקף את פחמן הקרבוניל - הפחמן הופך ל-sp³." },
    { from: 0.42, to: 0.58, text: "התווך הטטראהדרלי: C קשור ל-4 קבוצות (Me, LG, O⁻, Nu) - טעון שלילית על החמצן." },
    { from: 0.58, to: 0.95, text: "שלב 2 (אלימינציה): זוג האלקטרונים על O⁻ מחזיר את קשר ה-π, וה-LG עוזב - הפחמן חוזר ל-sp²." },
    { from: 0.95, to: 1, text: "התוצרים: נגזרת קרבוקסילית חדשה + LG⁻ חופשי." },
  ],
};
