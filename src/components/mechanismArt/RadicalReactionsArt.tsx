import { MechanismArtFrame, MECH_COLORS } from "./MechanismArtFrame";
import { ChemLatexSvg } from "@/components/ChemLatex";

/**
 * המנגנון המלא של שרשרת רדיקלית - שלושת סוגי השלבים ברצף אחד: אתחול, שני שלבי
 * ההתפשטות (שיחד מהווים את מחזור השרשרת החוזר), וסיום. כל שלב מצויר עם חצי
 * fishhook אמיתיים (ראש-חצי, אלקטרון בודד) - לא רק תיאור טקסטואלי.
 *
 * שני סוגי חצים שונים לגמרי, בכוונה: `arrow-radical` (ראש-חצי, fishhook) לתנועת
 * אלקטרון בודד אחד בלבד, מול `arrow-radical-straight` (ראש חץ מלא, כפול) לחצי
 * התקדמות-תגובה בין הפאנלים. אין תלת-ממד/טריז-מקווקוו כאן - אין מרכז סטריאוגני
 * במנגנון רדיקלי, אז אין שימוש ב-WedgeBond/DashBond מ-BondPrimitives.
 */
export function RadicalReactionsArt() {
  return (
    <MechanismArtFrame
      title="המנגנון המלא: הלוגנציה רדיקלית - אתחול, שני שלבי התפשטות וסיום"
      note="החץ בעל ראש-חצי בלבד (fishhook) מסמן תנועה של אלקטרון בודד אחד - לא זוג! - בניגוד לחץ הכפול (ראש חץ מלא) של מנגנוני יונים כמו SN2. שני שלבי ההתפשטות (2+3) חוזרים על עצמם שוב ושוב במחזור השרשרת - רדיקל ה-X שנוצר בשלב 3 חוזר להתחיל שלב 2 מחדש על מולקולת R-H נוספת."
    >
      <svg viewBox="0 0 720 630" className="w-full h-auto" style={{ minWidth: 520 }}>
        <defs>
          {/* fishhook - ראש-חצי בלבד, לתנועת אלקטרון בודד אחד */}
          <marker id="arrow-radical" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="7" markerHeight="7" orient="auto-start-reverse">
            <path d="M0,5 L10,5 L0,0 z" fill={MECH_COLORS.arrow} />
          </marker>
          {/* חץ רגיל, ראש כפול מלא - רק להתקדמות תגובה בין פאנלים (לא לתנועת אלקטרונים) */}
          <marker id="arrow-radical-straight" viewBox="0 0 10 10" refX="8" refY="5" markerWidth="6" markerHeight="6" orient="auto-start-reverse">
            <path d="M0,0 L10,5 L0,10 z" fill={MECH_COLORS.arrow} />
          </marker>
        </defs>

        {/* ===== שלב 1: אתחול - שבירה הומוליטית של X-X ===== */}
        <g>
          <text x="360" y="24" fontSize="13" fill={MECH_COLORS.atom} textAnchor="middle" fontWeight="700">
            שלב 1 · אתחול (Initiation)
          </text>

          <text x="132" y="78" fontSize="18" fontWeight="700" fill={MECH_COLORS.electrophileLeavingGroup} textAnchor="middle">X</text>
          <line x1="148" y1="72" x2="192" y2="72" stroke={MECH_COLORS.bond} strokeWidth="2" />
          <text x="208" y="78" fontSize="18" fontWeight="700" fill={MECH_COLORS.electrophileLeavingGroup} textAnchor="middle">X</text>
          <circle cx="163" cy="72" r="2.5" fill={MECH_COLORS.charge} />
          <circle cx="177" cy="72" r="2.5" fill={MECH_COLORS.charge} />

          <path d="M163,72 Q148,46 132,58" fill="none" stroke={MECH_COLORS.arrow} strokeWidth="2" markerEnd="url(#arrow-radical)" />
          <path d="M177,72 Q192,46 208,58" fill="none" stroke={MECH_COLORS.arrow} strokeWidth="2" markerEnd="url(#arrow-radical)" />

          <ChemLatexSvg tex="h\nu" x={155} y={108} fontSize={14} color={MECH_COLORS.atom} anchor="end" width={46} />
          <text x="163" y="113" fontSize="12" fill={MECH_COLORS.atom} textAnchor="start">
            {" "}/ חום
          </text>

          <line x1="270" y1="72" x2="330" y2="72" stroke={MECH_COLORS.arrow} strokeWidth="2.5" markerEnd="url(#arrow-radical-straight)" />

          <text x="405" y="78" fontSize="18" fontWeight="700" fill={MECH_COLORS.electrophileLeavingGroup} textAnchor="middle">X</text>
          <circle cx="413" cy="60" r="2.5" fill={MECH_COLORS.charge} />
          <text x="460" y="78" fontSize="15" fill={MECH_COLORS.atom} textAnchor="middle">+</text>
          <text x="515" y="78" fontSize="18" fontWeight="700" fill={MECH_COLORS.electrophileLeavingGroup} textAnchor="middle">X</text>
          <circle cx="507" cy="60" r="2.5" fill={MECH_COLORS.charge} />

          <ChemLatexSvg tex="\ce{X2}" x={356} y={135} fontSize={14} color={MECH_COLORS.electrophileLeavingGroup} anchor="end" width={44} />
          <text x="362" y="140" fontSize="12.5" fill={MECH_COLORS.atom} textAnchor="start">
            נשבר הומוליטית ⇽ שני רדיקלי הלוגן הראשונים
          </text>
        </g>

        <line x1="20" y1="163" x2="700" y2="163" stroke={MECH_COLORS.bond} strokeWidth="1" strokeDasharray="4 4" opacity="0.5" />

        {/* ===== שלב 2: התפשטות א' - הסטת מימן ===== */}
        <g>
          <text x="360" y="197" fontSize="13" fill={MECH_COLORS.atom} textAnchor="middle" fontWeight="700">
            שלב 2 · התפשטות א&apos; (Propagation)
          </text>

          <text x="68" y="248" fontSize="18" fontWeight="700" fill={MECH_COLORS.atom} textAnchor="middle">R</text>
          <line x1="88" y1="242" x2="172" y2="242" stroke={MECH_COLORS.bond} strokeWidth="2" />
          <text x="192" y="248" fontSize="18" fontWeight="700" fill={MECH_COLORS.atom} textAnchor="middle">H</text>
          <circle cx="162" cy="234" r="2.5" fill={MECH_COLORS.charge} />
          <text x="264" y="248" fontSize="18" fontWeight="700" fill={MECH_COLORS.electrophileLeavingGroup} textAnchor="middle">X</text>
          <circle cx="252" cy="227" r="2.5" fill={MECH_COLORS.charge} />

          <path d="M162,234 Q202,193 248,225" fill="none" stroke={MECH_COLORS.arrow} strokeWidth="2.25" markerEnd="url(#arrow-radical)" />

          <ChemLatexSvg tex="\ce{R-H}" x={95} y={278} fontSize={13} color={MECH_COLORS.atom} anchor="middle" width={62} />
          <text x="152" y="283" fontSize="12" fill={MECH_COLORS.atom} textAnchor="middle">+</text>
          <circle cx="176" cy="277" r="2.5" fill={MECH_COLORS.charge} />
          <text x="188" y="283" fontSize="13" fontWeight="700" fill={MECH_COLORS.electrophileLeavingGroup} textAnchor="middle">X</text>

          <line x1="330" y1="242" x2="400" y2="242" stroke={MECH_COLORS.arrow} strokeWidth="2.5" markerEnd="url(#arrow-radical-straight)" />

          <text x="458" y="248" fontSize="18" fontWeight="700" fill={MECH_COLORS.atom} textAnchor="middle">R</text>
          <circle cx="476" cy="230" r="2.5" fill={MECH_COLORS.charge} />
          <text x="540" y="248" fontSize="18" fontWeight="700" fill={MECH_COLORS.atom} textAnchor="middle">H</text>
          <line x1="555" y1="242" x2="615" y2="242" stroke={MECH_COLORS.bond} strokeWidth="2" />
          <text x="630" y="248" fontSize="18" fontWeight="700" fill={MECH_COLORS.electrophileLeavingGroup} textAnchor="middle">X</text>

          <circle cx="476" cy="277" r="2.5" fill={MECH_COLORS.charge} />
          <text x="488" y="283" fontSize="13" fontWeight="700" fill={MECH_COLORS.atom} textAnchor="middle">R</text>
          <text x="510" y="283" fontSize="12" fill={MECH_COLORS.atom} textAnchor="middle">+</text>
          <ChemLatexSvg tex="\ce{H-X}" x={568} y={278} fontSize={13} color={MECH_COLORS.atom} anchor="middle" width={62} />
        </g>

        <line x1="20" y1="304" x2="700" y2="304" stroke={MECH_COLORS.bond} strokeWidth="1" strokeDasharray="4 4" opacity="0.5" />

        {/* ===== שלב 3: התפשטות ב' - תקיפת X-X ===== */}
        <g>
          <text x="360" y="338" fontSize="13" fill={MECH_COLORS.atom} textAnchor="middle" fontWeight="700">
            שלב 3 · התפשטות ב&apos; (Propagation)
          </text>

          <text x="68" y="388" fontSize="18" fontWeight="700" fill={MECH_COLORS.atom} textAnchor="middle">R</text>
          <circle cx="86" cy="370" r="2.5" fill={MECH_COLORS.charge} />
          <text x="182" y="388" fontSize="18" fontWeight="700" fill={MECH_COLORS.electrophileLeavingGroup} textAnchor="middle">X</text>
          <line x1="198" y1="382" x2="238" y2="382" stroke={MECH_COLORS.bond} strokeWidth="2" />
          <text x="254" y="388" fontSize="18" fontWeight="700" fill={MECH_COLORS.electrophileLeavingGroup} textAnchor="middle">X</text>
          <circle cx="212" cy="382" r="2.5" fill={MECH_COLORS.charge} />

          <path d="M86,370 Q136,346 174,376" fill="none" stroke={MECH_COLORS.arrow} strokeWidth="2.25" markerEnd="url(#arrow-radical)" />
          <path d="M212,382 Q226,356 250,368" fill="none" stroke={MECH_COLORS.arrow} strokeWidth="2.25" markerEnd="url(#arrow-radical)" />

          <circle cx="72" cy="418" r="2.5" fill={MECH_COLORS.charge} />
          <text x="84" y="424" fontSize="13" fontWeight="700" fill={MECH_COLORS.atom} textAnchor="middle">R</text>
          <text x="106" y="424" fontSize="12" fill={MECH_COLORS.atom} textAnchor="middle">+</text>
          <ChemLatexSvg tex="\ce{X2}" x={146} y={419} fontSize={13} color={MECH_COLORS.electrophileLeavingGroup} anchor="middle" width={44} />

          <line x1="330" y1="382" x2="400" y2="382" stroke={MECH_COLORS.arrow} strokeWidth="2.5" markerEnd="url(#arrow-radical-straight)" />

          <text x="458" y="388" fontSize="18" fontWeight="700" fill={MECH_COLORS.atom} textAnchor="middle">R</text>
          <line x1="473" y1="382" x2="513" y2="382" stroke={MECH_COLORS.bond} strokeWidth="2" />
          <text x="528" y="388" fontSize="18" fontWeight="700" fill={MECH_COLORS.electrophileLeavingGroup} textAnchor="middle">X</text>
          <text x="606" y="388" fontSize="18" fontWeight="700" fill={MECH_COLORS.electrophileLeavingGroup} textAnchor="middle">X</text>
          <circle cx="598" cy="370" r="2.5" fill={MECH_COLORS.charge} />

          <ChemLatexSvg tex="\ce{R-X}" x={500} y={419} fontSize={13} color={MECH_COLORS.atom} anchor="middle" width={58} />
          <text x="556" y="424" fontSize="12" fill={MECH_COLORS.atom} textAnchor="middle">+</text>
          <circle cx="574" cy="418" r="2.5" fill={MECH_COLORS.charge} />
          <text x="586" y="424" fontSize="13" fontWeight="700" fill={MECH_COLORS.electrophileLeavingGroup} textAnchor="middle">X</text>
          <text x="606" y="424" fontSize="11" fill="#9ca3af" textAnchor="start">(חוזר לשלב 2)</text>
        </g>

        <line x1="20" y1="448" x2="700" y2="448" stroke={MECH_COLORS.bond} strokeWidth="1" strokeDasharray="4 4" opacity="0.5" />

        {/* ===== שלב 4: סיום ===== */}
        <g>
          <text x="360" y="482" fontSize="13" fill={MECH_COLORS.atom} textAnchor="middle" fontWeight="700">
            שלב 4 · סיום (Termination)
          </text>

          <text x="138" y="530" fontSize="18" fontWeight="700" fill={MECH_COLORS.atom} textAnchor="middle">R</text>
          <circle cx="156" cy="512" r="2.5" fill={MECH_COLORS.charge} />
          <text x="228" y="530" fontSize="15" fill={MECH_COLORS.atom} textAnchor="middle">+</text>
          <text x="298" y="530" fontSize="18" fontWeight="700" fill={MECH_COLORS.atom} textAnchor="middle">R</text>
          <circle cx="280" cy="512" r="2.5" fill={MECH_COLORS.charge} />

          <path d="M156,512 Q217,486 280,512" fill="none" stroke={MECH_COLORS.arrow} strokeWidth="2.25" markerEnd="url(#arrow-radical)" />

          <line x1="360" y1="525" x2="420" y2="525" stroke={MECH_COLORS.arrow} strokeWidth="2.5" markerEnd="url(#arrow-radical-straight)" />

          <text x="478" y="530" fontSize="18" fontWeight="700" fill={MECH_COLORS.atom} textAnchor="middle">R</text>
          <line x1="493" y1="525" x2="543" y2="525" stroke={MECH_COLORS.bond} strokeWidth="2" />
          <text x="558" y="530" fontSize="18" fontWeight="700" fill={MECH_COLORS.atom} textAnchor="middle">R</text>

          <ChemLatexSvg tex="\ce{R-R}" x={518} y={562} fontSize={13} color={MECH_COLORS.atom} anchor="middle" width={58} />
          <text x="518" y="586" fontSize="12" fill={MECH_COLORS.atom} textAnchor="middle">קשר קוולנטי יציב - השרשרת נעצרת</text>
          <text x="518" y="606" fontSize="11" fill="#9ca3af" textAnchor="middle">(באותו אופן: גם X+X או R+X עשויים להתלכד)</text>
        </g>
      </svg>
    </MechanismArtFrame>
  );
}
