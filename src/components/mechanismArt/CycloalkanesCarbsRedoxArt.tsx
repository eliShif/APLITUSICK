import { MechanismArtFrame, MECH_COLORS } from "./MechanismArtFrame";

/**
 * היווצרות הקטל התוך-מולקולרי (הטבעת המחזורית) של גלוקוז.
 * גרסה תוך-מולקולרית של תוספת נוקלאופילית לקרבוניל: החמצן הרחוק (על C5, מקוצר כאן ל-"HO")
 * תוקף את פחמן הקרבוניל (C1, האלדהיד) בתוך אותה מולקולה, ויוצר טבעת פיראנוז עם פחמן אנומרי חדש.
 * מבנה קבוע: פאנל מגיבים (עם חצים מקווקווים) ← חץ תגובה ← פאנל תוצרים.
 */
export function CycloalkanesCarbsRedoxArt() {
  return (
    <MechanismArtFrame
      title="היווצרות הקטל טבעתי - הצורה המחזורית של גלוקוז"
      note="זו תוספת נוקלאופילית תוך-מולקולרית (רגילה לגמרי מבחינת סוג הצעדים, בדיוק כמו תוספת לקרבוניל) - החמצן הרחוק (על C5) תוקף את פחמן הקרבוניל (C1). התוצר הוא פחמן אנומרי חדש (C1) שיכול להיות אלפא או בטא, ולכן נוצרת תערובת (מוטרוטציה)."
    >
      <svg viewBox="0 0 760 260" className="w-full h-auto" style={{ minWidth: 620 }}>
        <defs>
          <marker id="arrow-hemiacetal" viewBox="0 0 10 10" refX="8" refY="5" markerWidth="6" markerHeight="6" orient="auto-start-reverse">
            <path d="M0,0 L10,5 L0,10 z" fill={MECH_COLORS.arrow} />
          </marker>
        </defs>

        {/* ===== פאנל 1: מגיבים - הצורה הפתוחה ===== */}
        <g fontFamily="inherit">
          {/* החמצן הרחוק (על C5), מקוצר ל-HO, עם זוג בודד */}
          <text x="48" y="158" fontSize="17" fontWeight="700" fill={MECH_COLORS.nucleophile} textAnchor="middle">HO</text>
          <circle cx="64" cy="138" r="2" fill={MECH_COLORS.nucleophile} />
          <circle cx="72" cy="138" r="2" fill={MECH_COLORS.nucleophile} />

          {/* שאר השרשרת (C2-C4), מקוצרת */}
          <line x1="86" y1="150" x2="116" y2="150" stroke={MECH_COLORS.bond} strokeWidth="2" />
          <text x="140" y="155" fontSize="20" fontWeight="700" fill={MECH_COLORS.atom} textAnchor="middle">···</text>
          <line x1="164" y1="150" x2="194" y2="150" stroke={MECH_COLORS.bond} strokeWidth="2" />

          {/* פחמן הקרבוניל C1 */}
          <circle cx="200" cy="150" r="4" fill={MECH_COLORS.atom} />
          <text x="200" y="174" fontSize="15" fill={MECH_COLORS.atom} textAnchor="middle">C1</text>

          {/* H על הקרבוניל (אלדהיד) */}
          <line x1="203" y1="153" x2="228" y2="170" stroke={MECH_COLORS.bond} strokeWidth="2" />
          <text x="236" y="177" fontSize="14" fill={MECH_COLORS.atom} textAnchor="middle">H</text>

          {/* קשר כפול C1=O */}
          <line x1="196" y1="146" x2="196" y2="100" stroke={MECH_COLORS.bond} strokeWidth="2" />
          <line x1="204" y1="146" x2="204" y2="100" stroke={MECH_COLORS.bond} strokeWidth="2" />
          <text x="200" y="86" fontSize="15" fill={MECH_COLORS.atom} textAnchor="middle">O</text>

          {/* חץ 1: זוג בודד של ה-HO תוקף תוך-מולקולרית את C1 - חץ ארוך שמדלג מעל השרשרת */}
          <path
            d="M69,133 Q140,14 197,142"
            fill="none"
            stroke={MECH_COLORS.arrow}
            strokeWidth="2.25"
            markerEnd="url(#arrow-hemiacetal)"
          />
          {/* חץ 2: זוג האלקטרונים של C1=O נודד אל החמצן */}
          <path
            d="M203,132 Q226,108 206,90"
            fill="none"
            stroke={MECH_COLORS.arrow}
            strokeWidth="2.25"
            markerEnd="url(#arrow-hemiacetal)"
          />

          <text x="150" y="232" fontSize="13" fill={MECH_COLORS.atom} textAnchor="middle" fontWeight="600">
            מגיבים - הצורה הפתוחה
          </text>
        </g>

        {/* ===== חץ תגובה ===== */}
        <line x1="330" y1="150" x2="400" y2="150" stroke={MECH_COLORS.arrow} strokeWidth="2.5" markerEnd="url(#arrow-hemiacetal)" />

        {/* ===== פאנל 2: תוצרים - הקטל הטבעתי (פיראנוז) ===== */}
        <g fontFamily="inherit">
          <polygon
            points="560,102 518.4,126 518.4,174 560,198 601.6,174 601.6,126"
            fill="none"
            stroke={MECH_COLORS.bond}
            strokeWidth="2"
          />

          {/* החמצן הטבעתי (מ-C5 לשעבר) */}
          <circle cx="601.6" cy="126" r="3" fill={MECH_COLORS.nucleophile} />
          <text x="624" y="120" fontSize="15" fontWeight="700" fill={MECH_COLORS.nucleophile} textAnchor="middle">O</text>

          {/* הפחמן האנומרי - C1 */}
          <circle cx="560" cy="102" r="4" fill={MECH_COLORS.atom} />
          <text x="560" y="82" fontSize="15" fill={MECH_COLORS.atom} textAnchor="middle">C1</text>

          {/* קבוצת OH היוצאת מהפחמן האנומרי */}
          <line x1="563" y1="97" x2="589" y2="68" stroke={MECH_COLORS.bond} strokeWidth="2" />
          <text x="602" y="60" fontSize="15" fontWeight="700" fill={MECH_COLORS.atom} textAnchor="middle">OH</text>
          <text x="602" y="76" fontSize="10" fill={MECH_COLORS.atom} textAnchor="middle" opacity="0.65">(או O⁻)</text>

          <text x="560" y="232" fontSize="13" fill={MECH_COLORS.atom} textAnchor="middle" fontWeight="600">
            תוצרים - פחמן אנומרי חדש (α/β)
          </text>
        </g>
      </svg>
    </MechanismArtFrame>
  );
}
