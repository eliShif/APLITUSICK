import { Fragment } from "react";
import { ChemicalFormula } from "@/components/ChemicalFormula";

/**
 * מסיר סימוני [[chem:...]] ומחזיר את הנוסחה הגולמית בלבד (בלי הסוגריים) - לשימוש בטקסט
 * שמיועד להקראה (TTS) או להשוואת מחרוזות, לא לתצוגה.
 */
export function stripChemMarkers(text: string): string {
  return text.replace(/\[\[chem:(.+?)\]\]/g, "$1");
}

/**
 * מרנדר מחרוזת טקסט עברי חופשי שעשויה להכיל נוסחאות/תגובות כימיות המסומנות במפורש כ-
 * [[chem:...]] (למשל "יש להשתמש ב-[[chem:SOCl2]] או [[chem:PBr3]]") ומחליף *רק* את מה
 * שסומן ב-ChemicalFormula (KaTeX+mhchem). לא מנחש/מזהה אוטומטית שום טקסט אחר, כדי לא לפגוע
 * בקיצורים כמו SN1/SN2/E1/E2 או מילים רגילות שמכילות ספרות/אותיות גדולות.
 *
 * שימוש: <p><ChemText>{section.paragraph}</ChemText></p>
 * בטוח להפעיל גם על טקסט בלי שום סימון - במקרה כזה פשוט מוחזרת המחרוזת המקורית כמו שהיא.
 */
export function ChemText({ children }: { children: string }) {
  const parts = children.split(/\[\[chem:(.+?)\]\]/g);
  return (
    <>
      {parts.map((part, i) => (i % 2 === 1 ? <ChemicalFormula key={i} formula={part} /> : <Fragment key={i}>{part}</Fragment>))}
    </>
  );
}
