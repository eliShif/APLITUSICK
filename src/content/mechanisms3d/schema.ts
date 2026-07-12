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

/**
 * חלון זמן שבו קשר בין שני אטומים מסוימים (לפי אינדקס ב-frame.atoms) מוצג ככפול/משולש
 * (order 2/3) במקום בודד. הבדיקה האוטומטית של 3Dmol (מבוססת מרחק בלבד) תמיד יוצרת קשרים
 * בודדים - זה overlay שדורס את order לאחר טעינת הפריים, לפריימים שבהם t בטווח. מחוץ לכל
 * חלון - הקשר חוזר לבודד (ברירת המחדל האוטומטית). אותו זוג אטומים יכול להופיע בכמה חלונות
 * (למשל C=O שנשבר ואז נוצר מחדש בתגובת נגזרת קרבוקסילית).
 */
export interface Mechanism3DBondOrder {
  a: number;
  b: number;
  order: 2 | 3;
  from: number;
  to: number;
}

export interface Mechanism3DMeta {
  slug: string;
  title: string;
  frames: Mechanism3DFrame[];
  roles: Mechanism3DRole[];
  arrows: Mechanism3DArrow[];
  captions: Mechanism3DStepCaption[];
  bondOrders?: Mechanism3DBondOrder[];
}

export function captionForT(captions: Mechanism3DStepCaption[], t: number): string {
  for (const c of captions) {
    if (t >= c.from && t <= c.to) return c.text;
  }
  return captions[captions.length - 1]?.text ?? "";
}
