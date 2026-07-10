import { MechanismArtFrame, MECH_COLORS } from "./MechanismArtFrame";

export function ReactivityToolkitArt() {
  return (
    <MechanismArtFrame
      title="התבנית האוניברסלית: נוקלאופיל תוקף אלקטרופיל, קבוצה עוזבת עוזבת"
      note="כמעט כל מנגנון בקורס (SN2, SN1, תוספת לקרבוניל, תוספת-אלימינציה, ואפילו שלבים בתגובות סיפוח/אלימינציה) הוא וריאציה על שני החצים האלה. ברגע שמזהים מי הנוקלאופיל, מי האלקטרופיל (עם ה-δ+) ומי הקבוצה העוזבת (עם ה-δ-) - אפשר לצייר את רוב המנגנונים בקורס."
    >
      <svg viewBox="0 0 720 220" className="w-full h-auto" style={{ minWidth: 560 }}>
        <defs>
          <marker
            id="arrow-generic-pattern"
            viewBox="0 0 10 10"
            refX="8"
            refY="5"
            markerWidth="6"
            markerHeight="6"
            orient="auto-start-reverse"
          >
            <path d="M0,0 L10,5 L0,10 z" fill={MECH_COLORS.arrow} />
          </marker>
        </defs>

        {/* פאנל 1: מגיבים */}
        <g fontFamily="inherit">
          {/* זוג בודד ליד Nu */}
          <circle cx="62" cy="88" r="2" fill={MECH_COLORS.nucleophile} />
          <circle cx="68" cy="88" r="2" fill={MECH_COLORS.nucleophile} />
          <text x="55" y="115" fontSize="19" fontWeight="700" fill={MECH_COLORS.nucleophile} textAnchor="middle">
            Nu
          </text>
          <text x="80" y="98" fontSize="14" fill={MECH_COLORS.nucleophile} textAnchor="middle">
            ⁻
          </text>

          {/* קו Nu - E */}
          <line x1="90" y1="110" x2="150" y2="110" stroke={MECH_COLORS.bond} strokeWidth="2" />

          {/* E עם δ+ */}
          <text x="165" y="115" fontSize="19" fontWeight="700" fill={MECH_COLORS.atom} textAnchor="middle">
            E
          </text>
          <text x="165" y="90" fontSize="14" fontWeight="700" fill={MECH_COLORS.charge} textAnchor="middle">
            δ+
          </text>

          {/* קו E - LG */}
          <line x1="180" y1="110" x2="240" y2="110" stroke={MECH_COLORS.bond} strokeWidth="2" />

          {/* LG עם δ- */}
          <text x="258" y="115" fontSize="19" fontWeight="700" fill={MECH_COLORS.electrophileLeavingGroup} textAnchor="middle">
            LG
          </text>
          <text x="258" y="90" fontSize="14" fontWeight="700" fill={MECH_COLORS.electrophileLeavingGroup} textAnchor="middle">
            δ-
          </text>

          {/* חץ 1: מהזוג הבודד של Nu אל E */}
          <path
            d="M70,85 Q115,68 150,100"
            fill="none"
            stroke={MECH_COLORS.arrow}
            strokeWidth="2.25"
            markerEnd="url(#arrow-generic-pattern)"
          />

          {/* חץ 2: מאמצע קשר E-LG אל LG */}
          <path
            d="M210,110 Q230,88 254,98"
            fill="none"
            stroke={MECH_COLORS.arrow}
            strokeWidth="2.25"
            markerEnd="url(#arrow-generic-pattern)"
          />

          <text x="160" y="185" fontSize="13" fill={MECH_COLORS.atom} textAnchor="middle" fontWeight="600">
            מגיבים
          </text>
        </g>

        {/* חץ תגובה מרכזי */}
        <line
          x1="330"
          y1="110"
          x2="400"
          y2="110"
          stroke={MECH_COLORS.arrow}
          strokeWidth="2.5"
          markerEnd="url(#arrow-generic-pattern)"
        />

        {/* פאנל 2: תוצרים */}
        <g fontFamily="inherit">
          {/* Nu-E מחוברים */}
          <text x="470" y="115" fontSize="19" fontWeight="700" fill={MECH_COLORS.nucleophile} textAnchor="middle">
            Nu
          </text>
          <line x1="490" y1="110" x2="525" y2="110" stroke={MECH_COLORS.bond} strokeWidth="2.5" />
          <text x="545" y="115" fontSize="19" fontWeight="700" fill={MECH_COLORS.atom} textAnchor="middle">
            E
          </text>

          {/* LG⁻ נפרד */}
          <text x="650" y="115" fontSize="19" fontWeight="700" fill={MECH_COLORS.electrophileLeavingGroup} textAnchor="middle">
            LG
          </text>
          <text x="670" y="98" fontSize="14" fontWeight="700" fill={MECH_COLORS.electrophileLeavingGroup} textAnchor="middle">
            ⁻
          </text>

          <text x="560" y="185" fontSize="13" fill={MECH_COLORS.atom} textAnchor="middle" fontWeight="600">
            תוצרים - קשר חדש נוצר, הקבוצה העוזבת פרשה
          </text>
        </g>
      </svg>
    </MechanismArtFrame>
  );
}
