const SUBSCRIPT_DIGITS: Record<string, string> = {
  "₀": "0", "₁": "1", "₂": "2", "₃": "3", "₄": "4",
  "₅": "5", "₆": "6", "₇": "7", "₈": "8", "₉": "9",
};

function unicodeSubscriptsToPlain(s: string): string {
  return s.replace(/[₀-₉]/g, (ch) => SUBSCRIPT_DIGITS[ch] ?? ch);
}

/**
 * ממיר מחרוזת נוסחה כימית (כמו שהיא מאוחסנת בתוכן, למשל "(CH₃)₃C-Br" או "cis-CH₃-CH=CH-CH₃")
 * לביטוי LaTeX שתוסף mhchem של KaTeX יודע להציג יפה (אינדקסים, קשרים, מבנה) - במקום
 * הצגה כטקסט יוניקוד גולמי. תחיליות/סיומות סטריאוכימיה (cis-/trans-/(E)/(Z)) נשמרות כטקסט
 * רגיל מחוץ ל-\ce{...} כי הן לא חלק מהדקדוק הכימי של mhchem.
 */
export function formulaToTexParts(formula: string): { prefix: string; tex: string; suffix: string } {
  let rest = formula.trim();

  const prefixMatch = rest.match(/^(cis-|trans-)/i);
  const prefix = prefixMatch ? prefixMatch[0] : "";
  if (prefix) rest = rest.slice(prefix.length);

  const suffixMatch = rest.match(/\s*(\([EZ]\))$/);
  const suffix = suffixMatch ? ` ${suffixMatch[1]}` : "";
  if (suffixMatch) rest = rest.slice(0, rest.length - suffixMatch[0].length);

  const core = unicodeSubscriptsToPlain(rest.trim());
  return { prefix, tex: `\\ce{${core}}`, suffix };
}
