"use client";

import { ChemLatex } from "@/components/ChemLatex";

/** true אם הטקסט נראה כמו תגובה שלמה (חץ/שיווי משקל/כמה מגיבים) ולא נוסחה בודדת קצרה. */
function looksLikeReaction(formula: string): boolean {
  return /->|<=>|<-/.test(formula) || formula.length > 18;
}

/**
 * מרנדר נוסחה או תגובה כימית בודדת דרך KaTeX+mhchem (\ce{...}), כיחידה אחת שלא נשברת בין
 * שורות. formula הוא התוכן הגולמי בלבד, בלי \ce{} מסביב - למשל "H2SO4", "OH-", "R-OTs", או
 * תגובה שלמה "CH3CH=CH2 + Br2 -> CH3CHBrCH2Br". נוסחאות קצרות מקבלות עטיפה שלא נשברת
 * לעולם (chemical-formula); תגובות ארוכות מקבלות עטיפה עם גלילה אופקית עדינה כשאין מקום
 * (chemical-reaction) - עדיף גלילה קטנה על פני שבירה באמצע מולקולה או חץ.
 */
export function ChemicalFormula({ formula }: { formula: string }) {
  const className = looksLikeReaction(formula) ? "chemical-reaction" : "chemical-formula";
  return <ChemLatex tex={`\\ce{${formula}}`} className={className} />;
}
