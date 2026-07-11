"use client";

import { useEffect, useRef } from "react";
import katex from "katex";
import "katex/contrib/mhchem";
import { formulaToTexParts } from "@/lib/chemFormula";

/**
 * מרנדר נוסחה כימית/מתמטית עם KaTeX (כולל תוסף mhchem ל-\ce{...} - נוסחאות כימיות עם
 * אינדקסים, מטענים וחצי תגובה תקניים) במקום טקסט SVG גולמי או תבליטים יוניקוד ידניים.
 * דוגמה: <ChemLatex tex="\\ce{(CH3)3C-Br}" /> או <ChemLatex tex="\\ce{Nu^- + R-LG -> Nu-R + LG^-}" />
 */
export function ChemLatex({ tex, className }: { tex: string; className?: string }) {
  const ref = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    if (!ref.current) return;
    try {
      katex.render(tex, ref.current, { throwOnError: false, output: "html" });
    } catch {
      if (ref.current) ref.current.textContent = tex;
    }
  }, [tex]);

  // dir="ltr" חובה כאן - העמוד כולו RTL, ובלעדיו אלגוריתם ה-bidi מפזר מחדש את איברי ה-DOM
  // הפנימיים של KaTeX (כל אטום/אינדקס הוא span נפרד) וגורם לנוסחה להיראות מעורבבת לגמרי.
  return <span ref={ref} dir="ltr" className={className} style={{ unicodeBidi: "isolate" }} />;
}

/** מציג נוסחת מולקולה מאוחסנת (כמו "(CH₃)₃C-Br") כ-LaTeX כימי תקני עם mhchem. */
export function ChemFormula({ formula, className }: { formula: string; className?: string }) {
  const { prefix, tex, suffix } = formulaToTexParts(formula);
  return (
    <span className={className} dir="ltr" style={{ unicodeBidi: "isolate" }}>
      {prefix && <i>{prefix}</i>}
      <ChemLatex tex={tex} />
      {suffix}
    </span>
  );
}

/**
 * תווית LaTeX/mhchem בתוך תרשים SVG (לתוויות מנגנון - נוסחאות, מטענים, קבוצות) דרך
 * foreignObject. x,y הן נקודת העיגון (מרכז/קצה) באותן יחידות viewBox כמו שאר האלמנטים ב-SVG.
 */
export function ChemLatexSvg({
  tex,
  x,
  y,
  width = 90,
  height = 34,
  fontSize = 15,
  color,
  anchor = "middle",
}: {
  tex: string;
  x: number;
  y: number;
  width?: number;
  height?: number;
  fontSize?: number;
  color?: string;
  anchor?: "start" | "middle" | "end";
}) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!ref.current) return;
    try {
      katex.render(tex, ref.current, { throwOnError: false, output: "html" });
    } catch {
      if (ref.current) ref.current.textContent = tex;
    }
  }, [tex]);

  const fx = anchor === "middle" ? x - width / 2 : anchor === "end" ? x - width : x;
  const justify = anchor === "middle" ? "center" : anchor === "end" ? "flex-end" : "flex-start";

  return (
    <foreignObject x={fx} y={y - height / 2} width={width} height={height} style={{ overflow: "visible" }}>
      <div
        ref={ref}
        // @ts-expect-error xmlns is a valid attribute for foreignObject content, not in React's HTML typings
        xmlns="http://www.w3.org/1999/xhtml"
        dir="ltr"
        style={{
          display: "flex",
          justifyContent: justify,
          alignItems: "center",
          width: "100%",
          height: "100%",
          fontSize: `${fontSize}px`,
          color,
          lineHeight: 1,
        }}
      />
    </foreignObject>
  );
}
