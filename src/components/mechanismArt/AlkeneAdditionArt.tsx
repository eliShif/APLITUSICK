import { MechanismArtFrame, MECH_COLORS } from "./MechanismArtFrame";
import { ChemLatexSvg } from "@/components/ChemLatex";
import { WedgeBond, DashBond } from "./BondPrimitives";

/**
 * המנגנון המלא של סיפוח הלוגן (Br2) לאלקן - שני שלבים:
 * שלב 1: היווצרות יון הלוניום (ברומוניום) + Br⁻.
 * שלב 2: Br⁻ תוקף את הטבעת מהצד הנגדי (אנטי) - פותח אותה ונותן תוצר דו-ברומי וויצינלי.
 * טבעת הברומוניום מצוירת כמשולש (שלושה קשרים "אמיתיים", לא טריז/מקווקוו - זו טבעת
 * תלת-חברתית מאולצת אמיתית). תוצר שלב 2 משתמש בטריז/מקווקוו אמיתיים (WedgeBond/DashBond
 * מ-BondPrimitives, כמו ב-SN2) כדי להראות שה-Br-ים הסתיימו אנטי (טרנס) זה לזה - בדיוק
 * כמו ההיפוך ב-SN2, כי גם כאן זו התקפה אחורית על פחמן.
 */
export function AlkeneAdditionArt() {
  return (
    <MechanismArtFrame
      title="המנגנון המלא: סיפוח Br₂ לאלקן - יון הלוניום ואז פתיחה אנטי"
      note="שלב 1 (חץ כחול+ענבר): הקשר הפי תוקף Br אחד ויוצר קשר חדש; בו-זמנית קשר Br-Br נשבר והברום השני עוזב כאניון. שלב 2 (חץ סגול+ענבר): ה-Br⁻ שנוצר תוקף את הטבעת מהצד הנגדי לגשר (אנטי) - בדיוק כמו התקפה אחורית ב-SN2 - ופותח אותה לתוצר הסופי שבו שני אטומי הברום בצדדים מנוגדים (טרנס/אנטי)."
    >
      <svg viewBox="0 0 720 440" className="w-full h-auto" style={{ minWidth: 560 }}>
        <defs>
          <marker id="arrow-bromonium" viewBox="0 0 10 10" refX="8" refY="5" markerWidth="6" markerHeight="6" orient="auto-start-reverse">
            <path d="M0,0 L10,5 L0,10 z" fill={MECH_COLORS.arrow} />
          </marker>
        </defs>

        <text x="360" y="20" fontSize="13" fill={MECH_COLORS.atom} textAnchor="middle" fontWeight="700">
          שלב 1 - היווצרות יון הלוניום
        </text>

        {/* ===== פאנל 1: מגיבים - אלקן + Br2 ===== */}
        <g fontFamily="inherit">
          <line x1="74" y1="106" x2="126" y2="106" stroke={MECH_COLORS.bond} strokeWidth="2" />
          <line x1="74" y1="114" x2="126" y2="114" stroke={MECH_COLORS.bond} strokeWidth="2" />
          <circle cx="70" cy="110" r="4" fill={MECH_COLORS.atom} />
          <circle cx="130" cy="110" r="4" fill={MECH_COLORS.atom} />
          <text x="70" y="130" fontSize="15" fill={MECH_COLORS.atom} textAnchor="middle">C</text>
          <text x="130" y="130" fontSize="15" fill={MECH_COLORS.atom} textAnchor="middle">C</text>

          <line x1="234" y1="110" x2="268" y2="110" stroke={MECH_COLORS.bond} strokeWidth="2" />
          <ChemLatexSvg tex="\ce{Br}" x={220} y={110} fontSize={17} color={MECH_COLORS.electrophileLeavingGroup} />
          <ChemLatexSvg tex="\ce{Br}" x={282} y={110} fontSize={17} color={MECH_COLORS.electrophileLeavingGroup} />

          <path d="M100,100 Q160,48 214,96" fill="none" stroke={MECH_COLORS.arrow} strokeWidth="2.25" markerEnd="url(#arrow-bromonium)" />
          <path d="M249,104 Q264,74 284,94" fill="none" stroke={MECH_COLORS.arrow} strokeWidth="2.25" markerEnd="url(#arrow-bromonium)" />
        </g>

        <line x1="330" y1="110" x2="385" y2="110" stroke={MECH_COLORS.arrow} strokeWidth="2.5" markerEnd="url(#arrow-bromonium)" />

        {/* ===== פאנל 2: תוצר שלב 1 - יון ברומוניום + Br- (טבעת תלת-חברתית - שלושה קשרים אמיתיים) ===== */}
        <g fontFamily="inherit">
          <line x1="434" y1="140" x2="506" y2="140" stroke={MECH_COLORS.bond} strokeWidth="2" />
          <line x1="432" y1="136" x2="467" y2="80" stroke={MECH_COLORS.bond} strokeWidth="2" />
          <line x1="508" y1="136" x2="473" y2="80" stroke={MECH_COLORS.bond} strokeWidth="2" />

          <circle cx="430" cy="140" r="4" fill={MECH_COLORS.atom} />
          <circle cx="510" cy="140" r="4" fill={MECH_COLORS.atom} />
          <circle cx="470" cy="75" r="4" fill={MECH_COLORS.electrophileLeavingGroup} />

          <text x="430" y="160" fontSize="15" fill={MECH_COLORS.atom} textAnchor="middle">C</text>
          <text x="510" y="160" fontSize="15" fill={MECH_COLORS.atom} textAnchor="middle">C</text>
          <ChemLatexSvg tex="\ce{Br^+}" x={470} y={56} fontSize={17} color={MECH_COLORS.electrophileLeavingGroup} />

          <ChemLatexSvg tex="\ce{Br^-}" x={600} y={108} fontSize={17} color={MECH_COLORS.electrophileLeavingGroup} />
        </g>

        <line x1="20" y1="200" x2="700" y2="200" stroke={MECH_COLORS.bond} strokeWidth="1" strokeDasharray="4 4" />

        <text x="360" y="235" fontSize="13" fill={MECH_COLORS.atom} textAnchor="middle" fontWeight="700">
          שלב 2 - Br⁻ פותח את הטבעת מהצד הנגדי (אנטי) ⇽ תוצר סופי
        </text>

        {/* ===== פאנל 3: מגיבים לשלב 2 - יון ברומוניום + Br- מהצד הנגדי ===== */}
        <g fontFamily="inherit">
          <line x1="94" y1="310" x2="166" y2="310" stroke={MECH_COLORS.bond} strokeWidth="2" />
          <line x1="92" y1="306" x2="127" y2="255" stroke={MECH_COLORS.bond} strokeWidth="2" />
          <line x1="168" y1="306" x2="133" y2="255" stroke={MECH_COLORS.bond} strokeWidth="2" />
          <circle cx="90" cy="310" r="4" fill={MECH_COLORS.atom} />
          <circle cx="170" cy="310" r="4" fill={MECH_COLORS.atom} />
          <circle cx="130" cy="250" r="4" fill={MECH_COLORS.electrophileLeavingGroup} />
          <text x="90" y="330" fontSize="15" fill={MECH_COLORS.atom} textAnchor="middle">C</text>
          <text x="170" y="330" fontSize="15" fill={MECH_COLORS.atom} textAnchor="middle">C</text>
          <ChemLatexSvg tex="\ce{Br^+}" x={130} y={228} fontSize={15} color={MECH_COLORS.electrophileLeavingGroup} />

          {/* Br- מתקרב מלמטה - מהצד הנגדי לגשר, בדיוק כמו התקפה אחורית ב-SN2 */}
          <ChemLatexSvg tex="\ce{Br^-}" x={90} y={396} fontSize={17} color="#7c3aed" />
          <circle cx="90" cy="382" r="2.5" fill="#7c3aed" />
          <path d="M90,378 Q95,345 90,318" fill="none" stroke="#7c3aed" strokeWidth="2.25" markerEnd="url(#arrow-bromonium)" />
          {/* קשר C-Br(גשר) נשבר - האלקטרונים חוזרים לברום העליון */}
          <path d="M130,255 Q160,270 172,306" fill="none" stroke={MECH_COLORS.arrow} strokeWidth="2.25" markerEnd="url(#arrow-bromonium)" />
        </g>

        <line x1="230" y1="310" x2="285" y2="310" stroke={MECH_COLORS.arrow} strokeWidth="2.5" markerEnd="url(#arrow-bromonium)" />

        {/* ===== פאנל 4: תוצר סופי - דו-ברומי וויצינלי, אנטי (טרנס) - טריז/מקווקוו אמיתיים ===== */}
        <g fontFamily="inherit">
          <line x1="360" y1="330" x2="420" y2="330" stroke={MECH_COLORS.bond} strokeWidth="2" />
          <circle cx="360" cy="330" r="3.5" fill={MECH_COLORS.atom} />
          <circle cx="420" cy="330" r="3.5" fill={MECH_COLORS.atom} />
          <text x="360" y="350" fontSize="14" fill={MECH_COLORS.atom} textAnchor="middle">C</text>
          <text x="420" y="350" fontSize="14" fill={MECH_COLORS.atom} textAnchor="middle">C</text>

          {/* טריז מלא (יוצא לצופה) לכיוון Br אחד - ומקווקוו אמיתי (נכנס לדף) לכיוון השני - מסמן אנטי, בדיוק כמו ב-SN2 */}
          <WedgeBond x1={360} y1={330} x2={322} y2={294} color={MECH_COLORS.electrophileLeavingGroup} />
          <ChemLatexSvg tex="\ce{Br}" x={300} y={282} fontSize={16} color={MECH_COLORS.electrophileLeavingGroup} />

          <DashBond x1={420} y1={330} x2={460} y2={368} color={MECH_COLORS.electrophileLeavingGroup} />
          <ChemLatexSvg tex="\ce{Br}" x={474} y={380} fontSize={16} color={MECH_COLORS.electrophileLeavingGroup} />

          <text x="390" y="405" fontSize="12" fill={MECH_COLORS.atom} textAnchor="middle">
            תוצר סופי: דו-ברומי וויצינלי, אנטי (טרנס)
          </text>
        </g>
      </svg>
    </MechanismArtFrame>
  );
}
