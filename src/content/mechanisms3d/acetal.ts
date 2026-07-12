import raw from "./acetal-frames.json";
import type { Mechanism3DFrame, Mechanism3DMeta } from "./schema";

/** אינדקסים קבועים (ראו gen_acetal.py): 0=C, 1=O מקורי (עוזב כמים), 2=H עליו, 3=O מתנול 1, 4=C שלו, 5=O מתנול 2, 6=C שלו, 7-8=H מקוריים. */
const C = 0;
const O_LEAVE = 1;
const NU1 = 3;
const NU2 = 5;

const frames = (raw as unknown as { frames: Mechanism3DFrame[] }).frames;

export const ACETAL_MECHANISM_3D: Mechanism3DMeta = {
  slug: "acetal",
  title: "יצירת אצטל - יון אוקסוקרבניום",
  frames,
  roles: [
    { index: NU1, label: "MeOH", color: "#1d4ed8" },
    { index: O_LEAVE, label: "O", color: "#b91c1c" },
    { index: NU2, label: "MeOH", color: "#1d4ed8" },
  ],
  arrows: [
    { fromIndex: NU1, toIndex: C, color: "#1d4ed8", activeFrom: 0, activeTo: 0.38, style: "pair" },
    { fromIndex: C, toIndex: O_LEAVE, color: "#b91c1c", activeFrom: 0.28, activeTo: 0.62, style: "pair" },
    { fromIndex: NU2, toIndex: C, color: "#1d4ed8", activeFrom: 0.62, activeTo: 1, style: "pair" },
  ],
  captions: [
    { from: 0, to: 0.06, text: "המגיבים: פורמלדהיד וכוהל ראשון (מתנול) מתקרב, בסביבה חומצית." },
    { from: 0.06, to: 0.33, text: "שלב 1: המתנול תוקף את פחמן הקרבוניל - נוצר המיאצטל (תווך טטראהדרלי)." },
    { from: 0.28, to: 0.62, text: "שלב 2: החמצן המקורי (כמים, לאחר פרוטונציה שאינה מונפשת) עוזב - נוצר יון אוקסוקרבניום שטוח, מיוצב בתהודה ע\"י ה-O הנשאר." },
    { from: 0.62, to: 1, text: "שלב 3: מתנול שני תוקף את יון האוקסוקרבניום מהצד השני - נוצר האצטל הסופי (שני קשרי C-O)." },
    { from: 0.9, to: 1, text: "התוצר: אצטל - פחמן טטראהדרלי עם שני קשרי C-OMe, יציב בסביבה בסיסית (לא הפיך בקלות)." },
  ],
};
