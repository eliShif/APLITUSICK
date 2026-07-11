import { MechanismArtFrame, MECH_COLORS } from "./MechanismArtFrame";
import { ChemLatexSvg } from "@/components/ChemLatex";
import { BracketPair } from "./BondPrimitives";

/**
 * מנגנון E2 - שלושה פאנלים, באותו סגנון ייחוס כמו NucleophilicSubstitutionArt (SN2):
 * מגיבים ← מצב מעבר בסוגריים ← תוצרים.
 *
 * פאנל 1 (מגיבים) מצויר כהטלת ניומן (Newman projection) על ציר הקשר Cβ-Cα, ולא
 * כשלד זיג-זג עם טריז/מקווקוו (WedgeBond/DashBond): זו הבחירה הכימית הנכונה כאן, כי
 * כל הפואנטה הפדגוגית של E2 היא הזווית הדיהדרלית של 180° בין Hβ ל-LG (אנטי-פריפלנרי).
 * בהטלת ניומן זו עובדה גיאומטרית *חד-משמעית*: Hβ מצויר למעלה על האטום הקדמי (Cβ, נקודה
 * במרכז) ו-LG מצויר למטה על האטום האחורי (Cα, המעגל), שני הקשרים על אותו קו אנכי דרך
 * המרכז - בדיוק 180° זה מזה. לעומת זאת בשלד זיג-זג רגיל, הקשר בין "טריז+מקווקוו" לבין
 * יחס אנטי/סינ תלוי בכיוון הפנייה של השלד ועלול להטעות. הסוגריים של מצב המעבר (פאנל 2)
 * ממשיכים להשתמש ב-BracketPair המשותף, וקשרים חלקיים שם הם קווים מקווקווים פשוטים
 * (לא WedgeBond/DashBond) - כי במצב המעבר האטומים כמעט שטוחים, לא תלת-ממדיים מובהקים.
 */
export function EliminationArt() {
  return (
    <MechanismArtFrame
      title="מנגנון E2 - אלימינציה חד-שלבית (Anti-periplanar)"
      note="שלושת החצים קורים בו-זמנית, במצב מעבר יחיד: הבסיס (כחול) תוקף ומסיר את Hβ; זוג האלקטרונים של הקשר Cβ-Hβ 'נודד' ויוצר קשר π חדש בין Cβ ל-Cα; ובאותו רגע ממש זוג האלקטרונים של הקשר Cα-LG עוזב אל הקבוצה הפורשת (ענבר). מכיוון שהכל קורה יחד באותו מצב מעבר, נדרשת חפיפת מסלולים מיטבית - ולכן Hβ ו-LG חייבים להיות אנטי-פריפלנריים (זווית דיהדרלית 180°), כפי שרואים בהטלת הניומן: הקשר ל-Hβ (חזית) והקשר ל-LG (עורף) יושבים על אותו קו, בדיוק מנוגדים זה לזה. תוצר הביניים השטוח - האלקן - מסמן שהפחמנים הפכו מטטרהדריים ל-sp2 מישוריים."
    >
      <svg viewBox="0 0 1060 280" className="w-full h-auto" style={{ minWidth: 900 }}>
        <defs>
          <marker id="arrow-e2" viewBox="0 0 10 10" refX="8" refY="5" markerWidth="6" markerHeight="6" orient="auto-start-reverse">
            <path d="M0,0 L10,5 L0,10 z" fill={MECH_COLORS.arrow} />
          </marker>
        </defs>

        {/* ===== פאנל 1: מגיבים - הטלת ניומן על ציר Cβ-Cα (Hβ קדמי-למעלה, LG אחורי-למטה = אנטי) ===== */}
        <g fontFamily="inherit">
          {/* Cα - האטום האחורי, מצויר כמעגל גדול (מוסתר מאחורי Cβ) */}
          <circle cx="150" cy="150" r="30" fill="none" stroke={MECH_COLORS.bond} strokeWidth="2" />
          <text x="186" y="116" fontSize="14" fill={MECH_COLORS.atom} textAnchor="middle">Cα</text>

          {/* קשרים אחוריים (מקצה המעגל כלפי חוץ), משוקעים ב-60° מהקשרים הקדמיים - קונפורמציה נחתכת */}
          <line x1="176" y1="135" x2="198.5" y2="122" stroke={MECH_COLORS.bond} strokeWidth="2" />
          <text x="216" y="112" fontSize="13" fill={MECH_COLORS.atom} textAnchor="middle">H</text>

          <line x1="150" y1="180" x2="150" y2="206" stroke={MECH_COLORS.electrophileLeavingGroup} strokeWidth="2" />
          <ChemLatexSvg tex="\ce{LG}" x={150} y={224} fontSize={16} color={MECH_COLORS.electrophileLeavingGroup} />

          <line x1="124" y1="135" x2="101.5" y2="122" stroke={MECH_COLORS.bond} strokeWidth="2" />
          <text x="84" y="112" fontSize="13" fill={MECH_COLORS.atom} textAnchor="middle">H</text>

          {/* Cβ - האטום הקדמי, נקודה במרכז ההטלה */}
          <line x1="150" y1="150" x2="150" y2="104" stroke={MECH_COLORS.bond} strokeWidth="2" />
          <text x="150" y="92" fontSize="14" fill={MECH_COLORS.atom} textAnchor="middle">Hβ</text>

          <line x1="150" y1="150" x2="189.8" y2="173" stroke={MECH_COLORS.bond} strokeWidth="2" />
          <text x="207" y="188" fontSize="13" fill={MECH_COLORS.atom} textAnchor="middle">H</text>

          <line x1="150" y1="150" x2="110.2" y2="173" stroke={MECH_COLORS.bond} strokeWidth="2" />
          <text x="93" y="188" fontSize="13" fill={MECH_COLORS.atom} textAnchor="middle">H</text>

          <circle cx="150" cy="150" r="4" fill={MECH_COLORS.atom} />
          <text x="126" y="146" fontSize="12" fill={MECH_COLORS.atom} textAnchor="middle">Cβ</text>

          {/* Hβ (למעלה, קדמי) ו-LG (למטה, אחורי) על אותו קו אנכי דרך המרכז - 180°, אנטי-פריפלנרי */}
          <text x="168" y="146" fontSize="10" fill={MECH_COLORS.atom} textAnchor="middle" opacity="0.75" fontStyle="italic">180°</text>

          {/* הבסיס וזוג האלקטרונים שלו */}
          <ChemLatexSvg tex="\ce{Base^-}" x={55} y={42} fontSize={16} color={MECH_COLORS.nucleophile} />
          <circle cx="78" cy="58" r="2" fill={MECH_COLORS.nucleophile} />
          <circle cx="84" cy="58" r="2" fill={MECH_COLORS.nucleophile} />

          {/* חץ 1: זוג בודד של הבסיס תוקף את Hβ */}
          <path d="M82,61 Q112,58 138,92" fill="none" stroke={MECH_COLORS.arrow} strokeWidth="2.25" markerEnd="url(#arrow-e2)" />
          {/* חץ 2: זוג האלקטרונים מהקשר Cβ-Hβ נודד ליצירת קשר π בין Cβ ל-Cα (המעגל האחורי) */}
          <path d="M150,122 Q176,116 174,140" fill="none" stroke={MECH_COLORS.arrow} strokeWidth="2.25" markerEnd="url(#arrow-e2)" />
          {/* חץ 3: זוג האלקטרונים מהקשר Cα-LG עוזב אל הקבוצה הפורשת */}
          <path d="M152,183 Q170,193 178,202" fill="none" stroke={MECH_COLORS.arrow} strokeWidth="2.25" markerEnd="url(#arrow-e2)" />

          <text x="150" y="258" fontSize="13" fill={MECH_COLORS.atom} textAnchor="middle" fontWeight="600">
            מגיבים - הטלת ניומן (Hβ אנטי ל-LG)
          </text>
        </g>

        {/* ===== חץ תגובה 1 ===== */}
        <line x1="270" y1="150" x2="336" y2="150" stroke={MECH_COLORS.arrow} strokeWidth="2.5" markerEnd="url(#arrow-e2)" />

        {/* ===== פאנל 2: מצב מעבר - קשרים חלקיים (קווים מקווקווים, לא טריז/מקווקוו), δ-, π נוצר ===== */}
        <g fontFamily="inherit">
          <BracketPair xLeft={350} xRight={665} yTop={20} yBottom={212} />
          <ChemLatexSvg tex="\ddagger" x={680} y={26} fontSize={16} color={MECH_COLORS.atom} anchor="start" />

          {/* Base...Hβ - קשר חלקי נוצר */}
          <line x1="440" y1="88" x2="440" y2="58" stroke={MECH_COLORS.nucleophile} strokeWidth="2" strokeDasharray="3 3" />
          <ChemLatexSvg tex="\ce{Base^-}" x={440} y={42} fontSize={15} color={MECH_COLORS.nucleophile} />
          <ChemLatexSvg tex="\delta^-" x={404} y={70} fontSize={12} color={MECH_COLORS.nucleophile} />

          {/* Hβ-Cβ (עדיין קיים ברובו, על סף היחלשות) */}
          <line x1="440" y1="150" x2="440" y2="108" stroke={MECH_COLORS.bond} strokeWidth="2" />
          <text x="440" y="98" fontSize="13" fill={MECH_COLORS.atom} textAnchor="middle">Hβ</text>

          <circle cx="440" cy="150" r="3.5" fill={MECH_COLORS.atom} />
          <line x1="440" y1="150" x2="410" y2="182" stroke={MECH_COLORS.bond} strokeWidth="2" />
          <text x="396" y="196" fontSize="13" fill={MECH_COLORS.atom} textAnchor="middle">H</text>

          {/* Cβ-Cα - קשר σ קיים + קשר π מתהווה (קו מקווקוו מקביל) */}
          <line x1="446" y1="150" x2="534" y2="150" stroke={MECH_COLORS.bond} strokeWidth="2" />
          <line x1="446" y1="141" x2="534" y2="141" stroke={MECH_COLORS.atom} strokeWidth="1.5" strokeDasharray="4 3" opacity="0.8" />
          <text x="490" y="130" fontSize="12" fill={MECH_COLORS.atom} textAnchor="middle" fontStyle="italic">π נוצר</text>

          <circle cx="540" cy="150" r="3.5" fill={MECH_COLORS.atom} />
          <line x1="540" y1="150" x2="570" y2="182" stroke={MECH_COLORS.bond} strokeWidth="2" />
          <text x="584" y="196" fontSize="13" fill={MECH_COLORS.atom} textAnchor="middle">H</text>

          {/* Cα...LG - קשר חלקי נשבר */}
          <line x1="546" y1="150" x2="596" y2="150" stroke={MECH_COLORS.electrophileLeavingGroup} strokeWidth="2" strokeDasharray="3 3" />
          <ChemLatexSvg tex="\delta^-" x={602} y={124} fontSize={12} color={MECH_COLORS.electrophileLeavingGroup} />
          <ChemLatexSvg tex="\ce{LG}" x={630} y={150} fontSize={16} color={MECH_COLORS.electrophileLeavingGroup} />

          <text x="505" y="240" fontSize="13" fill={MECH_COLORS.atom} textAnchor="middle" fontWeight="600">
            מצב מעבר - שלושת התהליכים בו-זמנית
          </text>
        </g>

        {/* ===== חץ תגובה 2 ===== */}
        <line x1="700" y1="150" x2="768" y2="150" stroke={MECH_COLORS.arrow} strokeWidth="2.5" markerEnd="url(#arrow-e2)" />

        {/* ===== פאנל 3: תוצרים - אלקן מישורי (sp2) + Base-H + LG חופשי ===== */}
        <g fontFamily="inherit">
          <ChemLatexSvg tex="\ce{Base-H}" x={800} y={52} fontSize={16} color={MECH_COLORS.nucleophile} />

          <circle cx="840" cy="150" r="3.5" fill={MECH_COLORS.atom} />
          <text x="825" y="146" fontSize="12" fill={MECH_COLORS.atom} textAnchor="end">Cβ</text>

          {/* קשר כפול Cβ=Cα - שני קווים מקבילים, שטוח לגמרי (אין עוד טריז/מקווקוו) */}
          <line x1="846" y1="145" x2="924" y2="145" stroke={MECH_COLORS.bond} strokeWidth="2" />
          <line x1="846" y1="155" x2="924" y2="155" stroke={MECH_COLORS.bond} strokeWidth="2" />

          <circle cx="930" cy="150" r="3.5" fill={MECH_COLORS.atom} />
          <text x="958" y="146" fontSize="12" fill={MECH_COLORS.atom} textAnchor="start">Cα</text>

          <line x1="840" y1="150" x2="816" y2="108" stroke={MECH_COLORS.bond} strokeWidth="2" />
          <text x="802" y="98" fontSize="13" fill={MECH_COLORS.atom} textAnchor="middle">H</text>
          <line x1="840" y1="150" x2="816" y2="192" stroke={MECH_COLORS.bond} strokeWidth="2" />
          <text x="802" y="204" fontSize="13" fill={MECH_COLORS.atom} textAnchor="middle">H</text>

          <line x1="930" y1="150" x2="954" y2="108" stroke={MECH_COLORS.bond} strokeWidth="2" />
          <text x="968" y="98" fontSize="13" fill={MECH_COLORS.atom} textAnchor="middle">H</text>
          <line x1="930" y1="150" x2="954" y2="192" stroke={MECH_COLORS.bond} strokeWidth="2" />
          <text x="968" y="204" fontSize="13" fill={MECH_COLORS.atom} textAnchor="middle">H</text>

          <ChemLatexSvg tex="\ce{LG^-}" x={1000} y={150} fontSize={17} color={MECH_COLORS.electrophileLeavingGroup} />

          <text x="890" y="250" fontSize="13" fill={MECH_COLORS.atom} textAnchor="middle" fontWeight="600">
            תוצרים - אלקן מישורי + Base–H + LG⁻
          </text>
        </g>
      </svg>
    </MechanismArtFrame>
  );
}
