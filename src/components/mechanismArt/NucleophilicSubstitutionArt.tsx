import { MechanismArtFrame, MECH_COLORS } from "./MechanismArtFrame";
import { ChemLatexSvg } from "@/components/ChemLatex";
import { WedgeBond, DashBond, BracketPair } from "./BondPrimitives";

/**
 * דוגמת הייחוס לכל שאר תרשימי "מנגנון עם חצים" באתר - SN2, התקפה אחורית והיפוך קונפיגורציה.
 * שלושה פאנלים: מגיבים (טריז/מקווקוו תלת-ממדי אמיתי) ← מצב מעבר בסוגריים (קשרים חלקיים,
 * δ-, פחמן שטוח) ← תוצרים (הטריז/מקווקוו התהפכו - היפוך קונפיגורציה מלא).
 * קוד צבעים מ-MECH_COLORS; טריז/מקווקוו מ-BondPrimitives (לשימוש חוזר בכל שאר התרשימים).
 */
export function NucleophilicSubstitutionArt() {
  return (
    <MechanismArtFrame
      title="מנגנון SN2 - התקפה אחורית והיפוך קונפיגורציה"
      note="החץ הכחול: זוג האלקטרונים של הנוקלאופיל תוקף את הפחמן מהצד הנגדי לקבוצה הפורשת (התקפה אחורית). החץ הענברי: זוג האלקטרונים של הקשר C-LG עובר אל הקבוצה הפורשת. במצב המעבר שני הקשרים חלקיים בו-זמנית (δ-) והפחמן כמעט שטוח; לאחר מכן קבוצות ה-H מסיימות בצד ההפוך (כמו מטרייה שהופכת ברוח) - זהו ההיפוך המלא (Inversion) שאין ב-SN1."
    >
      <svg viewBox="0 0 920 260" className="w-full h-auto" style={{ minWidth: 720 }}>
        <defs>
          <marker id="arrow-sn2" viewBox="0 0 10 10" refX="8" refY="5" markerWidth="6" markerHeight="6" orient="auto-start-reverse">
            <path d="M0,0 L10,5 L0,10 z" fill={MECH_COLORS.arrow} />
          </marker>
        </defs>

        {/* ===== פאנל 1: מגיבים - טריז/מקווקוו תלת-ממדי אמיתי ===== */}
        <g>
          <line x1="140" y1="140" x2="140" y2="95" stroke={MECH_COLORS.bond} strokeWidth="2" />
          <text x="140" y="84" fontSize="15" fill={MECH_COLORS.atom} textAnchor="middle">H</text>

          <WedgeBond x1={140} y1={140} x2={100} y2={178} />
          <text x="86" y="192" fontSize="15" fill={MECH_COLORS.atom} textAnchor="middle">H</text>

          <DashBond x1={140} y1={140} x2={180} y2={178} />
          <text x="196" y="192" fontSize="15" fill={MECH_COLORS.atom} textAnchor="middle">H</text>

          <circle cx="140" cy="140" r="3.5" fill={MECH_COLORS.atom} />
          <text x="140" y="160" fontSize="13" fill={MECH_COLORS.atom} textAnchor="middle">C</text>

          <line x1="144" y1="140" x2="202" y2="140" stroke={MECH_COLORS.bond} strokeWidth="2" />
          <ChemLatexSvg tex="\ce{LG}" x={228} y={142} fontSize={17} color={MECH_COLORS.electrophileLeavingGroup} />

          <ChemLatexSvg tex="\ce{Nu^-}" x={38} y={142} fontSize={17} color={MECH_COLORS.nucleophile} />
          <circle cx="66" cy="122" r="2" fill={MECH_COLORS.nucleophile} />
          <circle cx="72" cy="122" r="2" fill={MECH_COLORS.nucleophile} />

          <path d="M69,119 Q100,98 132,133" fill="none" stroke={MECH_COLORS.arrow} strokeWidth="2.25" markerEnd="url(#arrow-sn2)" />
          <path d="M190,140 Q210,116 232,127" fill="none" stroke={MECH_COLORS.arrow} strokeWidth="2.25" markerEnd="url(#arrow-sn2)" />

          <text x="140" y="238" fontSize="13" fill={MECH_COLORS.atom} textAnchor="middle" fontWeight="600">
            מגיבים
          </text>
        </g>

        <line x1="250" y1="140" x2="303" y2="140" stroke={MECH_COLORS.arrow} strokeWidth="2.5" markerEnd="url(#arrow-sn2)" />

        {/* ===== פאנל 2: מצב מעבר - קשרים חלקיים, פחמן כמעט שטוח, בתוך סוגריים ===== */}
        <g>
          <BracketPair xLeft={320} xRight={600} yTop={75} yBottom={205} />
          <ChemLatexSvg tex="\ddagger" x={614} y={82} fontSize={16} color={MECH_COLORS.atom} anchor="start" />

          <line x1="460" y1="140" x2="460" y2="100" stroke={MECH_COLORS.bond} strokeWidth="2" />
          <text x="460" y="90" fontSize="14" fill={MECH_COLORS.atom} textAnchor="middle">H</text>
          <line x1="460" y1="140" x2="429" y2="174" stroke={MECH_COLORS.bond} strokeWidth="2" />
          <text x="417" y="188" fontSize="14" fill={MECH_COLORS.atom} textAnchor="middle">H</text>
          <line x1="460" y1="140" x2="491" y2="174" stroke={MECH_COLORS.bond} strokeWidth="2" />
          <text x="503" y="188" fontSize="14" fill={MECH_COLORS.atom} textAnchor="middle">H</text>

          <circle cx="460" cy="140" r="3.5" fill={MECH_COLORS.atom} />

          <line x1="404" y1="140" x2="452" y2="140" stroke={MECH_COLORS.nucleophile} strokeWidth="2" strokeDasharray="3 3" />
          <line x1="468" y1="140" x2="516" y2="140" stroke={MECH_COLORS.electrophileLeavingGroup} strokeWidth="2" strokeDasharray="3 3" />

          <ChemLatexSvg tex="\delta^-" x={378} y={116} fontSize={13} color={MECH_COLORS.nucleophile} />
          <ChemLatexSvg tex="\ce{Nu}" x={372} y={142} fontSize={16} color={MECH_COLORS.nucleophile} />
          <ChemLatexSvg tex="\delta^-" x={548} y={116} fontSize={13} color={MECH_COLORS.electrophileLeavingGroup} />
          <ChemLatexSvg tex="\ce{LG}" x={548} y={142} fontSize={16} color={MECH_COLORS.electrophileLeavingGroup} />

          <text x="460" y="238" fontSize="13" fill={MECH_COLORS.atom} textAnchor="middle" fontWeight="600">
            מצב מעבר - פנטה-קואורדינטי
          </text>
        </g>

        <line x1="620" y1="140" x2="673" y2="140" stroke={MECH_COLORS.arrow} strokeWidth="2.5" markerEnd="url(#arrow-sn2)" />

        {/* ===== פאנל 3: תוצרים - הטריז/מקווקוו התהפכו (היפוך קונפיגורציה מלא) ===== */}
        <g>
          <line x1="760" y1="140" x2="760" y2="185" stroke={MECH_COLORS.bond} strokeWidth="2" />
          <text x="760" y="200" fontSize="15" fill={MECH_COLORS.atom} textAnchor="middle">H</text>

          <WedgeBond x1={760} y1={140} x2={722} y2={102} />
          <text x="708" y="90" fontSize="15" fill={MECH_COLORS.atom} textAnchor="middle">H</text>

          <DashBond x1={760} y1={140} x2={798} y2={102} />
          <text x="814" y="90" fontSize="15" fill={MECH_COLORS.atom} textAnchor="middle">H</text>

          <circle cx="760" cy="140" r="3.5" fill={MECH_COLORS.atom} />
          <text x="760" y="160" fontSize="13" fill={MECH_COLORS.atom} textAnchor="middle">C</text>

          <line x1="722" y1="140" x2="756" y2="140" stroke={MECH_COLORS.bond} strokeWidth="2" />
          <ChemLatexSvg tex="\ce{Nu}" x={698} y={142} fontSize={17} color={MECH_COLORS.nucleophile} />

          <line x1="764" y1="140" x2="784" y2="140" stroke={MECH_COLORS.bond} strokeWidth="2" opacity="0.35" />
          <ChemLatexSvg tex="\ce{LG^-}" x={862} y={142} fontSize={17} color={MECH_COLORS.electrophileLeavingGroup} />

          <text x="780" y="238" fontSize="13" fill={MECH_COLORS.atom} textAnchor="middle" fontWeight="600">
            תוצרים - קונפיגורציה הפוכה
          </text>
        </g>
      </svg>
    </MechanismArtFrame>
  );
}
