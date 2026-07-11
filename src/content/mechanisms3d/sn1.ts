import raw from "./sn1-frames.json";
import type { Mechanism3DFrame, Mechanism3DMeta } from "./schema";

/** אינדקסים קבועים (ראו gen_sn1.py): 0=C מרכזי, 1=Br(LG), 2=O(Nu, מים), 3=H של ה-Nu, 4-6=שלוש קבוצות מתיל. */
const C = 0;
const LG = 1;
const NU = 2;

const frames = (raw as unknown as { frames: Mechanism3DFrame[] }).frames;

export const SN1_MECHANISM_3D: Mechanism3DMeta = {
  slug: "sn1",
  title: "SN1 - קרבוקטיון ותקיפה נוקלאופילית",
  frames,
  roles: [
    {
      index: NU,
      label: "Nu",
      color: "#1d4ed8",
      deltaWindow: { from: 0.05, to: 0.5, sign: "-" },
    },
    {
      index: LG,
      label: "LG",
      color: "#b45309",
      chargeWindows: [{ from: 0.5, to: 1, charge: "−" }],
      deltaWindow: { from: 0.05, to: 0.5, sign: "-" },
    },
  ],
  arrows: [
    { fromIndex: C, toIndex: LG, color: "#b45309", activeFrom: 0, activeTo: 0.55, style: "pair" },
    { fromIndex: NU, toIndex: C, color: "#1d4ed8", activeFrom: 0.45, activeTo: 1, style: "pair" },
  ],
  captions: [
    { from: 0, to: 0.1, text: "המגיב: טרט-בוטיל ברומיד - פחמן מרכזי טטראהדרלי, קשור ל-3 קבוצות מתיל ול-Br." },
    { from: 0.1, to: 0.48, text: "שלב איטי, קובע קצב: הקשר C-Br נשבר הטרוליטית - הברומיד עוזב עם זוג האלקטרונים." },
    { from: 0.48, to: 0.52, text: "התווך: קרבוקטיון שטוח (sp²) - שלוש קבוצות המתיל במישור אחד, מטען חיובי על הפחמן." },
    { from: 0.52, to: 0.9, text: "שלב מהיר: נוקלאופיל (כאן מים) תוקף את הקרבוקטיון. בפועל אפשר משני צדי המישור באותה הסתברות - זו הסיבה לרצמיזציה; כאן מוצג צד אחד לדוגמה." },
    { from: 0.9, to: 1, text: "התוצרים: (לאחר איבוד פרוטון) טרט-בוטנול וברומיד חופשי." },
  ],
};
