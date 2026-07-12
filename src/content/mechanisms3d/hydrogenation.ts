import raw from "./hydrogenation-frames.json";
import type { Mechanism3DFrame, Mechanism3DMeta } from "./schema";

/** אינדקסים קבועים (ראו gen_hydrogenation.py): 0=C1, 1=C2, 2=H חדש על C1, 3=H חדש על C2, 4-5=H של C1, 6-7=H של C2. */
const C1 = 0;
const C2 = 1;
const H1_NEW = 2;
const H2_NEW = 3;

const frames = (raw as unknown as { frames: Mechanism3DFrame[] }).frames;

export const HYDROGENATION_MECHANISM_3D: Mechanism3DMeta = {
  slug: "hydrogenation",
  title: "הידרוגנציה קטליטית - סיפוח סין (Syn)",
  frames,
  roles: [
    { index: H1_NEW, label: "H", color: "#1d4ed8" },
    { index: H2_NEW, label: "H", color: "#1d4ed8" },
  ],
  arrows: [],
  bondOrders: [{ a: C1, b: C2, order: 2, from: 0, to: 0.5 }],
  captions: [
    { from: 0, to: 0.1, text: "המגיבים: אתילן (אלקן שטוח) ו-H₂ - שניהם נספחים למשטח קטליזטור מתכתי (Pd/Pt/Ni)." },
    { from: 0.1, to: 0.85, text: "שני אטומי המימן מועברים בו-זמנית מהמשטח לאותו הצד של האלקן - זו הסיבה לסטריאוכימיה של סיפוח סין (Syn)." },
    { from: 0.85, to: 1, text: "התוצר: אתאן - שני הפחמנים sp³, שני ה-H החדשים באותו צד שממנו הגיע המשטח." },
  ],
};
