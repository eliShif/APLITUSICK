import { MechanismArtFrame, MECH_COLORS } from "./MechanismArtFrame";

export function RadicalReactionsArt() {
  return (
    <MechanismArtFrame
      title="מנגנון רדיקלי - הסטת מימן (Hydrogen Abstraction) בשלב ההתפשטות"
      note="החץ המקווקו בעל ראש-חצי בלבד (fishhook) מסמן תנועה של אלקטרון בודד אחד - ולא זוג! - בניגוד לחץ הכפול (ראש חץ מלא) המוכר ממנגנוני יונים כמו SN2, שמסמן תנועה של זוג אלקטרונים שלם. כאן: אלקטרון יחיד מהקשר C-H עובר אל רדיקל ההלוגן (•X), יוצר קשר H-X חדש ומותיר מאחור רדיקל פחמן חדש (•R). זהו שלב אחד משני שלבי ההתפשטות (propagation) במנגנון השרשרת הרדיקלי - השלב השני הוא R• + X₂ → R-X + X•, המחזיר רדיקל הלוגן חדש להמשך השרשרת."
    >
      <svg viewBox="0 0 720 220" className="w-full h-auto" style={{ minWidth: 560 }}>
        <defs>
          <marker id="arrow-radical" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="7" markerHeight="7" orient="auto-start-reverse">
            <path d="M0,5 L10,5 L0,0 z" fill={MECH_COLORS.arrow} />
          </marker>
          <marker id="arrow-radical-straight" viewBox="0 0 10 10" refX="8" refY="5" markerWidth="6" markerHeight="6" orient="auto-start-reverse">
            <path d="M0,0 L10,5 L0,10 z" fill={MECH_COLORS.arrow} />
          </marker>
        </defs>
        <g fontFamily="inherit">
          <text x="70" y="113" fontSize="17" fontWeight="700" fill={MECH_COLORS.atom} textAnchor="middle">R</text>
          <line x1="90" y1="108" x2="175" y2="108" stroke={MECH_COLORS.bond} strokeWidth="2" />
          <text x="195" y="113" fontSize="17" fontWeight="700" fill={MECH_COLORS.atom} textAnchor="middle">H</text>

          <circle cx="165" cy="100" r="2.5" fill={MECH_COLORS.charge} />

          <text x="270" y="113" fontSize="17" fontWeight="700" fill={MECH_COLORS.electrophileLeavingGroup} textAnchor="middle">X</text>
          <circle cx="258" cy="93" r="2.5" fill={MECH_COLORS.charge} />

          <path d="M165,100 Q205,60 250,91" fill="none" stroke={MECH_COLORS.arrow} strokeWidth="2.25" markerEnd="url(#arrow-radical)" />

          <text x="180" y="185" fontSize="13" fill={MECH_COLORS.atom} textAnchor="middle" fontWeight="600">מגיבים - •X + R-H</text>
        </g>
        <line x1="330" y1="108" x2="400" y2="108" stroke={MECH_COLORS.arrow} strokeWidth="2.5" markerEnd="url(#arrow-radical-straight)" />
        <g fontFamily="inherit">
          <text x="460" y="113" fontSize="17" fontWeight="700" fill={MECH_COLORS.atom} textAnchor="middle">R</text>
          <circle cx="478" cy="95" r="2.5" fill={MECH_COLORS.charge} />

          <text x="545" y="113" fontSize="17" fontWeight="700" fill={MECH_COLORS.atom} textAnchor="middle">H</text>
          <line x1="560" y1="108" x2="625" y2="108" stroke={MECH_COLORS.bond} strokeWidth="2" />
          <text x="645" y="113" fontSize="17" fontWeight="700" fill={MECH_COLORS.electrophileLeavingGroup} textAnchor="middle">X</text>

          <text x="555" y="185" fontSize="13" fill={MECH_COLORS.atom} textAnchor="middle" fontWeight="600">תוצרים - •R + H-X</text>
        </g>
      </svg>
    </MechanismArtFrame>
  );
}
