import { MechanismArtFrame, MECH_COLORS } from "./MechanismArtFrame";

/**
 * המנגנון המלא של היווצרות ההקטל התוך-מולקולרי (הטבעת המחזורית) של גלוקוז - שני שלבים:
 * 1) החמצן הרחוק (C5, מקוצר ל-HO) תוקף תוך-מולקולרית את פחמן הקרבוניל (C1) ⇽ אלקוקסיד טבעתי.
 * 2) פרוטונציה של האלקוקסיד (על ידי מים/H3O+) ⇽ ההקטל הניטרלי הסופי, עם פחמן אנומרי חדש (α/β).
 */
export function CycloalkanesCarbsRedoxArt() {
  return (
    <MechanismArtFrame
      title="המנגנון המלא: היווצרות הקטל טבעתי - הצורה המחזורית של גלוקוז"
      note="שלב 1: תוספת נוקלאופילית תוך-מולקולרית רגילה (בדיוק כמו תוספת לקרבוניל) - החמצן הרחוק (C5) תוקף את פחמן הקרבוניל (C1), וזוג האלקטרונים של C1=O נודד אל החמצן ⇽ אלקוקסיד טבעתי טעון שלילית. שלב 2: פרוטונציה מהירה של האלקוקסיד (על ידי מים/H3O⁺ בתמיסה) משלימה את ההקטל הניטרלי. הפחמן האנומרי (C1) יכול להתקבל בשתי צורות (α או β) - ולכן נוצרת תערובת (מוטרוטציה)."
    >
      <svg viewBox="0 0 760 480" className="w-full h-auto" style={{ minWidth: 600 }}>
        <defs>
          <marker id="arrow-hemiacetal" viewBox="0 0 10 10" refX="8" refY="5" markerWidth="6" markerHeight="6" orient="auto-start-reverse">
            <path d="M0,0 L10,5 L0,10 z" fill={MECH_COLORS.arrow} />
          </marker>
        </defs>

        <text x="380" y="18" fontSize="13" fill={MECH_COLORS.atom} textAnchor="middle" fontWeight="700">
          שלב 1 - תקיפה תוך-מולקולרית של הקרבוניל
        </text>

        {/* ===== פאנל 1: מגיבים - הצורה הפתוחה ===== */}
        <g fontFamily="inherit">
          <text x="48" y="178" fontSize="17" fontWeight="700" fill={MECH_COLORS.nucleophile} textAnchor="middle">HO</text>
          <circle cx="64" cy="158" r="2" fill={MECH_COLORS.nucleophile} />
          <circle cx="72" cy="158" r="2" fill={MECH_COLORS.nucleophile} />

          <line x1="86" y1="170" x2="116" y2="170" stroke={MECH_COLORS.bond} strokeWidth="2" />
          <text x="140" y="175" fontSize="20" fontWeight="700" fill={MECH_COLORS.atom} textAnchor="middle">···</text>
          <line x1="164" y1="170" x2="194" y2="170" stroke={MECH_COLORS.bond} strokeWidth="2" />

          <circle cx="200" cy="170" r="4" fill={MECH_COLORS.atom} />
          <text x="200" y="194" fontSize="15" fill={MECH_COLORS.atom} textAnchor="middle">C1</text>

          <line x1="203" y1="173" x2="228" y2="190" stroke={MECH_COLORS.bond} strokeWidth="2" />
          <text x="236" y="197" fontSize="14" fill={MECH_COLORS.atom} textAnchor="middle">H</text>

          <line x1="196" y1="166" x2="196" y2="120" stroke={MECH_COLORS.bond} strokeWidth="2" />
          <line x1="204" y1="166" x2="204" y2="120" stroke={MECH_COLORS.bond} strokeWidth="2" />
          <text x="200" y="106" fontSize="15" fill={MECH_COLORS.atom} textAnchor="middle">O</text>

          <path d="M69,153 Q140,34 197,162" fill="none" stroke={MECH_COLORS.arrow} strokeWidth="2.25" markerEnd="url(#arrow-hemiacetal)" />
          <path d="M203,152 Q226,128 206,110" fill="none" stroke={MECH_COLORS.arrow} strokeWidth="2.25" markerEnd="url(#arrow-hemiacetal)" />

          <text x="150" y="230" fontSize="12" fill={MECH_COLORS.atom} textAnchor="middle" fontWeight="600">
            מגיבים - הצורה הפתוחה
          </text>
        </g>

        <line x1="330" y1="170" x2="385" y2="170" stroke={MECH_COLORS.arrow} strokeWidth="2.5" markerEnd="url(#arrow-hemiacetal)" />

        {/* ===== פאנל 2: תוצר שלב 1 - אלקוקסיד טבעתי ===== */}
        <g fontFamily="inherit">
          <polygon points="560,120 518.4,144 518.4,192 560,216 601.6,192 601.6,144" fill="none" stroke={MECH_COLORS.bond} strokeWidth="2" />
          <circle cx="601.6" cy="144" r="3" fill={MECH_COLORS.nucleophile} />
          <text x="624" y="138" fontSize="15" fontWeight="700" fill={MECH_COLORS.nucleophile} textAnchor="middle">O</text>
          <circle cx="560" cy="120" r="4" fill={MECH_COLORS.atom} />
          <text x="560" y="100" fontSize="15" fill={MECH_COLORS.atom} textAnchor="middle">C1</text>
          <line x1="563" y1="115" x2="589" y2="86" stroke={MECH_COLORS.bond} strokeWidth="2" />
          <text x="604" y="78" fontSize="15" fontWeight="700" fill={MECH_COLORS.electrophileLeavingGroup} textAnchor="middle">O⁻</text>
          <text x="560" y="245" fontSize="12" fill={MECH_COLORS.atom} textAnchor="middle" fontWeight="600">
            אלקוקסיד טבעתי (טעון שלילית)
          </text>
        </g>

        <line x1="20" y1="270" x2="700" y2="270" stroke={MECH_COLORS.bond} strokeWidth="1" strokeDasharray="4 4" />

        <text x="380" y="305" fontSize="13" fill={MECH_COLORS.atom} textAnchor="middle" fontWeight="700">
          שלב 2 - פרוטונציה ⇽ ההקטל הניטרלי הסופי
        </text>

        {/* ===== פאנל 3: מגיבים לשלב 2 - אלקוקסיד + H3O+ ===== */}
        <g fontFamily="inherit">
          <text x="90" y="365" fontSize="15" fontWeight="700" fill={MECH_COLORS.electrophileLeavingGroup} textAnchor="middle">O⁻</text>
          <circle cx="105" cy="350" r="2" fill={MECH_COLORS.electrophileLeavingGroup} />
          <line x1="90" y1="372" x2="90" y2="400" stroke={MECH_COLORS.bond} strokeWidth="2" />
          <text x="90" y="418" fontSize="14" fill={MECH_COLORS.atom} textAnchor="middle">C1 (בטבעת)</text>

          <text x="200" y="360" fontSize="17" fontWeight="700" fill={MECH_COLORS.atom} textAnchor="middle">H</text>
          <text x="214" y="343" fontSize="12" fontWeight="700" fill={MECH_COLORS.charge} textAnchor="middle">⁺</text>
          <text x="200" y="380" fontSize="10" fill={MECH_COLORS.atom} textAnchor="middle">(מ-H₃O⁺)</text>

          <path d="M108,352 Q150,325 190,352" fill="none" stroke={MECH_COLORS.arrow} strokeWidth="2.25" markerEnd="url(#arrow-hemiacetal)" />
        </g>

        <line x1="250" y1="360" x2="305" y2="360" stroke={MECH_COLORS.arrow} strokeWidth="2.5" markerEnd="url(#arrow-hemiacetal)" />

        {/* ===== פאנל 4: תוצר סופי - ההקטל הניטרלי ===== */}
        <g fontFamily="inherit">
          <text x="380" y="365" fontSize="15" fontWeight="700" fill={MECH_COLORS.atom} textAnchor="middle">OH</text>
          <line x1="380" y1="372" x2="380" y2="400" stroke={MECH_COLORS.bond} strokeWidth="2" />
          <text x="380" y="418" fontSize="14" fill={MECH_COLORS.atom} textAnchor="middle">C1 (הפחמן האנומרי)</text>
          <text x="380" y="450" fontSize="12" fill={MECH_COLORS.atom} textAnchor="middle" fontWeight="600">
            הקטל ניטרלי מוכן - α או β (מוטרוטציה)
          </text>
        </g>
      </svg>
    </MechanismArtFrame>
  );
}
