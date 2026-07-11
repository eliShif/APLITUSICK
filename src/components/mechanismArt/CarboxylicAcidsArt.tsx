import { MechanismArtFrame, MECH_COLORS } from "./MechanismArtFrame";
import { ChemLatexSvg } from "@/components/ChemLatex";
import { WedgeBond, DashBond } from "./BondPrimitives";

/**
 * מנגנון תוספת-אלימינציה נוקלאופילית אצילית (Nucleophilic Acyl Substitution), בסגנון
 * הייחוס של NucleophilicSubstitutionArt.tsx: שלושה פאנלים, טריז/מקווקוו תלת-ממדי אמיתי
 * ו-ChemLatexSvg (KaTeX+mhchem) לכל תווית כימית. בשונה מ-SN2, הפאנל האמצעי כאן אינו מצב
 * מעבר חולף אלא תווך ביניים טטראהדרלי אמיתי (בר-בידוד עקרונית) - לכן הוא מצויר כפאנל רגיל,
 * בלי BracketPair. זהו המקום היחיד בתרשים שבו הפחמן המרכזי הוא sp3 אמיתי עם ארבעה
 * תחליפים שונים (R, Nu, LG, O⁻) - סטריאומרכז של ממש - ולכן שני מהקשרים שלו מצוירים כטריז
 * (Nu, לכיוון הצופה) ומקווקוו (O⁻, מהצופה והלאה); בפאנלים 1 ו-3 הפחמן הוא sp2 שטוח
 * (קרבוניל אמיתי, קשר π כפול) ולכן אין שם טריז/מקווקוו - זה נכון כימית.
 */
export function CarboxylicAcidsArt() {
  return (
    <MechanismArtFrame
      title="תוספת-אלימינציה נוקלאופילית אצילית - שונה מתוספת פשוטה!"
      note="החץ הכחול: זוג האלקטרונים של הנוקלאופיל תוקף את פחמן הקרבוניל. החץ השחור העליון: הקשר π של C=O עובר לחמצן ויוצר תווך ביניים טטראהדרלי טעון שלילית (O⁻). בשלב השני (מימין): זוג האלקטרונים על החמצן חוזר ויוצר מחדש C=O, וזוג האלקטרונים של הקשר C-LG עובר אל ה-LG שעוזב (ענבר). בשונה מתוספת פשוטה לאלדהיד/קטון - כאן LG טוב עוזב ומחזיר את הקרבוניל, כך שהנגזרת המקורית מוחלפת בפועל בנוקלאופיל החדש (סובסטיטוציה אמיתית, לא רק תוספת)."
    >
      <svg viewBox="0 0 1040 300" className="w-full h-auto" style={{ minWidth: 820 }}>
        <defs>
          <marker id="arrow-acyl" viewBox="0 0 10 10" refX="8" refY="5" markerWidth="6" markerHeight="6" orient="auto-start-reverse">
            <path d="M0,0 L10,5 L0,10 z" fill={MECH_COLORS.arrow} />
          </marker>
        </defs>

        {/* ===== פאנל 1: מגיבים - קרבוניל שטוח (sp2) + נוקלאופיל מתקרב ===== */}
        <g>
          {/* R group */}
          <line x1="160" y1="150" x2="120" y2="110" stroke={MECH_COLORS.bond} strokeWidth="2" />
          <text x="105" y="98" fontSize="15" fill={MECH_COLORS.atom} textAnchor="middle">R</text>

          {/* carbonyl carbon */}
          <circle cx="160" cy="150" r="4" fill={MECH_COLORS.atom} />

          {/* C=O double bond, going up */}
          <line x1="156" y1="145" x2="156" y2="90" stroke={MECH_COLORS.bond} strokeWidth="2" />
          <line x1="164" y1="145" x2="164" y2="90" stroke={MECH_COLORS.bond} strokeWidth="2" />
          <text x="160" y="79" fontSize="15" fill={MECH_COLORS.atom} textAnchor="middle">O</text>

          {/* C-LG bond */}
          <line x1="164" y1="150" x2="214" y2="150" stroke={MECH_COLORS.bond} strokeWidth="2" />
          <ChemLatexSvg tex="\ce{LG}" x={246} y={152} fontSize={17} color={MECH_COLORS.electrophileLeavingGroup} />

          {/* Nu^- approaching from below-left, with lone pair */}
          <ChemLatexSvg tex="\ce{Nu^-}" x={55} y={210} fontSize={17} color={MECH_COLORS.nucleophile} />
          <circle cx="78" cy="189" r="2" fill={MECH_COLORS.nucleophile} />
          <circle cx="84" cy="189" r="2" fill={MECH_COLORS.nucleophile} />

          {/* arrow 1: Nu lone pair -> carbonyl carbon (blue) */}
          <path d="M81,186 Q110,164 152,156" fill="none" stroke={MECH_COLORS.nucleophile} strokeWidth="2.25" markerEnd="url(#arrow-acyl)" />

          {/* arrow 2: C=O pi bond -> O, becomes lone pair on O (black) */}
          <path d="M162,108 Q184,86 165,77" fill="none" stroke={MECH_COLORS.arrow} strokeWidth="2.25" markerEnd="url(#arrow-acyl)" />

          <text x="160" y="258" fontSize="13" fill={MECH_COLORS.atom} textAnchor="middle" fontWeight="600">
            מגיבים - שלב תוספת
          </text>
        </g>

        <line x1="268" y1="150" x2="326" y2="150" stroke={MECH_COLORS.arrow} strokeWidth="2.5" markerEnd="url(#arrow-acyl)" />

        {/* ===== פאנל 2: תווך ביניים טטראהדרלי - סטריאומרכז אמיתי (sp3) ===== */}
        <g>
          {/* R group - in-plane bond */}
          <line x1="520" y1="150" x2="480" y2="110" stroke={MECH_COLORS.bond} strokeWidth="2" />
          <text x="465" y="98" fontSize="15" fill={MECH_COLORS.atom} textAnchor="middle">R</text>

          {/* LG - in-plane bond */}
          <line x1="520" y1="150" x2="560" y2="110" stroke={MECH_COLORS.bond} strokeWidth="2" />
          <ChemLatexSvg tex="\ce{LG}" x={594} y={98} fontSize={16} color={MECH_COLORS.electrophileLeavingGroup} />

          {/* Nu - wedge bond, toward the viewer */}
          <WedgeBond x1={520} y1={150} x2={478} y2={194} color={MECH_COLORS.bond} />
          <ChemLatexSvg tex="\ce{Nu}" x={446} y={208} fontSize={16} color={MECH_COLORS.nucleophile} />

          {/* O(-) - dash bond, away from the viewer */}
          <DashBond x1={520} y1={150} x2={562} y2={194} color={MECH_COLORS.bond} />
          <ChemLatexSvg tex="O^{-}" x={594} y={210} fontSize={16} color={MECH_COLORS.charge} />

          <circle cx="520" cy="150" r="4" fill={MECH_COLORS.atom} />

          {/* arrow 3: O(-) lone pair -> reforms the C=O pi bond (black) */}
          <path d="M559,187 Q592,150 528,143" fill="none" stroke={MECH_COLORS.arrow} strokeWidth="2.25" markerEnd="url(#arrow-acyl)" />
          {/* arrow 4: C-LG bond breaks, electrons leave with LG (amber) */}
          <path d="M547,120 Q574,100 589,91" fill="none" stroke={MECH_COLORS.electrophileLeavingGroup} strokeWidth="2.25" markerEnd="url(#arrow-acyl)" />

          <text x="520" y="250" fontSize="13" fill={MECH_COLORS.atom} textAnchor="middle" fontWeight="600">
            תווך ביניים טטראהדרלי
          </text>
          <text x="520" y="267" fontSize="12" fill={MECH_COLORS.atom} textAnchor="middle">
            (טעון שלילי)
          </text>
        </g>

        <line x1="636" y1="150" x2="696" y2="150" stroke={MECH_COLORS.arrow} strokeWidth="2.5" markerEnd="url(#arrow-acyl)" />

        {/* ===== פאנל 3: תוצרים - קרבוניל חדש שטוח (sp2 שוב) + LG חופשי ===== */}
        <g>
          {/* R group */}
          <line x1="860" y1="150" x2="820" y2="110" stroke={MECH_COLORS.bond} strokeWidth="2" />
          <text x="805" y="98" fontSize="15" fill={MECH_COLORS.atom} textAnchor="middle">R</text>

          {/* carbonyl carbon */}
          <circle cx="860" cy="150" r="4" fill={MECH_COLORS.atom} />

          {/* new C=O double bond, reformed */}
          <line x1="856" y1="145" x2="856" y2="90" stroke={MECH_COLORS.bond} strokeWidth="2" />
          <line x1="864" y1="145" x2="864" y2="90" stroke={MECH_COLORS.bond} strokeWidth="2" />
          <text x="860" y="79" fontSize="15" fill={MECH_COLORS.atom} textAnchor="middle">O</text>

          {/* C-Nu bond, now a real bond (no charge) */}
          <line x1="864" y1="150" x2="914" y2="150" stroke={MECH_COLORS.bond} strokeWidth="2" />
          <ChemLatexSvg tex="\ce{Nu}" x={946} y={152} fontSize={17} color={MECH_COLORS.nucleophile} />

          {/* LG(-), departed and separated - free anion */}
          <ChemLatexSvg tex="\ce{LG^-}" x={900} y={215} fontSize={17} color={MECH_COLORS.electrophileLeavingGroup} />

          <text x="860" y="258" fontSize="13" fill={MECH_COLORS.atom} textAnchor="middle" fontWeight="600">
            תוצרים - נגזרת חדשה
          </text>
        </g>
      </svg>
    </MechanismArtFrame>
  );
}
