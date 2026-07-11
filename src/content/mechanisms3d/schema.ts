export interface Mechanism3DAtom {
  el: string;
  pos: number[];
}

export interface Mechanism3DFrame {
  t: number;
  atoms: Mechanism3DAtom[];
}

export interface Mechanism3DRole {
  /** אינדקס האטום ב-frame.atoms */
  index: number;
  /** תווית קצרה שתוצג מעל האטום (בלי מטען - המטען מתווסף לפי chargeWindows) */
  label: string;
  color: string;
  /** טווחי t שבהם מוצג מטען מלא ליד התווית, לדוגמה [{from:0,to:0.06,charge:"−"}] */
  chargeWindows?: { from: number; to: number; charge: string }[];
  /** טווח t שבו מוצג δ+/δ- מעל התווית */
  deltaWindow?: { from: number; to: number; sign: "+" | "-" };
}

export interface Mechanism3DArrow {
  fromIndex: number;
  toIndex: number;
  color: string;
  /** טווח t שבו החץ באטימות מלאה; מחוץ לטווח - עמעום (לא נעלם לגמרי, כדי לא "לקפוץ") */
  activeFrom: number;
  activeTo: number;
  /** fishhook = חץ חד-קוצי לתנועת אלקטרון בודד (רדיקלים); pair = חץ רגיל לזוג אלקטרונים */
  style?: "pair" | "fishhook";
}

export interface Mechanism3DStepCaption {
  from: number;
  to: number;
  text: string;
}

export interface Mechanism3DMeta {
  slug: string;
  title: string;
  frames: Mechanism3DFrame[];
  roles: Mechanism3DRole[];
  arrows: Mechanism3DArrow[];
  captions: Mechanism3DStepCaption[];
}

export function captionForT(captions: Mechanism3DStepCaption[], t: number): string {
  for (const c of captions) {
    if (t >= c.from && t <= c.to) return c.text;
  }
  return captions[captions.length - 1]?.text ?? "";
}
