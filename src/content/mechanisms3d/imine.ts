import raw from "./imine-frames.json";
import type { Mechanism3DFrame, Mechanism3DMeta } from "./schema";

/** אינדקסים קבועים (ראו gen_imine.py): 0=C1, 1=O (עוזב כמים), 2=H על אותו O, 3=N (אמין, נשאר), 4=CH3 על N, 5=H על N, 6-7=מתילי אצטון צופים. */
const C1 = 0;
const O = 1;
const N = 3;

const frames = (raw as unknown as { frames: Mechanism3DFrame[] }).frames;

export const IMINE_MECHANISM_3D: Mechanism3DMeta = {
  slug: "imine",
  title: "יצירת אימין (Schiff base) מקטון ואמין ראשוני",
  frames,
  roles: [
    { index: N, label: "N", color: "#1d4ed8" },
    { index: O, label: "O", color: "#b91c1c" },
  ],
  arrows: [
    { fromIndex: N, toIndex: C1, color: "#1d4ed8", activeFrom: 0, activeTo: 0.55, style: "pair" },
    { fromIndex: C1, toIndex: O, color: "#b91c1c", activeFrom: 0.3, activeTo: 0.75, style: "pair" },
  ],
  captions: [
    { from: 0, to: 0.08, text: "המגיבים: אצטון (קרבוניל שטוח) ומתילאמין מתקרב." },
    { from: 0.08, to: 0.48, text: "האמין תוקף את פחמן הקרבוניל - נוצר תווך טטראהדרלי (קרבינולאמין, לאחר איזון פרוטונים שאינו מונפש כאן)." },
    { from: 0.48, to: 0.85, text: "המים (מהחמצן המקורי) עוזבים - הפחמן משתטח שוב ל-sp², נוצר קשר π עם החנקן." },
    { from: 0.85, to: 1, text: "התוצר: אימין (Schiff base) - לאחר דה-פרוטונציה סופית של החנקן (לא מונפשת) מתקבל אימין ניטרלי." },
  ],
};
