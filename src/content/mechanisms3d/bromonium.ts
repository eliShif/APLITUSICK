import raw from "./bromonium-frames.json";
import type { Mechanism3DFrame, Mechanism3DMeta } from "./schema";

/** אינדקסים קבועים (ראו gen_bromonium.py): 0=C1, 1=C2, 2=Br ראשון (גשר), 3=Br שני (תוקף מהצד הנגדי), 4-5=H של C1, 6-7=H של C2. */
const C1 = 0;
const C2 = 1;
const BR1 = 2;
const BR2 = 3;

const frames = (raw as unknown as { frames: Mechanism3DFrame[] }).frames;

export const BROMONIUM_MECHANISM_3D: Mechanism3DMeta = {
  slug: "bromonium",
  title: "סיפוח Br₂ לאלקן - סטריאוכימיית אנטי",
  frames,
  roles: [
    { index: BR1, label: "Br", color: "#b45309", chargeWindows: [{ from: 0.4, to: 0.6, charge: "+" }] },
    { index: BR2, label: "Br", color: "#b45309", chargeWindows: [{ from: 0.4, to: 0.55, charge: "−" }] },
  ],
  arrows: [
    { fromIndex: C1, toIndex: BR1, color: "#1d4ed8", activeFrom: 0, activeTo: 0.55, style: "pair" },
    { fromIndex: BR1, toIndex: BR2, color: "#b45309", activeFrom: 0, activeTo: 0.45, style: "pair" },
    { fromIndex: BR2, toIndex: C2, color: "#b45309", activeFrom: 0.45, activeTo: 1, style: "pair" },
  ],
  bondOrders: [{ a: C1, b: C2, order: 2, from: 0, to: 0.08 }],
  captions: [
    { from: 0, to: 0.08, text: "המגיבים: אתילן (π שטוח) ו-Br2 מתקרב." },
    { from: 0.08, to: 0.45, text: "אלקטרוני ה-π תוקפים Br אחד - נוצר קשר, ה-Br השני עוזב כברומיד חופשי (בפועל: יון ברומוניום מגושר)." },
    { from: 0.4, to: 0.6, text: "התווך: מטען חיובי חלקי ליד ה-Br הקשור, ברומיד חופשי בסביבה." },
    { from: 0.55, to: 1, text: "הברומיד תוקף את הפחמן השני מהצד הנגדי (אנטי) ל-Br הראשון - התקפה אחורית, בדיוק כמו ב-SN2." },
    { from: 0.9, to: 1, text: "התוצר: דיברומיד וויצינלי - שני ה-Br באנטי (טרנס) זה לזה, לא באותו צד." },
  ],
};
