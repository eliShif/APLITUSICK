import { MechanismArtFrame, MECH_COLORS } from "./MechanismArtFrame";

export function AldehydesKetonesArt() {
  return (
    <MechanismArtFrame
      title="תוספת נוקלאופילית לקרבוניל (אלדהיד/קטון) - ללא שלב אלימינציה"
      note="החץ הכחול: זוג האלקטרונים הבודד של הנוקלאופיל תוקף את פחמן הקרבוניל האלקטרופילי. החץ השחור: זוג האלקטרונים של הקשר הכפול C=O נודד אל החמצן ויוצר מטען שלילי (O⁻). בניגוד לחומצות קרבוקסיליות ונגזרותיהן (שיש בהן קבוצה עוזבת שיכולה לצאת ולהחזיר את הקרבוניל), כאן R ו-R'/H אינם קבוצות עוזבות טובות - לכן זו תוספת סופית (התוצר הוא אלקוקסיד/אלכוהול לאחר פרוטונציה, לא נגזרת חדשה)."
    >
      <svg viewBox="0 0 720 220" className="w-full h-auto" style={{ minWidth: 560 }}>
        <defs>
          <marker id="arrow-carbonyl-addition" viewBox="0 0 10 10" refX="8" refY="5" markerWidth="6" markerHeight="6" orient="auto-start-reverse">
            <path d="M0,0 L10,5 L0,10 z" fill={MECH_COLORS.arrow} />
          </marker>
        </defs>

        {/* ===== פאנל 1: מגיבים ===== */}
        <g fontFamily="inherit">
          {/* R group */}
          <line x1="150" y1="108" x2="115" y2="80" stroke={MECH_COLORS.bond} strokeWidth="2" />
          <text x="102" y="77" fontSize="15" fill={MECH_COLORS.atom} textAnchor="middle">R</text>

          {/* carbonyl carbon */}
          <circle cx="150" cy="108" r="4" fill={MECH_COLORS.atom} />
          <text x="150" y="128" fontSize="15" fill={MECH_COLORS.atom} textAnchor="middle">C</text>

          {/* C=O double bond, going up */}
          <line x1="147" y1="102" x2="147" y2="55" stroke={MECH_COLORS.bond} strokeWidth="2" />
          <line x1="153" y1="102" x2="153" y2="55" stroke={MECH_COLORS.bond} strokeWidth="2" />
          <text x="150" y="42" fontSize="15" fill={MECH_COLORS.atom} textAnchor="middle">O</text>

          {/* R'/H group */}
          <line x1="150" y1="108" x2="185" y2="135" stroke={MECH_COLORS.bond} strokeWidth="2" />
          <text x="202" y="150" fontSize="15" fill={MECH_COLORS.atom} textAnchor="middle">R'/H</text>

          {/* Nucleophile approaching from the left */}
          <text x="55" y="150" fontSize="17" fontWeight="700" fill={MECH_COLORS.nucleophile} textAnchor="middle">Nu</text>
          <text x="70" y="135" fontSize="13" fill={MECH_COLORS.nucleophile} textAnchor="middle">⁻</text>
          <circle cx="78" cy="132" r="2" fill={MECH_COLORS.nucleophile} />
          <circle cx="84" cy="132" r="2" fill={MECH_COLORS.nucleophile} />

          {/* arrow 1 (blue): Nu lone pair -> carbonyl carbon */}
          <path d="M81,129 Q108,118 143,110" fill="none" stroke={MECH_COLORS.nucleophile} strokeWidth="2.25" markerEnd="url(#arrow-carbonyl-addition)" />

          {/* arrow 2 (black): C=O pi bond -> O, curving from the double bond to the oxygen */}
          <path d="M151,80 Q170,65 155,50" fill="none" stroke={MECH_COLORS.arrow} strokeWidth="2.25" markerEnd="url(#arrow-carbonyl-addition)" />

          <text x="150" y="185" fontSize="13" fill={MECH_COLORS.atom} textAnchor="middle" fontWeight="600">מגיבים</text>
        </g>

        {/* arrow panel1 -> panel2 */}
        <line x1="330" y1="108" x2="400" y2="108" stroke={MECH_COLORS.arrow} strokeWidth="2.5" markerEnd="url(#arrow-carbonyl-addition)" />

        {/* ===== פאנל 2: תוצרים - אלקוקסיד טטראהדרלי ===== */}
        <g fontFamily="inherit">
          {/* R group */}
          <line x1="520" y1="108" x2="485" y2="80" stroke={MECH_COLORS.bond} strokeWidth="2" />
          <text x="472" y="77" fontSize="15" fill={MECH_COLORS.atom} textAnchor="middle">R</text>

          {/* tetrahedral carbon */}
          <circle cx="520" cy="108" r="4" fill={MECH_COLORS.atom} />
          <text x="520" y="128" fontSize="15" fill={MECH_COLORS.atom} textAnchor="middle">C</text>

          {/* C-O(-) single bond, up */}
          <line x1="520" y1="103" x2="520" y2="55" stroke={MECH_COLORS.bond} strokeWidth="2" />
          <text x="520" y="42" fontSize="15" fill={MECH_COLORS.atom} textAnchor="middle">O</text>
          <text x="536" y="38" fontSize="13" fill={MECH_COLORS.charge} textAnchor="middle">⁻</text>

          {/* R'/H group */}
          <line x1="520" y1="108" x2="555" y2="135" stroke={MECH_COLORS.bond} strokeWidth="2" />
          <text x="572" y="150" fontSize="15" fill={MECH_COLORS.atom} textAnchor="middle">R'/H</text>

          {/* new C-Nu bond */}
          <line x1="520" y1="108" x2="485" y2="135" stroke={MECH_COLORS.bond} strokeWidth="2" />
          <text x="463" y="150" fontSize="17" fontWeight="700" fill={MECH_COLORS.nucleophile} textAnchor="middle">Nu</text>

          <text x="520" y="185" fontSize="13" fill={MECH_COLORS.atom} textAnchor="middle" fontWeight="600">תוצרים - אלקוקסיד</text>
          <text x="520" y="202" fontSize="12" fill={MECH_COLORS.atom} textAnchor="middle">(טטראהדרלי, טעון שלילי)</text>
        </g>
      </svg>
    </MechanismArtFrame>
  );
}
