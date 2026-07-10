import { MechanismArtFrame, MECH_COLORS } from "./MechanismArtFrame";

/**
 * מנגנון סיפוח הלוגן (Br2) לאלקן - היווצרות יון הלוניום (ברומוניום).
 * פאנל מגיבים: C=C תוקף אחד מאטומי ה-Br במולקולת Br-Br, וקשר Br-Br נשבר בו-זמנית.
 * פאנל תוצרים: טבעת תלת-חברתית טעונה חיובית (יון ברומוניום) + Br⁻ נפרד.
 */
export function AlkeneAdditionArt() {
  return (
    <MechanismArtFrame
      title="מנגנון סיפוח הלוגן - היווצרות יון הלוניום (ברומוניום)"
      note="החץ הכחול: זוג האלקטרונים של הקשר הפי (העשיר-אלקטרונים) תוקף את אטום הברום הקרוב ויוצר קשר חדש. החץ הענברי: באותו רגע, קשר Br-Br נשבר והברום הרחוק עוזב כאניון Br⁻. התוצר - יון הלוניום (טבעת תלת-חברתית טעונה חיובית) - הוא-הוא הגורם לסיפוח האנטי: בשלב הבא הנוקלאופיל (למשל Br⁻ נוסף, או מים בהלוהידרין) חייב לתקוף מהצד הנגדי לטבעת, בדיוק כמו התקפה אחורית ב-SN2."
    >
      <svg viewBox="0 0 700 210" className="w-full h-auto" style={{ minWidth: 600 }}>
        <defs>
          <marker id="arrow-bromonium" viewBox="0 0 10 10" refX="8" refY="5" markerWidth="6" markerHeight="6" orient="auto-start-reverse">
            <path d="M0,0 L10,5 L0,10 z" fill={MECH_COLORS.arrow} />
          </marker>
        </defs>

        {/* ===== פאנל 1: מגיבים - אלקן + Br2 ===== */}
        <g fontFamily="inherit">
          {/* קשר כפול C=C */}
          <line x1="94" y1="106" x2="146" y2="106" stroke={MECH_COLORS.bond} strokeWidth="2" />
          <line x1="94" y1="114" x2="146" y2="114" stroke={MECH_COLORS.bond} strokeWidth="2" />
          <circle cx="90" cy="110" r="4" fill={MECH_COLORS.atom} />
          <circle cx="150" cy="110" r="4" fill={MECH_COLORS.atom} />
          <text x="90" y="130" fontSize="15" fill={MECH_COLORS.atom} textAnchor="middle">C</text>
          <text x="150" y="130" fontSize="15" fill={MECH_COLORS.atom} textAnchor="middle">C</text>

          {/* מולקולת Br-Br - ה-Br הקרוב פונה אל הקשר הכפול */}
          <line x1="264" y1="110" x2="298" y2="110" stroke={MECH_COLORS.bond} strokeWidth="2" />
          <text x="250" y="115" fontSize="17" fontWeight="700" fill={MECH_COLORS.electrophileLeavingGroup} textAnchor="middle">Br</text>
          <text x="312" y="115" fontSize="17" fontWeight="700" fill={MECH_COLORS.electrophileLeavingGroup} textAnchor="middle">Br</text>

          {/* חץ 1: הקשר הפי תוקף את ה-Br הקרוב */}
          <path
            d="M120,100 Q180,48 244,96"
            fill="none"
            stroke={MECH_COLORS.arrow}
            strokeWidth="2.25"
            markerEnd="url(#arrow-bromonium)"
          />
          {/* חץ 2: קשר Br-Br נשבר, האלקטרונים עוברים לברום הרחוק */}
          <path
            d="M279,104 Q294,74 314,94"
            fill="none"
            stroke={MECH_COLORS.arrow}
            strokeWidth="2.25"
            markerEnd="url(#arrow-bromonium)"
          />

          <text x="170" y="180" fontSize="13" fill={MECH_COLORS.atom} textAnchor="middle" fontWeight="600">
            מגיבים
          </text>
        </g>

        {/* ===== חץ תגובה ===== */}
        <line x1="360" y1="110" x2="415" y2="110" stroke={MECH_COLORS.arrow} strokeWidth="2.5" markerEnd="url(#arrow-bromonium)" />

        {/* ===== פאנל 2: תוצרים - יון ברומוניום + Br- ===== */}
        <g fontFamily="inherit">
          {/* טבעת תלת-חברתית (יון ברומוניום) */}
          <line x1="464" y1="140" x2="536" y2="140" stroke={MECH_COLORS.bond} strokeWidth="2" />
          <line x1="462" y1="136" x2="497" y2="80" stroke={MECH_COLORS.bond} strokeWidth="2" />
          <line x1="538" y1="136" x2="503" y2="80" stroke={MECH_COLORS.bond} strokeWidth="2" />

          <circle cx="460" cy="140" r="4" fill={MECH_COLORS.atom} />
          <circle cx="540" cy="140" r="4" fill={MECH_COLORS.atom} />
          <circle cx="500" cy="75" r="4" fill={MECH_COLORS.electrophileLeavingGroup} />

          <text x="460" y="160" fontSize="15" fill={MECH_COLORS.atom} textAnchor="middle">C</text>
          <text x="540" y="160" fontSize="15" fill={MECH_COLORS.atom} textAnchor="middle">C</text>
          <text x="500" y="60" fontSize="17" fontWeight="700" fill={MECH_COLORS.electrophileLeavingGroup} textAnchor="middle">Br⁺</text>

          {/* Br- נפרד, שעזב את הטבעת */}
          <text x="630" y="115" fontSize="17" fontWeight="700" fill={MECH_COLORS.electrophileLeavingGroup} textAnchor="middle">Br⁻</text>

          <text x="560" y="190" fontSize="13" fill={MECH_COLORS.atom} textAnchor="middle" fontWeight="600">
            תוצרים - יון הלוניום ו-Br⁻
          </text>
        </g>
      </svg>
    </MechanismArtFrame>
  );
}
