import raw from "./sn2-frames.json";

export interface Mechanism3DAtom {
  el: string;
  pos: number[];
}

export interface Mechanism3DFrame {
  t: number;
  atoms: Mechanism3DAtom[];
}

/** אינדקסים קבועים בכל frame (ראו gen_sn2.py): 0=C, 1=Br (LG), 2=O (Nu), 3=H של ה-Nu, 4-6=שלושת ה-H של המתיל. */
export const SN2_ATOM_INDEX = { C: 0, LG: 1, NU: 2, NU_H: 3, METHYL_H: [3, 4, 5, 6] as const };

export interface Mechanism3DData {
  slug: string;
  title: string;
  tsIndex: number;
  frames: Mechanism3DFrame[];
}

export const SN2_MECHANISM_3D = raw as unknown as Mechanism3DData;

/** כיתוב טקסטואלי לכל שלב לפי טווח t - מוצג מעל הסימולטור. */
export function sn2StepCaption(t: number): string {
  if (t < 0.08) return "המגיבים: ברומומתאן וממש לפני שהידרוקסיד תוקף מהצד הנגדי ל-Br.";
  if (t < 0.42) return "הידרוקסיד מתקרב להתקפה אחורית (Back-side attack) - הקשר C-Br עדיין קיים.";
  if (t < 0.58) return "מצב מעבר: שני הקשרים חלקיים בו-זמנית (δ-), הפחמן כמעט שטוח (sp² זמנית).";
  if (t < 0.92) return "הקשר Nu-C נוצר, הברומיד ממשיך להתרחק - קבוצות ה-H כבר בצד ההפוך.";
  return "התוצרים: מתאנול וברומיד חופשי. שימו לב - קונפיגורציית ה-H התהפכה לגמרי (אינברסיה).";
}
