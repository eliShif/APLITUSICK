import { MechanismArtFrame, MECH_COLORS } from "./MechanismArtFrame";

export function AlphaCarbonArt() {
  return (
    <MechanismArtFrame
      title="יצירת אנולט - הסרת מימן אלפא על ידי בסיס"
      note="המימן האלפא חומצי יחסית (pKa~20) כי הבסיס המצומד (אנולט) מיוצב בתהודה - המטען השלילי מפוזר בין הפחמן לחמצן (כמו בקרבוקסילט, אבל פחות יציב כי חמצן אחד בלבד)."
    >
      <svg viewBox="0 0 720 235" className="w-full h-auto" style={{ minWidth: 560 }}>
        <defs>
          <marker id="arrow-enolate" viewBox="0 0 10 10" refX="8" refY="5" markerWidth="6" markerHeight="6" orient="auto-start-reverse">
            <path d="M0,0 L10,5 L0,10 z" fill={MECH_COLORS.arrow} />
          </marker>
        </defs>

        {/* ===== פאנל 1: מגיבים ===== */}
        <g fontFamily="inherit">
          {/* Base (nucleophile) with lone pair, above Hα */}
          <text x="170" y="20" fontSize="17" fontWeight="700" fill={MECH_COLORS.nucleophile} textAnchor="middle">Base</text>
          <text x="203" y="10" fontSize="13" fill={MECH_COLORS.nucleophile} textAnchor="middle">⁻</text>
          <circle cx="164" cy="33" r="2" fill={MECH_COLORS.nucleophile} />
          <circle cx="172" cy="33" r="2" fill={MECH_COLORS.nucleophile} />

          {/* arrow 1 (blue): Base lone pair -> Hα */}
          <path d="M168,36 Q193,55 172,76" fill="none" stroke={MECH_COLORS.nucleophile} strokeWidth="2.25" markerEnd="url(#arrow-enolate)" />

          {/* Hα atom + bond to Cα */}
          <text x="172" y="70" fontSize="15" fill={MECH_COLORS.atom} textAnchor="middle">Hα</text>
          <line x1="170" y1="136" x2="170" y2="82" stroke={MECH_COLORS.bond} strokeWidth="2" />

          {/* Cα atom */}
          <circle cx="170" cy="140" r="4" fill={MECH_COLORS.atom} />
          <text x="170" y="163" fontSize="15" fill={MECH_COLORS.atom} textAnchor="middle">Cα</text>

          {/* R substituent on Cα */}
          <line x1="166" y1="143" x2="125" y2="172" stroke={MECH_COLORS.bond} strokeWidth="2" />
          <text x="108" y="182" fontSize="15" fill={MECH_COLORS.atom} textAnchor="middle">R</text>

          {/* Cα - carbonyl C bond */}
          <line x1="174" y1="140" x2="246" y2="140" stroke={MECH_COLORS.bond} strokeWidth="2" />

          {/* arrow 2 (black): Cα-Hα bond electrons -> new Cα=C pi bond */}
          <path d="M172,110 Q205,92 222,126" fill="none" stroke={MECH_COLORS.arrow} strokeWidth="2.25" markerEnd="url(#arrow-enolate)" />

          {/* carbonyl carbon */}
          <circle cx="250" cy="140" r="4" fill={MECH_COLORS.atom} />
          <text x="250" y="163" fontSize="15" fill={MECH_COLORS.atom} textAnchor="middle">C</text>

          {/* C=O double bond */}
          <line x1="247" y1="134" x2="247" y2="75" stroke={MECH_COLORS.bond} strokeWidth="2" />
          <line x1="253" y1="134" x2="253" y2="75" stroke={MECH_COLORS.bond} strokeWidth="2" />
          <text x="250" y="62" fontSize="15" fill={MECH_COLORS.atom} textAnchor="middle">O</text>

          {/* arrow 3 (black): C=O pi bond -> O */}
          <path d="M247,98 Q267,80 253,65" fill="none" stroke={MECH_COLORS.arrow} strokeWidth="2.25" markerEnd="url(#arrow-enolate)" />

          {/* R' substituent on carbonyl carbon */}
          <line x1="254" y1="144" x2="293" y2="172" stroke={MECH_COLORS.bond} strokeWidth="2" />
          <text x="308" y="182" fontSize="14" fill={MECH_COLORS.atom} textAnchor="middle">R'</text>

          <text x="195" y="207" fontSize="13" fill={MECH_COLORS.atom} textAnchor="middle" fontWeight="600">מגיבים</text>
        </g>

        {/* arrow panel1 -> panel2 */}
        <line x1="330" y1="140" x2="400" y2="140" stroke={MECH_COLORS.arrow} strokeWidth="2.5" markerEnd="url(#arrow-enolate)" />

        {/* ===== פאנל 2: תוצרים - אנולט ===== */}
        <g fontFamily="inherit">
          {/* Base-H, separated */}
          <text x="530" y="25" fontSize="15" fill={MECH_COLORS.atom} textAnchor="middle" fontWeight="600">Base–H</text>

          {/* Cα atom (now sp2, part of new pi bond) */}
          <circle cx="530" cy="140" r="4" fill={MECH_COLORS.atom} />
          <text x="530" y="163" fontSize="15" fill={MECH_COLORS.atom} textAnchor="middle">Cα</text>

          {/* R substituent on Cα */}
          <line x1="526" y1="143" x2="485" y2="172" stroke={MECH_COLORS.bond} strokeWidth="2" />
          <text x="468" y="182" fontSize="15" fill={MECH_COLORS.atom} textAnchor="middle">R</text>

          {/* new Cα=C double bond */}
          <line x1="534" y1="136" x2="606" y2="136" stroke={MECH_COLORS.bond} strokeWidth="2" />
          <line x1="534" y1="144" x2="606" y2="144" stroke={MECH_COLORS.bond} strokeWidth="2" />

          {/* carbon atom (former carbonyl carbon) */}
          <circle cx="610" cy="140" r="4" fill={MECH_COLORS.atom} />
          <text x="610" y="163" fontSize="15" fill={MECH_COLORS.atom} textAnchor="middle">C</text>

          {/* C-O single bond now, charge on O */}
          <line x1="610" y1="134" x2="610" y2="75" stroke={MECH_COLORS.bond} strokeWidth="2" />
          <text x="610" y="62" fontSize="15" fill={MECH_COLORS.atom} textAnchor="middle">O</text>
          <text x="626" y="50" fontSize="13" fill={MECH_COLORS.charge} textAnchor="middle">⁻</text>

          {/* R' substituent on carbon */}
          <line x1="614" y1="144" x2="653" y2="172" stroke={MECH_COLORS.bond} strokeWidth="2" />
          <text x="668" y="182" fontSize="14" fill={MECH_COLORS.atom} textAnchor="middle">R'</text>

          <text x="560" y="207" fontSize="13" fill={MECH_COLORS.atom} textAnchor="middle" fontWeight="600">תוצרים - אנולט</text>
          <text x="560" y="222" fontSize="12" fill={MECH_COLORS.atom} textAnchor="middle">(מיוצב בתהודה בין הפחמן לחמצן)</text>
        </g>
      </svg>
    </MechanismArtFrame>
  );
}
