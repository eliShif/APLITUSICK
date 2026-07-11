import { MechanismArtFrame, MECH_COLORS } from "./MechanismArtFrame";
import { ChemLatexSvg } from "@/components/ChemLatex";
import { WedgeBond, DashBond, BracketPair } from "./BondPrimitives";

/**
 * המנגנון המלא של דהידרציה חומצית (E1) של אלכוהול - בסגנון הייחוס של SN2
 * (NucleophilicSubstitutionArt): טריז/מקווקוו תלת-ממדי אמיתי במרכז הכיראלי בפועל (Cα, לפני
 * היציאה), סוגריים למצב מעבר בשלב הפרוטונציה, וקרבוקטיון שטוח (Y, ללא טריז/מקווקוו - זה נכון
 * כימית, sp2 אמיתי) בשלבים 2-3. שלושה שלבים בשלוש שורות:
 * 1) פרוטונציה של ה-OH (זוג בודד על החמצן תוקף H⁺) ⇽ אוקסוניום R-OH2⁺ (הופך לקבוצה עוזבת טובה).
 * 2) קשר Cα-O נשבר, המים עוזבים ⇽ קרבוקטיון Cα⁺ שטוח (sp2).
 * 3) בסיס חלש מסיר מימן על הפחמן השכן (Cβ, בטא) ⇽ זוג האלקטרונים יוצר קשר π חדש ⇽ אלקן.
 */
export function AlcoholsThiolsArt() {
  return (
    <MechanismArtFrame
      title="המנגנון המלא: דהידרציה חומצית (E1) - פרוטונציה, קרבוקטיון ואלקן"
      note="שלב 1: זוג בודד על החמצן תוקף H⁺ ⇽ אוקסוניום. שלב 2: קשר C-O נשבר, המים (קבוצה עוזבת מצוינת עכשיו) עוזבים ⇽ קרבוקטיון שטוח. שלב 3: בסיס חלש (כמו מולקולת מים נוספת) מסיר מימן על הפחמן השכן (בטא), זוג האלקטרונים של אותו קשר C-H יוצר קשר פי חדש - מתקבל האלקן."
    >
      <svg viewBox="0 0 940 820" className="w-full h-auto" style={{ minWidth: 720 }}>
        <defs>
          <marker id="arrow-e1" viewBox="0 0 10 10" refX="8" refY="5" markerWidth="6" markerHeight="6" orient="auto-start-reverse">
            <path d="M0,0 L10,5 L0,10 z" fill={MECH_COLORS.arrow} />
          </marker>
        </defs>

        {/* ============================================================ */}
        {/* שלב 1 - פרוטונציה: מגיבים (Cα טטרהדרי אמיתי) -> TS בסוגריים -> אוקסוניום (עדיין טטרהדרי) */}
        {/* ============================================================ */}
        <text x="470" y="20" fontSize="13" fill={MECH_COLORS.atom} textAnchor="middle" fontWeight="700">
          שלב 1 - פרוטונציה
        </text>

        {/* ===== פאנל 1.1: מגיבים - R-OH טטרהדרי (Cα אמיתי, טריז/מקווקוו) + H+ ===== */}
        <g>
          <line x1="140" y1="150" x2="140" y2="105" stroke={MECH_COLORS.bond} strokeWidth="2" />
          <text x="140" y="93" fontSize="14" fill={MECH_COLORS.atom} textAnchor="middle">Cβ</text>

          <WedgeBond x1={140} y1={150} x2={102} y2={188} />
          <text x="88" y="202" fontSize="14" fill={MECH_COLORS.atom} textAnchor="middle">H</text>

          <DashBond x1={140} y1={150} x2={178} y2={188} />
          <text x="194" y="202" fontSize="14" fill={MECH_COLORS.atom} textAnchor="middle">H</text>

          <circle cx="140" cy="150" r="3.5" fill={MECH_COLORS.atom} />
          <text x="140" y="163" fontSize="11" fill={MECH_COLORS.atom} textAnchor="middle">Cα</text>

          <line x1="144" y1="150" x2="190" y2="150" stroke={MECH_COLORS.bond} strokeWidth="2" />
          <circle cx="194" cy="150" r="4" fill={MECH_COLORS.atom} />
          <text x="194" y="163" fontSize="12" fill={MECH_COLORS.atom} textAnchor="middle">O</text>
          <line x1="194" y1="146" x2="194" y2="110" stroke={MECH_COLORS.bond} strokeWidth="2" />
          <text x="194" y="98" fontSize="14" fill={MECH_COLORS.atom} textAnchor="middle">H</text>

          {/* זוג בודד תוקף (כחול - נוקלאופילי כאן) */}
          <circle cx="212" cy="132" r="2" fill={MECH_COLORS.nucleophile} />
          <circle cx="219" cy="137" r="2" fill={MECH_COLORS.nucleophile} />

          <ChemLatexSvg tex="\ce{H^+}" x={280} y={148} fontSize={16} color={MECH_COLORS.electrophileLeavingGroup} width={44} height={26} />

          <path d="M215,133 Q248,110 272,140" fill="none" stroke={MECH_COLORS.arrow} strokeWidth="2.25" markerEnd="url(#arrow-e1)" />

          <text x="150" y="245" fontSize="13" fill={MECH_COLORS.atom} textAnchor="middle" fontWeight="600">
            מגיבים: אלכוהול + H⁺
          </text>
        </g>

        <line x1="345" y1="150" x2="400" y2="150" stroke={MECH_COLORS.arrow} strokeWidth="2.5" markerEnd="url(#arrow-e1)" />

        {/* ===== פאנל 1.2: מצב מעבר - פרוטונציה של החמצן (בתוך סוגריים) ===== */}
        <g>
          <BracketPair xLeft={415} xRight={650} yTop={85} yBottom={215} />
          <ChemLatexSvg tex="\ddagger" x={664} y={92} fontSize={16} color={MECH_COLORS.atom} anchor="start" />

          <text x="452" y="155" fontSize="15" fontWeight="700" fill={MECH_COLORS.atom} textAnchor="middle">R</text>
          <line x1="462" y1="150" x2="496" y2="150" stroke={MECH_COLORS.bond} strokeWidth="2" />
          <circle cx="500" cy="150" r="4" fill={MECH_COLORS.atom} />
          <text x="500" y="163" fontSize="12" fill={MECH_COLORS.atom} textAnchor="middle">O</text>
          <line x1="500" y1="146" x2="500" y2="112" stroke={MECH_COLORS.bond} strokeWidth="2" />
          <text x="500" y="100" fontSize="13" fill={MECH_COLORS.atom} textAnchor="middle">H</text>

          <line x1="506" y1="145" x2="545" y2="122" stroke={MECH_COLORS.bond} strokeWidth="2" strokeDasharray="3 3" />
          <text x="560" y="112" fontSize="13" fill={MECH_COLORS.atom} textAnchor="middle">H</text>

          <ChemLatexSvg tex="\delta^+" x={480} y={122} fontSize={12} color={MECH_COLORS.charge} width={26} height={18} />
          <ChemLatexSvg tex="\delta^+" x={568} y={94} fontSize={12} color={MECH_COLORS.charge} width={26} height={18} />

          <text x="532" y="245" fontSize="13" fill={MECH_COLORS.atom} textAnchor="middle" fontWeight="600">
            מצב מעבר - פרוטונציה של החמצן
          </text>
        </g>

        <line x1="665" y1="150" x2="720" y2="150" stroke={MECH_COLORS.arrow} strokeWidth="2.5" markerEnd="url(#arrow-e1)" />

        {/* ===== פאנל 1.3: תוצר - אוקסוניום R-OH2+ (Cα עדיין טטרהדרי אמיתי - טריז/מקווקוו) ===== */}
        <g>
          <line x1="820" y1="150" x2="820" y2="105" stroke={MECH_COLORS.bond} strokeWidth="2" />
          <text x="820" y="93" fontSize="14" fill={MECH_COLORS.atom} textAnchor="middle">Cβ</text>

          <WedgeBond x1={820} y1={150} x2={782} y2={188} />
          <text x="768" y="202" fontSize="14" fill={MECH_COLORS.atom} textAnchor="middle">H</text>

          <DashBond x1={820} y1={150} x2={858} y2={188} />
          <text x="874" y="202" fontSize="14" fill={MECH_COLORS.atom} textAnchor="middle">H</text>

          <circle cx="820" cy="150" r="3.5" fill={MECH_COLORS.atom} />
          <text x="820" y="163" fontSize="11" fill={MECH_COLORS.atom} textAnchor="middle">Cα</text>

          <line x1="824" y1="150" x2="864" y2="150" stroke={MECH_COLORS.bond} strokeWidth="2" />
          <circle cx="868" cy="150" r="4" fill={MECH_COLORS.electrophileLeavingGroup} />
          <text x="868" y="163" fontSize="12" fill={MECH_COLORS.atom} textAnchor="middle">O</text>
          <line x1="868" y1="146" x2="868" y2="110" stroke={MECH_COLORS.bond} strokeWidth="2" />
          <text x="868" y="98" fontSize="14" fill={MECH_COLORS.atom} textAnchor="middle">H</text>
          <line x1="872" y1="151" x2="900" y2="128" stroke={MECH_COLORS.bond} strokeWidth="2" />
          <text x="912" y="118" fontSize="14" fill={MECH_COLORS.atom} textAnchor="middle">H</text>

          <ChemLatexSvg tex="+" x={888} y={132} fontSize={13} color={MECH_COLORS.charge} width={18} height={18} />

          <text x="850" y="245" fontSize="13" fill={MECH_COLORS.atom} textAnchor="middle" fontWeight="600">
            תוצר - אוקסוניום (Cα עדיין טטרהדרי)
          </text>
        </g>

        <line x1="20" y1="275" x2="920" y2="275" stroke={MECH_COLORS.bond} strokeWidth="1" strokeDasharray="4 4" />

        {/* ============================================================ */}
        {/* שלב 2 - עזיבת המים ⇽ קרבוקטיון שטוח (Cα הופך ל-sp2, ללא טריז/מקווקוו - זה נכון כימית) */}
        {/* ============================================================ */}
        <text x="470" y="305" fontSize="13" fill={MECH_COLORS.atom} textAnchor="middle" fontWeight="700">
          שלב 2 - עזיבת המים ⇽ קרבוקטיון
        </text>

        {/* ===== פאנל 2.1: מגיבים - אותה אוקסוניום טטרהדרית (Cα-O עומד להישבר) ===== */}
        <g>
          <line x1="150" y1="420" x2="150" y2="375" stroke={MECH_COLORS.bond} strokeWidth="2" />
          <text x="150" y="363" fontSize="14" fill={MECH_COLORS.atom} textAnchor="middle">Cβ</text>

          <WedgeBond x1={150} y1={420} x2={112} y2={458} />
          <text x="98" y="472" fontSize="14" fill={MECH_COLORS.atom} textAnchor="middle">H</text>

          <DashBond x1={150} y1={420} x2={188} y2={458} />
          <text x="204" y="472" fontSize="14" fill={MECH_COLORS.atom} textAnchor="middle">H</text>

          <circle cx="150" cy="420" r="3.5" fill={MECH_COLORS.atom} />
          <text x="150" y="433" fontSize="11" fill={MECH_COLORS.atom} textAnchor="middle">Cα</text>

          <line x1="154" y1="420" x2="194" y2="420" stroke={MECH_COLORS.bond} strokeWidth="2" />
          <circle cx="198" cy="420" r="4" fill={MECH_COLORS.electrophileLeavingGroup} />
          <text x="198" y="433" fontSize="12" fill={MECH_COLORS.atom} textAnchor="middle">O</text>
          <line x1="198" y1="416" x2="198" y2="380" stroke={MECH_COLORS.bond} strokeWidth="2" />
          <text x="198" y="368" fontSize="14" fill={MECH_COLORS.atom} textAnchor="middle">H</text>
          <line x1="202" y1="421" x2="230" y2="398" stroke={MECH_COLORS.bond} strokeWidth="2" />
          <text x="242" y="388" fontSize="14" fill={MECH_COLORS.atom} textAnchor="middle">H</text>
          <ChemLatexSvg tex="+" x={216} y={402} fontSize={13} color={MECH_COLORS.charge} width={18} height={18} />

          {/* קשר Cα-O נשבר - זוג האלקטרונים עובר לחלוטין אל החמצן */}
          <path d="M172,414 Q188,396 196,408" fill="none" stroke={MECH_COLORS.arrow} strokeWidth="2.25" markerEnd="url(#arrow-e1)" />

          <text x="150" y="515" fontSize="13" fill={MECH_COLORS.atom} textAnchor="middle" fontWeight="600">
            מגיבים - אוקסוניום (קבוצה עוזבת טובה)
          </text>
        </g>

        <line x1="270" y1="420" x2="340" y2="420" stroke={MECH_COLORS.arrow} strokeWidth="2.5" markerEnd="url(#arrow-e1)" />

        {/* ===== פאנל 2.2: תוצר - קרבוקטיון שטוח (Y, כל הקשרים רגילים - sp2 אמיתי) + מים ===== */}
        <g>
          <circle cx="530" cy="420" r="3.5" fill={MECH_COLORS.atom} />
          <text x="530" y="433" fontSize="11" fill={MECH_COLORS.atom} textAnchor="middle">Cα</text>

          <line x1="530" y1="420" x2="530" y2="375" stroke={MECH_COLORS.bond} strokeWidth="2" />
          <text x="530" y="363" fontSize="14" fill={MECH_COLORS.atom} textAnchor="middle">Cβ</text>

          <line x1="530" y1="420" x2="494" y2="458" stroke={MECH_COLORS.bond} strokeWidth="2" />
          <text x="480" y="472" fontSize="14" fill={MECH_COLORS.atom} textAnchor="middle">H</text>

          <line x1="530" y1="420" x2="566" y2="458" stroke={MECH_COLORS.bond} strokeWidth="2" />
          <text x="580" y="472" fontSize="14" fill={MECH_COLORS.atom} textAnchor="middle">H</text>

          <ChemLatexSvg tex="+" x={548} y={398} fontSize={13} color={MECH_COLORS.charge} width={18} height={18} />

          <ChemLatexSvg tex="+" x={650} y={420} fontSize={16} color={MECH_COLORS.atom} width={20} height={24} />
          <ChemLatexSvg tex="\ce{H2O}" x={740} y={420} fontSize={17} color={MECH_COLORS.electrophileLeavingGroup} width={70} height={30} />

          <text x="580" y="515" fontSize="13" fill={MECH_COLORS.atom} textAnchor="middle" fontWeight="600">
            תוצר - קרבוקטיון שטוח (Cα, sp2) + מים
          </text>
        </g>

        <line x1="20" y1="545" x2="920" y2="545" stroke={MECH_COLORS.bond} strokeWidth="1" strokeDasharray="4 4" />

        {/* ============================================================ */}
        {/* שלב 3 - בסיס מסיר Hβ ⇽ קשר π חדש ⇽ אלקן (לרוב לפי כלל זייצב) */}
        {/* ============================================================ */}
        <text x="470" y="575" fontSize="13" fill={MECH_COLORS.atom} textAnchor="middle" fontWeight="700">
          שלב 3 - בסיס מסיר Hβ ⇽ אלקן
        </text>

        {/* ===== פאנל 3.1: מגיבים - קרבוקטיון שטוח + Cβ-Hβ שכן + בסיס תוקף ===== */}
        <g>
          <circle cx="150" cy="705" r="3.5" fill={MECH_COLORS.atom} />
          <text x="150" y="718" fontSize="11" fill={MECH_COLORS.atom} textAnchor="middle">Cα</text>

          <line x1="150" y1="701" x2="150" y2="659" stroke={MECH_COLORS.bond} strokeWidth="2" />
          <circle cx="150" cy="655" r="3.5" fill={MECH_COLORS.atom} />
          <text x="130" y="658" fontSize="12" fill={MECH_COLORS.atom} textAnchor="middle">Cβ</text>

          <line x1="150" y1="651" x2="150" y2="610" stroke={MECH_COLORS.bond} strokeWidth="2" />
          <text x="150" y="598" fontSize="14" fill={MECH_COLORS.atom} textAnchor="middle">Hβ</text>

          <line x1="150" y1="705" x2="114" y2="730" stroke={MECH_COLORS.bond} strokeWidth="2" />
          <text x="100" y="744" fontSize="14" fill={MECH_COLORS.atom} textAnchor="middle">H</text>

          <line x1="150" y1="705" x2="186" y2="730" stroke={MECH_COLORS.bond} strokeWidth="2" />
          <text x="200" y="744" fontSize="14" fill={MECH_COLORS.atom} textAnchor="middle">H</text>

          <ChemLatexSvg tex="+" x={170} y={684} fontSize={13} color={MECH_COLORS.charge} width={18} height={18} />

          <text x="58" y="600" fontSize="15" fontWeight="700" fill={MECH_COLORS.nucleophile} textAnchor="middle">Base</text>
          <circle cx="85" cy="613" r="2" fill={MECH_COLORS.nucleophile} />
          <circle cx="92" cy="618" r="2" fill={MECH_COLORS.nucleophile} />

          {/* חץ 1: זוג בודד של הבסיס תוקף את Hβ */}
          <path d="M90,614 Q120,604 146,610" fill="none" stroke={MECH_COLORS.arrow} strokeWidth="2.25" markerEnd="url(#arrow-e1)" />
          {/* חץ 2: זוג האלקטרונים של הקשר Cβ-Hβ נודד ליצירת קשר פי Cα=Cβ */}
          <path d="M158,616 Q186,635 158,657" fill="none" stroke={MECH_COLORS.arrow} strokeWidth="2.25" markerEnd="url(#arrow-e1)" />

          <text x="150" y="790" fontSize="13" fill={MECH_COLORS.atom} textAnchor="middle" fontWeight="600">
            מגיבים - קרבוקטיון + בסיס תוקף Hβ
          </text>
        </g>

        <line x1="270" y1="705" x2="340" y2="705" stroke={MECH_COLORS.arrow} strokeWidth="2.5" markerEnd="url(#arrow-e1)" />

        {/* ===== פאנל 3.2: תוצר סופי - האלקן (Cα=Cβ) + Base-H ===== */}
        <g>
          <text x="420" y="655" fontSize="14" fontWeight="700" fill={MECH_COLORS.nucleophile} textAnchor="middle">Base</text>
          <line x1="420" y1="661" x2="420" y2="685" stroke={MECH_COLORS.bond} strokeWidth="2" />
          <text x="420" y="700" fontSize="14" fill={MECH_COLORS.atom} textAnchor="middle">H</text>

          <circle cx="470" cy="705" r="3.5" fill={MECH_COLORS.atom} />
          <text x="470" y="688" fontSize="11" fill={MECH_COLORS.atom} textAnchor="middle">Cβ</text>

          <circle cx="560" cy="705" r="3.5" fill={MECH_COLORS.atom} />
          <text x="560" y="688" fontSize="11" fill={MECH_COLORS.atom} textAnchor="middle">Cα</text>

          <line x1="474" y1="701" x2="556" y2="701" stroke={MECH_COLORS.bond} strokeWidth="2" />
          <line x1="474" y1="709" x2="556" y2="709" stroke={MECH_COLORS.bond} strokeWidth="2" />

          <line x1="466" y1="709" x2="435" y2="733" stroke={MECH_COLORS.bond} strokeWidth="2" />
          <text x="421" y="746" fontSize="14" fill={MECH_COLORS.atom} textAnchor="middle">H</text>

          <line x1="564" y1="701" x2="595" y2="677" stroke={MECH_COLORS.bond} strokeWidth="2" />
          <text x="608" y="665" fontSize="14" fill={MECH_COLORS.atom} textAnchor="middle">H</text>

          <line x1="564" y1="709" x2="595" y2="733" stroke={MECH_COLORS.bond} strokeWidth="2" />
          <text x="608" y="746" fontSize="14" fill={MECH_COLORS.atom} textAnchor="middle">H</text>

          <text x="490" y="790" fontSize="13" fill={MECH_COLORS.atom} textAnchor="middle" fontWeight="600">
            תוצר - האלקן (Cα=Cβ, לרוב לפי כלל זייצב) + Base-H
          </text>
        </g>
      </svg>
    </MechanismArtFrame>
  );
}
