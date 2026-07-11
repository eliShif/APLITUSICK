import { MechanismArtFrame, MECH_COLORS } from "./MechanismArtFrame";
import { ChemLatexSvg } from "@/components/ChemLatex";

/**
 * התבנית האוניברסלית והמופשטת: Nu תוקף E, LG פורש. שלב אחד, שני פאנלים
 * (Nu⁻-E-LG מגיבים -> Nu-E תוצר + LG⁻). זהו התרשים המובהק ביותר באתר להצגת קונבנציית
 * δ+/δ- (על E ועל LG), דרך ChemLatexSvg. מכיוון שזה תבנית מופשטת/כללית (E יכול להיות כל
 * אטום, לאו דווקא מרכז סטריאוגני אמיתי) - אין טריז/מקווקוו כאן, רק קווי קשר רגילים.
 */
export function ReactivityToolkitArt() {
  return (
    <MechanismArtFrame
      title="התבנית האוניברסלית: נוקלאופיל תוקף אלקטרופיל, קבוצה עוזבת עוזבת"
      note="כמעט כל מנגנון בקורס (SN2, SN1, תוספת לקרבוניל, תוספת-אלימינציה, ואפילו שלבים בתגובות סיפוח/אלימינציה) הוא וריאציה על שני החצים האלה. ברגע שמזהים מי הנוקלאופיל, מי האלקטרופיל (עם ה-δ+) ומי הקבוצה העוזבת (עם ה-δ-) - אפשר לצייר את רוב המנגנונים בקורס."
    >
      <svg viewBox="0 0 720 220" className="w-full h-auto" style={{ minWidth: 560 }}>
        <defs>
          <marker
            id="arrow-generic-pattern"
            viewBox="0 0 10 10"
            refX="8"
            refY="5"
            markerWidth="6"
            markerHeight="6"
            orient="auto-start-reverse"
          >
            <path d="M0,0 L10,5 L0,10 z" fill={MECH_COLORS.arrow} />
          </marker>
        </defs>

        {/* פאנל 1: מגיבים */}
        <g fontFamily="inherit">
          {/* זוג בודד ליד Nu */}
          <circle cx="60" cy="88" r="2" fill={MECH_COLORS.nucleophile} />
          <circle cx="66" cy="88" r="2" fill={MECH_COLORS.nucleophile} />
          <ChemLatexSvg tex="\ce{Nu^-}" x={56} y={112} fontSize={19} color={MECH_COLORS.nucleophile} />

          {/* קו Nu - E */}
          <line x1="90" y1="110" x2="150" y2="110" stroke={MECH_COLORS.bond} strokeWidth="2" />

          {/* E עם δ+ */}
          <text x="165" y="117" fontSize="19" fontWeight="700" fill={MECH_COLORS.atom} textAnchor="middle">
            E
          </text>
          <ChemLatexSvg tex="\delta^+" x={165} y={84} fontSize={14} color={MECH_COLORS.charge} />

          {/* קו E - LG */}
          <line x1="180" y1="110" x2="240" y2="110" stroke={MECH_COLORS.bond} strokeWidth="2" />

          {/* LG עם δ- */}
          <text x="260" y="117" fontSize="19" fontWeight="700" fill={MECH_COLORS.electrophileLeavingGroup} textAnchor="middle">
            LG
          </text>
          <ChemLatexSvg tex="\delta^-" x={260} y={84} fontSize={14} color={MECH_COLORS.electrophileLeavingGroup} />

          {/* חץ 1: מהזוג הבודד של Nu אל E */}
          <path
            d="M68,85 Q115,68 150,100"
            fill="none"
            stroke={MECH_COLORS.arrow}
            strokeWidth="2.25"
            markerEnd="url(#arrow-generic-pattern)"
          />

          {/* חץ 2: מאמצע קשר E-LG אל LG */}
          <path
            d="M210,110 Q230,88 254,98"
            fill="none"
            stroke={MECH_COLORS.arrow}
            strokeWidth="2.25"
            markerEnd="url(#arrow-generic-pattern)"
          />

          <text x="160" y="185" fontSize="13" fill={MECH_COLORS.atom} textAnchor="middle" fontWeight="600">
            מגיבים
          </text>
        </g>

        {/* חץ תגובה מרכזי */}
        <line
          x1="330"
          y1="110"
          x2="400"
          y2="110"
          stroke={MECH_COLORS.arrow}
          strokeWidth="2.5"
          markerEnd="url(#arrow-generic-pattern)"
        />

        {/* פאנל 2: תוצרים */}
        <g fontFamily="inherit">
          {/* Nu-E מחוברים */}
          <text x="470" y="117" fontSize="19" fontWeight="700" fill={MECH_COLORS.nucleophile} textAnchor="middle">
            Nu
          </text>
          <line x1="490" y1="110" x2="525" y2="110" stroke={MECH_COLORS.bond} strokeWidth="2.5" />
          <text x="545" y="117" fontSize="19" fontWeight="700" fill={MECH_COLORS.atom} textAnchor="middle">
            E
          </text>

          {/* LG⁻ נפרד */}
          <ChemLatexSvg tex="\ce{LG^-}" x={655} y={112} fontSize={19} color={MECH_COLORS.electrophileLeavingGroup} />

          <text x="560" y="185" fontSize="13" fill={MECH_COLORS.atom} textAnchor="middle" fontWeight="600">
            תוצרים - קשר חדש נוצר, הקבוצה העוזבת פרשה
          </text>
        </g>
      </svg>
    </MechanismArtFrame>
  );
}
