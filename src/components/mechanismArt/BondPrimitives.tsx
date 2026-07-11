import { MECH_COLORS } from "./MechanismArtFrame";

/**
 * פרימיטיבים גיאומטריים לציור קשרים כימיים תלת-ממדיים בסגנון ספר לימוד (טריז מלא / מקווקוו),
 * לשימוש חוזר בכל תרשימי mechanismArt/. הטריז תמיד צר ליד האטום המרכזי (x1,y1) ורחב ליד
 * האטום הרחוק (x2,y2) - זו הקונבנציה הכימית הסטנדרטית (האטום הקרוב יותר לצופה מצויר רחב).
 */

function perpendicular(x1: number, y1: number, x2: number, y2: number) {
  const dx = x2 - x1;
  const dy = y2 - y1;
  const len = Math.hypot(dx, dy) || 1;
  return { ux: dx / len, uy: dy / len, px: -dy / len, py: dx / len };
}

/** קשר טריז מלא (יוצא כלפי הצופה) - משולש מלא, צר ליד המרכז ורחב ליד הקצה. */
export function WedgeBond({
  x1,
  y1,
  x2,
  y2,
  width = 7,
  color = MECH_COLORS.bond,
}: {
  x1: number;
  y1: number;
  x2: number;
  y2: number;
  width?: number;
  color?: string;
}) {
  const { px, py } = perpendicular(x1, y1, x2, y2);
  const ax = x2 + (px * width) / 2;
  const ay = y2 + (py * width) / 2;
  const bx = x2 - (px * width) / 2;
  const by = y2 - (py * width) / 2;
  return <path d={`M ${x1} ${y1} L ${ax} ${ay} L ${bx} ${by} Z`} fill={color} />;
}

/** קשר מקווקוו (פונה מהצופה) - פסים ניצבים קצרים שמתרחבים ככל שמתרחקים מהמרכז. */
export function DashBond({
  x1,
  y1,
  x2,
  y2,
  maxWidth = 7,
  segments = 5,
  color = MECH_COLORS.bond,
}: {
  x1: number;
  y1: number;
  x2: number;
  y2: number;
  maxWidth?: number;
  segments?: number;
  color?: string;
}) {
  const { ux, uy, px, py } = perpendicular(x1, y1, x2, y2);
  const len = Math.hypot(x2 - x1, y2 - y1);
  const lines = [];
  for (let i = 1; i <= segments; i++) {
    const t = i / segments;
    const cx = x1 + ux * len * t;
    const cy = y1 + uy * len * t;
    const w = (maxWidth * (0.35 + 0.65 * t)) / 2;
    lines.push(
      <line
        key={i}
        x1={cx - px * w}
        y1={cy - py * w}
        x2={cx + px * w}
        y2={cy + py * w}
        stroke={color}
        strokeWidth={1.5}
      />
    );
  }
  return <g>{lines}</g>;
}

/** סוגר מרובע גדול (למצב מעבר) - עם אפשרות לתלוי-על עליון (למשל ‡). */
export function BracketPair({
  xLeft,
  xRight,
  yTop,
  yBottom,
  color = MECH_COLORS.atom,
}: {
  xLeft: number;
  xRight: number;
  yTop: number;
  yBottom: number;
  color?: string;
}) {
  const capLeft = 10;
  const capRight = 10;
  return (
    <g fill="none" stroke={color} strokeWidth={2.5}>
      <path d={`M ${xLeft + capLeft} ${yTop} L ${xLeft} ${yTop} L ${xLeft} ${yBottom} L ${xLeft + capLeft} ${yBottom}`} />
      <path d={`M ${xRight - capRight} ${yTop} L ${xRight} ${yTop} L ${xRight} ${yBottom} L ${xRight - capRight} ${yBottom}`} />
    </g>
  );
}
