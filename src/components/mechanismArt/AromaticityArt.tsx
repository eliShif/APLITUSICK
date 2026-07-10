import { MechanismArtFrame, MECH_COLORS } from "./MechanismArtFrame";

/**
 * דלוקליזציה של יון פנוקסיד (ArO⁻) לתוך הטבעת הארומטית - הסבר לחומציות הגבוהה של פנול.
 * זהו תרשים תהודה (resonance): שני מבנים תורמים שקולים של אותו יון, מחוברים בחץ תהודה דו-ראשי (↔) -
 * לא ריאקציה (אין "מגיבים ותוצרים"), אלא שתי דרכים לצייר את אותו המבנה האמיתי.
 * פאנל 1: המטען השלילי על החמצן (O⁻), קשר C1-O בודד.
 * פאנל 2: זוג האלקטרונים "נכנס" לטבעת - קשר C1=O כפול (ללא מטען על החמצן),
 *          והמטען השלילי עבר לפחמן האורתו (C2) בתוך הטבעת.
 */

// ===== גיאומטריה של משושה (הטבעת הארומטית), מחושבת פעם אחת ברמת המודול =====
type Point = [number, number];

function hexPoints(cx: number, cy: number, r: number): Point[] {
  const pts: Point[] = [];
  for (let i = 0; i < 6; i++) {
    const angleDeg = -90 + i * 60; // התחלה מהקודקוד העליון (C1), בכיוון השעון
    const angleRad = (Math.PI / 180) * angleDeg;
    pts.push([cx + r * Math.cos(angleRad), cy + r * Math.sin(angleRad)]);
  }
  return pts;
}

// קו פנימי מקביל לצלע הטבעת - מייצג את "הקו השני" של קשר כפול
function innerBondLine(p1: Point, p2: Point, cx: number, cy: number): Point[] {
  const [x1, y1] = p1;
  const [x2, y2] = p2;
  const shrink = 0.18;
  const sx1 = x1 + (x2 - x1) * shrink;
  const sy1 = y1 + (y2 - y1) * shrink;
  const sx2 = x2 + (x1 - x2) * shrink;
  const sy2 = y2 + (y1 - y2) * shrink;
  const mx = (sx1 + sx2) / 2;
  const my = (sy1 + sy2) / 2;
  const dx = cx - mx;
  const dy = cy - my;
  const dist = Math.sqrt(dx * dx + dy * dy) || 1;
  const offset = 7;
  const nx = (dx / dist) * offset;
  const ny = (dy / dist) * offset;
  return [
    [sx1 + nx, sy1 + ny],
    [sx2 + nx, sy2 + ny],
  ];
}

const RING_R = 55;
const P1_CX = 175;
const P1_CY = 150;
const P2_CX = 600;
const P2_CY = 150;

const ring1 = hexPoints(P1_CX, P1_CY, RING_R);
const ring2 = hexPoints(P2_CX, P2_CY, RING_R);

// אינדקסי צלעות (i מחבר בין vertices[i] ל-vertices[(i+1)%6]) שהן קשרים כפולים.
// פאנל 1 (פנוקסיד "רגיל"): C1=C2, C3=C4, C5=C6 (קקולה סטנדרטי).
const doubleEdges1 = [0, 2, 4];
// פאנל 2 (אחרי "כניסת" הזוג הבודד לטבעת): C1=C2 נשבר (האלקטרונים עברו ל-C2),
// ובמקום זאת נוצר קשר כפול חדש C1=O מחוץ לטבעת. C3=C4 ו-C5=C6 נשארים ללא שינוי.
const doubleEdges2 = [2, 4];

function RingBonds({
  vertices,
  cx,
  cy,
  doubleEdges,
  keyPrefix,
}: {
  vertices: Point[];
  cx: number;
  cy: number;
  doubleEdges: number[];
  keyPrefix: string;
}) {
  return (
    <>
      {vertices.map((p, i) => {
        const next = vertices[(i + 1) % 6];
        const isDouble = doubleEdges.includes(i);
        const inner = isDouble ? innerBondLine(p, next, cx, cy) : null;
        return (
          <g key={`${keyPrefix}-edge-${i}`}>
            <line x1={p[0]} y1={p[1]} x2={next[0]} y2={next[1]} stroke={MECH_COLORS.bond} strokeWidth="2" />
            {inner && (
              <line x1={inner[0][0]} y1={inner[0][1]} x2={inner[1][0]} y2={inner[1][1]} stroke={MECH_COLORS.bond} strokeWidth="2" />
            )}
          </g>
        );
      })}
    </>
  );
}

export function AromaticityArt() {
  // C1 = קודקוד עליון (index 0), C2 = קודקוד אורתו עליון-ימני (index 1)
  const c1_p1 = ring1[0];
  const c2_p1 = ring1[1];
  const c1_p2 = ring2[0];
  const c2_p2 = ring2[1];

  // נקודת קצה עליונה של קשר C1-O (פנוקסיד/פנול) - ישר מעל C1
  const o1x = c1_p1[0];
  const o1y = c1_p1[1] - 40;
  const o2x = c1_p2[0];
  const o2y = c1_p2[1] - 40;

  return (
    <MechanismArtFrame
      title="דלוקליזציה של פנוקסיד לטבעת הארומטית - מקור לחומציות הגבוהה של פנול"
      note="המטען השלילי על החמצן (בפנוקסיד) יכול 'להיכנס' לטבעת ולהתפזר על פחמני האורתו/פארא (עוד 2 מבני תהודה דומים לא מצוירים כאן) - הפיזור הזה מייצב את הפנוקסיד ולכן הופך את פנול לחומצי בהרבה יותר מאלכוהול רגיל (שהאלקוקסיד שלו לא יכול להתפזר כך)."
    >
      <svg viewBox="0 0 760 300" className="w-full h-auto" style={{ minWidth: 620 }}>
        <defs>
          <marker id="arrow-phenoxide" viewBox="0 0 10 10" refX="8" refY="5" markerWidth="6" markerHeight="6" orient="auto-start-reverse">
            <path d="M0,0 L10,5 L0,10 z" fill={MECH_COLORS.arrow} />
          </marker>
          <marker id="arrow-phenoxide-resonance-start" viewBox="0 0 10 10" refX="2" refY="5" markerWidth="6" markerHeight="6" orient="auto-start-reverse">
            <path d="M10,0 L0,5 L10,10 z" fill={MECH_COLORS.arrow} />
          </marker>
        </defs>

        {/* ===== פאנל 1: פנוקסיד, מטען שלילי על החמצן ===== */}
        <g fontFamily="inherit">
          <RingBonds vertices={ring1} cx={P1_CX} cy={P1_CY} doubleEdges={doubleEdges1} keyPrefix="p1" />

          {/* קשר C1-O בודד */}
          <line x1={c1_p1[0]} y1={c1_p1[1]} x2={o1x} y2={o1y} stroke={MECH_COLORS.bond} strokeWidth="2" />

          {/* חמצן טעון שלילית - תווית, מטען, ושני זוגות בודדים */}
          <text x={o1x} y={o1y - 12} fontSize="18" fontWeight="700" fill={MECH_COLORS.atom} textAnchor="middle">
            O
          </text>
          <text x={o1x + 15} y={o1y - 22} fontSize="14" fill={MECH_COLORS.charge} textAnchor="middle">
            ⁻
          </text>
          {/* זוג בודד עליון */}
          <circle cx={o1x - 4} cy={o1y - 32} r="2" fill={MECH_COLORS.atom} />
          <circle cx={o1x + 4} cy={o1y - 32} r="2" fill={MECH_COLORS.atom} />
          {/* זוג בודד שמאלי */}
          <circle cx={o1x - 20} cy={o1y - 18} r="2" fill={MECH_COLORS.atom} />
          <circle cx={o1x - 20} cy={o1y - 11} r="2" fill={MECH_COLORS.atom} />

          {/* תווית C1 / C2 */}
          <text x={c1_p1[0] + 14} y={c1_p1[1] - 2} fontSize="11" fill={MECH_COLORS.atom} textAnchor="middle">
            C1
          </text>
          <text x={c2_p1[0] + 16} y={c2_p1[1] + 2} fontSize="11" fill={MECH_COLORS.atom} textAnchor="middle">
            C2
          </text>

          {/* החץ המקווקוו: זוג בודד על O פונה אל תוך הטבעת, לכיוון C2 */}
          <path
            d={`M${o1x - 15},${o1y - 20} Q${o1x + 45},${o1y + 10} ${c2_p1[0] - 8},${c2_p1[1] - 4}`}
            fill="none"
            stroke={MECH_COLORS.arrow}
            strokeWidth="2.25"
            markerEnd="url(#arrow-phenoxide)"
          />

          <text x={P1_CX} y={P1_CY + 90} fontSize="13" fill={MECH_COLORS.atom} textAnchor="middle" fontWeight="600">
            מבנה תורם א' - מטען על החמצן
          </text>
        </g>

        {/* ===== חץ תהודה דו-ראשי (↔) ===== */}
        <line
          x1="330"
          y1="150"
          x2="440"
          y2="150"
          stroke={MECH_COLORS.arrow}
          strokeWidth="2.5"
          markerEnd="url(#arrow-phenoxide)"
          markerStart="url(#arrow-phenoxide-resonance-start)"
        />

        {/* ===== פאנל 2: קשר C1=O כפול, מטען שלילי על C2 (אורתו) ===== */}
        <g fontFamily="inherit">
          <RingBonds vertices={ring2} cx={P2_CX} cy={P2_CY} doubleEdges={doubleEdges2} keyPrefix="p2" />

          {/* קשר C1=O כפול */}
          <line x1={c1_p2[0]} y1={c1_p2[1]} x2={o2x} y2={o2y} stroke={MECH_COLORS.bond} strokeWidth="2" />
          <line x1={c1_p2[0] - 7} y1={c1_p2[1] - 1} x2={o2x - 7} y2={o2y + 5} stroke={MECH_COLORS.bond} strokeWidth="2" />

          {/* חמצן ניטרלי - תווית ושני זוגות בודדים (ללא מטען) */}
          <text x={o2x} y={o2y - 12} fontSize="18" fontWeight="700" fill={MECH_COLORS.atom} textAnchor="middle">
            O
          </text>
          <circle cx={o2x - 4} cy={o2y - 32} r="2" fill={MECH_COLORS.atom} />
          <circle cx={o2x + 4} cy={o2y - 32} r="2" fill={MECH_COLORS.atom} />
          <circle cx={o2x - 20} cy={o2y - 18} r="2" fill={MECH_COLORS.atom} />
          <circle cx={o2x - 20} cy={o2y - 11} r="2" fill={MECH_COLORS.atom} />

          {/* תווית C1 / C2 */}
          <text x={c1_p2[0] + 14} y={c1_p2[1] - 2} fontSize="11" fill={MECH_COLORS.atom} textAnchor="middle">
            C1
          </text>
          <text x={c2_p2[0] + 16} y={c2_p2[1] + 2} fontSize="11" fill={MECH_COLORS.atom} textAnchor="middle">
            C2
          </text>

          {/* המטען השלילי עבר לפחמן האורתו C2, עם זוג בודד */}
          <text x={c2_p2[0] + 34} y={c2_p2[1] - 6} fontSize="14" fill={MECH_COLORS.charge} textAnchor="middle" fontWeight="700">
            ⁻
          </text>
          <circle cx={c2_p2[0] + 26} cy={c2_p2[1] - 22} r="2" fill={MECH_COLORS.charge} />
          <circle cx={c2_p2[0] + 33} cy={c2_p2[1] - 22} r="2" fill={MECH_COLORS.charge} />

          <text x={P2_CX} y={P2_CY + 90} fontSize="13" fill={MECH_COLORS.atom} textAnchor="middle" fontWeight="600">
            מבנה תורם ב' - מטען על פחמן האורתו (C2)
          </text>
        </g>
      </svg>
    </MechanismArtFrame>
  );
}
