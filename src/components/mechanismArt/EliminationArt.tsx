import { MechanismArtFrame, MECH_COLORS } from "./MechanismArtFrame";

export function EliminationArt() {
  return (
    <MechanismArtFrame
      title="מנגנון E2 - אלימינציה חד-שלבית (Anti-periplanar)"
      note="שלושת החצים קורים בו-זמנית, באותו מצב מעבר יחיד: הבסיס (כחול) תוקף ומסיר את המימן הבטא (Hβ); זוג האלקטרונים של הקשר Cβ-Hβ 'נודד' ויוצר קשר π חדש בין Cβ ל-Cα; ובאותו רגע ממש זוג האלקטרונים של הקשר Cα-LG עוזב אל הקבוצה הפורשת (ענבר). מכיוון שהכל קורה יחד, נדרשת חפיפת מסלולים מיטבית - ולכן חייבת להתקיים גיאומטריה אנטי-פריפלנרית (ה-Hβ וה-LG במישור אחד, בזווית דיהדרלית 180°)."
    >
      <svg viewBox="0 0 760 230" className="w-full h-auto" style={{ minWidth: 600 }}>
        <defs>
          <marker id="arrow-e2" viewBox="0 0 10 10" refX="8" refY="5" markerWidth="6" markerHeight="6" orient="auto-start-reverse">
            <path d="M0,0 L10,5 L0,10 z" fill={MECH_COLORS.arrow} />
          </marker>
        </defs>

        {/* ===== פאנל 1: מגיבים ===== */}
        <g fontFamily="inherit">
          <text x="95" y="30" fontSize="16" fontWeight="700" fill={MECH_COLORS.nucleophile} textAnchor="middle">Base</text>
          <text x="120" y="20" fontSize="12" fill={MECH_COLORS.nucleophile} textAnchor="middle">⁻</text>
          <circle cx="88" cy="42" r="2" fill={MECH_COLORS.nucleophile} />
          <circle cx="96" cy="42" r="2" fill={MECH_COLORS.nucleophile} />

          <text x="95" y="95" fontSize="15" fill={MECH_COLORS.atom} textAnchor="middle">Hβ</text>
          <line x1="95" y1="100" x2="95" y2="133" stroke={MECH_COLORS.bond} strokeWidth="2" />

          <circle cx="95" cy="143" r="4" fill={MECH_COLORS.atom} />
          <text x="95" y="163" fontSize="15" fill={MECH_COLORS.atom} textAnchor="middle">Cβ</text>

          <line x1="101" y1="143" x2="179" y2="143" stroke={MECH_COLORS.bond} strokeWidth="2" />

          <circle cx="185" cy="143" r="4" fill={MECH_COLORS.atom} />
          <text x="185" y="163" fontSize="15" fill={MECH_COLORS.atom} textAnchor="middle">Cα</text>

          <line x1="191" y1="143" x2="239" y2="143" stroke={MECH_COLORS.bond} strokeWidth="2" />

          <text x="262" y="148" fontSize="17" fontWeight="700" fill={MECH_COLORS.electrophileLeavingGroup} textAnchor="middle">LG</text>

          {/* חץ 1: זוג בודד של הבסיס תוקף את Hβ */}
          <path d="M90,46 Q118,62 97,86" fill="none" stroke={MECH_COLORS.arrow} strokeWidth="2.25" markerEnd="url(#arrow-e2)" />
          {/* חץ 2: זוג האלקטרונים מהקשר Cβ-Hβ יוצר קשר פי בין Cβ ל-Cα */}
          <path d="M95,120 Q118,100 142,128" fill="none" stroke={MECH_COLORS.arrow} strokeWidth="2.25" markerEnd="url(#arrow-e2)" />
          {/* חץ 3: זוג האלקטרונים מהקשר Cα-LG עוזב אל הקבוצה הפורשת */}
          <path d="M215,143 Q228,118 250,133" fill="none" stroke={MECH_COLORS.arrow} strokeWidth="2.25" markerEnd="url(#arrow-e2)" />

          <text x="170" y="205" fontSize="13" fill={MECH_COLORS.atom} textAnchor="middle" fontWeight="600">מגיבים</text>
        </g>

        {/* ===== חץ תגובה ===== */}
        <line x1="330" y1="143" x2="400" y2="143" stroke={MECH_COLORS.arrow} strokeWidth="2.5" markerEnd="url(#arrow-e2)" />

        {/* ===== פאנל 2: תוצרים ===== */}
        <g fontFamily="inherit">
          <text x="460" y="70" fontSize="16" fontWeight="700" fill={MECH_COLORS.nucleophile} textAnchor="middle">Base–H</text>

          <circle cx="520" cy="143" r="4" fill={MECH_COLORS.atom} />
          <text x="520" y="163" fontSize="15" fill={MECH_COLORS.atom} textAnchor="middle">Cβ</text>

          <line x1="526" y1="140" x2="584" y2="140" stroke={MECH_COLORS.bond} strokeWidth="2" />
          <line x1="526" y1="146" x2="584" y2="146" stroke={MECH_COLORS.bond} strokeWidth="2" />

          <circle cx="590" cy="143" r="4" fill={MECH_COLORS.atom} />
          <text x="590" y="163" fontSize="15" fill={MECH_COLORS.atom} textAnchor="middle">Cα</text>

          <text x="660" y="148" fontSize="17" fontWeight="700" fill={MECH_COLORS.electrophileLeavingGroup} textAnchor="middle">LG</text>
          <text x="678" y="133" fontSize="13" fill={MECH_COLORS.electrophileLeavingGroup} textAnchor="middle">⁻</text>

          <text x="560" y="205" fontSize="13" fill={MECH_COLORS.atom} textAnchor="middle" fontWeight="600">תוצרים - אלקן + Base–H + LG⁻</text>
        </g>
      </svg>
    </MechanismArtFrame>
  );
}
