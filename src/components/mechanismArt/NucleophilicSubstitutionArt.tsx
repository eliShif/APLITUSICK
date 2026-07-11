import { MechanismArtFrame, MECH_COLORS } from "./MechanismArtFrame";
import { ChemLatexSvg } from "@/components/ChemLatex";

/**
 * דוגמת הייחוס לכל שאר תרשימי "מנגנון עם חצים" באתר - SN2, התקפה אחורית והיפוך קונפיגורציה.
 * מבנה קבוע: פאנל מגיבים (עם חצים מקווקווים) ← חץ תגובה ← פאנל תוצרים.
 * עיקרון: סכמטי ובהיר (לא ציור סקלטלי מדויק) - עיגולים/תוויות טקסט לאטומים הרלוונטיים בלבד,
 * חץ מקווקוו אמיתי (path + marker חץ) לכל תנועת זוג אלקטרונים, קוד צבעים מ-MECH_COLORS.
 */
export function NucleophilicSubstitutionArt() {
  return (
    <MechanismArtFrame
      title="מנגנון SN2 - התקפה אחורית והיפוך קונפיגורציה"
      note="החץ הכחול: זוג האלקטרונים של הנוקלאופיל תוקף את הפחמן מהצד הנגדי לקבוצה הפורשת. החץ הענברי: זוג האלקטרונים של הקשר C-LG עובר אל הקבוצה הפורשת. שימו לב שקבוצות ה-H מתהפכות לצד השני בתוצר (כמו מטרייה שהופכת ברוח)."
    >
      <svg viewBox="0 0 720 220" className="w-full h-auto" style={{ minWidth: 560 }}>
        <defs>
          <marker id="arrow-sn2" viewBox="0 0 10 10" refX="8" refY="5" markerWidth="6" markerHeight="6" orient="auto-start-reverse">
            <path d="M0,0 L10,5 L0,10 z" fill={MECH_COLORS.arrow} />
          </marker>
        </defs>

        {/* ===== פאנל 1: מגיבים ===== */}
        <g fontFamily="inherit">
          {/* קבוצות H פונות למעלה (לפני ההיפוך) */}
          <line x1="150" y1="108" x2="120" y2="55" stroke={MECH_COLORS.bond} strokeWidth="2" />
          <line x1="150" y1="108" x2="150" y2="45" stroke={MECH_COLORS.bond} strokeWidth="2" />
          <line x1="150" y1="108" x2="180" y2="55" stroke={MECH_COLORS.bond} strokeWidth="2" />
          <text x="118" y="45" fontSize="15" fill={MECH_COLORS.atom} textAnchor="middle">H</text>
          <text x="150" y="38" fontSize="15" fill={MECH_COLORS.atom} textAnchor="middle">H</text>
          <text x="182" y="45" fontSize="15" fill={MECH_COLORS.atom} textAnchor="middle">H</text>

          {/* פחמן מרכזי */}
          <circle cx="150" cy="108" r="4" fill={MECH_COLORS.atom} />
          <text x="150" y="128" fontSize="15" fill={MECH_COLORS.atom} textAnchor="middle">C</text>

          {/* קשר C-LG - עדיין קשור, ללא מטען */}
          <line x1="154" y1="108" x2="235" y2="108" stroke={MECH_COLORS.bond} strokeWidth="2" />
          <ChemLatexSvg tex="\ce{LG}" x={258} y={110} fontSize={17} color={MECH_COLORS.electrophileLeavingGroup} />

          {/* נוקלאופיל תוקף מהצד הנגדי */}
          <ChemLatexSvg tex="\ce{Nu^-}" x={58} y={110} fontSize={17} color={MECH_COLORS.nucleophile} />
          <circle cx="78" cy="95" r="2" fill={MECH_COLORS.nucleophile} />
          <circle cx="84" cy="95" r="2" fill={MECH_COLORS.nucleophile} />

          {/* חץ 1: זוג בודד של Nu אל הפחמן */}
          <path
            d="M81,92 Q110,75 140,103"
            fill="none"
            stroke={MECH_COLORS.arrow}
            strokeWidth="2.25"
            markerEnd="url(#arrow-sn2)"
          />
          {/* חץ 2: קשר C-LG אל הקבוצה העוזבת */}
          <path
            d="M200,108 Q222,85 250,98"
            fill="none"
            stroke={MECH_COLORS.arrow}
            strokeWidth="2.25"
            markerEnd="url(#arrow-sn2)"
          />

          <text x="150" y="185" fontSize="13" fill={MECH_COLORS.atom} textAnchor="middle" fontWeight="600">
            מגיבים
          </text>
        </g>

        {/* ===== חץ תגובה ===== */}
        <line x1="330" y1="108" x2="400" y2="108" stroke={MECH_COLORS.arrow} strokeWidth="2.5" markerEnd="url(#arrow-sn2)" />

        {/* ===== פאנל 2: תוצרים (קונפיגורציה הפוכה) ===== */}
        <g fontFamily="inherit">
          {/* קבוצות H מתהפכות למטה */}
          <line x1="520" y1="108" x2="490" y2="155" stroke={MECH_COLORS.bond} strokeWidth="2" />
          <line x1="520" y1="108" x2="520" y2="165" stroke={MECH_COLORS.bond} strokeWidth="2" />
          <line x1="520" y1="108" x2="550" y2="155" stroke={MECH_COLORS.bond} strokeWidth="2" />
          <text x="488" y="172" fontSize="15" fill={MECH_COLORS.atom} textAnchor="middle">H</text>
          <text x="520" y="182" fontSize="15" fill={MECH_COLORS.atom} textAnchor="middle">H</text>
          <text x="552" y="172" fontSize="15" fill={MECH_COLORS.atom} textAnchor="middle">H</text>

          <circle cx="520" cy="108" r="4" fill={MECH_COLORS.atom} />
          <text x="520" y="98" fontSize="15" fill={MECH_COLORS.atom} textAnchor="middle">C</text>

          {/* קשר חדש Nu-C מהצד השני - נייטרלי עכשיו, ללא מטען */}
          <line x1="480" y1="108" x2="516" y2="108" stroke={MECH_COLORS.bond} strokeWidth="2" />
          <ChemLatexSvg tex="\ce{Nu}" x={458} y={110} fontSize={17} color={MECH_COLORS.nucleophile} />

          {/* קבוצה עוזבת פרודה כאניון */}
          <ChemLatexSvg tex="\ce{LG^-}" x={645} y={110} fontSize={17} color={MECH_COLORS.electrophileLeavingGroup} />

          <text x="550" y="185" fontSize="13" fill={MECH_COLORS.atom} textAnchor="middle" fontWeight="600">
            תוצרים - היפוך קונפיגורציה
          </text>
        </g>
      </svg>
    </MechanismArtFrame>
  );
}
