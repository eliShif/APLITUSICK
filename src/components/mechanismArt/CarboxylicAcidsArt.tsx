import { MechanismArtFrame, MECH_COLORS } from "./MechanismArtFrame";

export function CarboxylicAcidsArt() {
  return (
    <MechanismArtFrame
      title="תוספת-אלימינציה נוקלאופילית אצילית - שונה מתוספת פשוטה!"
      note="החץ הכחול: זוג האלקטרונים של הנוקלאופיל תוקף את פחמן הקרבוניל. החץ השחור העליון: הקשר π של C=O עובר לחמצן ויוצר תווך ביניים טטראהדרלי טעון שלילית (O⁻). בשלב השני (מימין): זוג האלקטרונים על החמצן חוזר ויוצר מחדש C=O, וזוג האלקטרונים של הקשר C-LG עובר אל ה-LG שעוזב (ענבר). בשונה מתוספת פשוטה לאלדהיד/קטון - כאן LG טוב עוזב ומחזיר את הקרבוניל, כך שהנגזרת המקורית מוחלפת בפועל בנוקלאופיל החדש (סובסטיטוציה אמיתית, לא רק תוספת)."
    >
      <svg viewBox="0 0 980 220" className="w-full h-auto" style={{ minWidth: 760 }}>
        <defs>
          <marker id="arrow-acyl" viewBox="0 0 10 10" refX="8" refY="5" markerWidth="6" markerHeight="6" orient="auto-start-reverse">
            <path d="M0,0 L10,5 L0,10 z" fill={MECH_COLORS.arrow} />
          </marker>
        </defs>

        {/* ===== פאנל 1: מגיבים - שלב תוספת ===== */}
        <g fontFamily="inherit">
          {/* R group */}
          <line x1="95" y1="108" x2="60" y2="85" stroke={MECH_COLORS.bond} strokeWidth="2" />
          <text x="48" y="82" fontSize="15" fill={MECH_COLORS.atom} textAnchor="middle">R</text>

          {/* carbonyl carbon */}
          <circle cx="95" cy="108" r="4" fill={MECH_COLORS.atom} />

          {/* C=O double bond, going up */}
          <line x1="98" y1="102" x2="98" y2="55" stroke={MECH_COLORS.bond} strokeWidth="2" />
          <line x1="92" y1="102" x2="92" y2="55" stroke={MECH_COLORS.bond} strokeWidth="2" />
          <text x="95" y="42" fontSize="15" fill={MECH_COLORS.atom} textAnchor="middle">O</text>

          {/* C-LG bond */}
          <line x1="99" y1="108" x2="150" y2="108" stroke={MECH_COLORS.bond} strokeWidth="2" />
          <text x="172" y="113" fontSize="16" fontWeight="700" fill={MECH_COLORS.electrophileLeavingGroup} textAnchor="middle">LG</text>

          {/* Nucleophile approaching from below */}
          <text x="55" y="165" fontSize="16" fontWeight="700" fill={MECH_COLORS.nucleophile} textAnchor="middle">Nu</text>
          <text x="70" y="150" fontSize="12" fill={MECH_COLORS.nucleophile} textAnchor="middle">⁻</text>
          <circle cx="76" cy="147" r="2" fill={MECH_COLORS.nucleophile} />
          <circle cx="82" cy="147" r="2" fill={MECH_COLORS.nucleophile} />

          {/* arrow 1: Nu lone pair -> carbonyl carbon (blue) */}
          <path d="M79,144 Q88,125 94,112" fill="none" stroke={MECH_COLORS.nucleophile} strokeWidth="2.25" markerEnd="url(#arrow-acyl)" />

          {/* arrow 2: C=O pi bond -> O (black), curving from the double bond to the O */}
          <path d="M96,80 Q112,65 100,50" fill="none" stroke={MECH_COLORS.arrow} strokeWidth="2.25" markerEnd="url(#arrow-acyl)" />

          <text x="105" y="195" fontSize="13" fill={MECH_COLORS.atom} textAnchor="middle" fontWeight="600">מגיבים - שלב תוספת</text>
        </g>

        {/* arrow panel1 -> panel2 */}
        <line x1="230" y1="108" x2="290" y2="108" stroke={MECH_COLORS.arrow} strokeWidth="2.5" markerEnd="url(#arrow-acyl)" />

        {/* ===== פאנל 2: תווך ביניים טטראהדרלי ===== */}
        <g fontFamily="inherit">
          {/* R group */}
          <line x1="460" y1="108" x2="425" y2="80" stroke={MECH_COLORS.bond} strokeWidth="2" />
          <text x="413" y="77" fontSize="15" fill={MECH_COLORS.atom} textAnchor="middle">R</text>

          {/* tetrahedral carbon */}
          <circle cx="460" cy="108" r="4" fill={MECH_COLORS.atom} />

          {/* C-O(-) single bond, up */}
          <line x1="460" y1="103" x2="460" y2="58" stroke={MECH_COLORS.bond} strokeWidth="2" />
          <text x="460" y="45" fontSize="15" fill={MECH_COLORS.atom} textAnchor="middle">O</text>
          <text x="475" y="40" fontSize="13" fill={MECH_COLORS.charge} textAnchor="middle">⁻</text>

          {/* C-LG bond */}
          <line x1="464" y1="108" x2="515" y2="108" stroke={MECH_COLORS.bond} strokeWidth="2" />
          <text x="537" y="113" fontSize="16" fontWeight="700" fill={MECH_COLORS.electrophileLeavingGroup} textAnchor="middle">LG</text>

          {/* C-Nu bond, down-left */}
          <line x1="457" y1="112" x2="425" y2="140" stroke={MECH_COLORS.bond} strokeWidth="2" />
          <text x="410" y="155" fontSize="16" fontWeight="700" fill={MECH_COLORS.nucleophile} textAnchor="middle">Nu</text>

          <text x="470" y="185" fontSize="13" fill={MECH_COLORS.atom} textAnchor="middle" fontWeight="600">תווך ביניים טטראהדרלי</text>
          <text x="470" y="202" fontSize="12" fill={MECH_COLORS.atom} textAnchor="middle">(טעון שלילי)</text>

          {/* arrows for step 2, drawn within panel 2, pointing toward panel 3 */}
          {/* arrow 3: O(-) lone pair -> reforms C=O */}
          <path d="M470,55 Q495,50 480,90" fill="none" stroke={MECH_COLORS.arrow} strokeWidth="2.25" markerEnd="url(#arrow-acyl)" />
          {/* arrow 4: C-LG bond -> LG leaves */}
          <path d="M490,108 Q515,100 530,105" fill="none" stroke={MECH_COLORS.electrophileLeavingGroup} strokeWidth="2.25" markerEnd="url(#arrow-acyl)" />
        </g>

        {/* arrow panel2 -> panel3 */}
        <line x1="600" y1="108" x2="660" y2="108" stroke={MECH_COLORS.arrow} strokeWidth="2.5" markerEnd="url(#arrow-acyl)" />

        {/* ===== פאנל 3: תוצרים - שלב אלימינציה ===== */}
        <g fontFamily="inherit">
          {/* R group */}
          <line x1="800" y1="108" x2="765" y2="85" stroke={MECH_COLORS.bond} strokeWidth="2" />
          <text x="753" y="82" fontSize="15" fill={MECH_COLORS.atom} textAnchor="middle">R</text>

          {/* carbonyl carbon */}
          <circle cx="800" cy="108" r="4" fill={MECH_COLORS.atom} />

          {/* new C=O double bond */}
          <line x1="803" y1="102" x2="803" y2="55" stroke={MECH_COLORS.bond} strokeWidth="2" />
          <line x1="797" y1="102" x2="797" y2="55" stroke={MECH_COLORS.bond} strokeWidth="2" />
          <text x="800" y="42" fontSize="15" fill={MECH_COLORS.atom} textAnchor="middle">O</text>

          {/* C-Nu bond */}
          <line x1="804" y1="108" x2="850" y2="108" stroke={MECH_COLORS.bond} strokeWidth="2" />
          <text x="872" y="113" fontSize="16" fontWeight="700" fill={MECH_COLORS.nucleophile} textAnchor="middle">Nu</text>

          {/* departed LG, separated to the side */}
          <text x="900" y="165" fontSize="16" fontWeight="700" fill={MECH_COLORS.electrophileLeavingGroup} textAnchor="middle">LG</text>
          <text x="920" y="150" fontSize="13" fill={MECH_COLORS.electrophileLeavingGroup} textAnchor="middle">⁻</text>

          <text x="850" y="195" fontSize="13" fill={MECH_COLORS.atom} textAnchor="middle" fontWeight="600">תוצרים - נגזרת חדשה</text>
        </g>
      </svg>
    </MechanismArtFrame>
  );
}
