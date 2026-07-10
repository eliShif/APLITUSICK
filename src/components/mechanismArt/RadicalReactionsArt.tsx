import { MechanismArtFrame, MECH_COLORS } from "./MechanismArtFrame";

/**
 * המנגנון המלא של שרשרת רדיקלית - שלושת סוגי השלבים ברצף אחד: אתחול, שני שלבי
 * ההתפשטות (שיחד מהווים את מחזור השרשרת החוזר), וסיום. כל שלב מצויר עם חצי
 * fishhook אמיתיים (ראש-חצי, אלקטרון בודד) - לא רק תיאור טקסטואלי.
 */
export function RadicalReactionsArt() {
  return (
    <MechanismArtFrame
      title="המנגנון המלא: הלוגנציה רדיקלית - אתחול, שני שלבי התפשטות וסיום"
      note="החץ בעל ראש-חצי בלבד (fishhook) מסמן תנועה של אלקטרון בודד אחד - לא זוג! - בניגוד לחץ הכפול (ראש חץ מלא) של מנגנוני יונים כמו SN2. שני שלבי ההתפשטות (2+3) חוזרים על עצמם שוב ושוב במחזור השרשרת - רדיקל ה-X שנוצר בשלב 3 חוזר להתחיל שלב 2 מחדש על מולקולת R-H נוספת."
    >
      <svg viewBox="0 0 720 620" className="w-full h-auto" style={{ minWidth: 520 }}>
        <defs>
          <marker id="arrow-radical" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="7" markerHeight="7" orient="auto-start-reverse">
            <path d="M0,5 L10,5 L0,0 z" fill={MECH_COLORS.arrow} />
          </marker>
          <marker id="arrow-radical-straight" viewBox="0 0 10 10" refX="8" refY="5" markerWidth="6" markerHeight="6" orient="auto-start-reverse">
            <path d="M0,0 L10,5 L0,10 z" fill={MECH_COLORS.arrow} />
          </marker>
        </defs>

        {/* ===== שלב 1: אתחול - שבירה הומוליטית של X2 ===== */}
        <g fontFamily="inherit">
          <text x="360" y="22" fontSize="13" fill={MECH_COLORS.atom} textAnchor="middle" fontWeight="700">
            שלב 1 - אתחול (Initiation)
          </text>
          <text x="130" y="70" fontSize="17" fontWeight="700" fill={MECH_COLORS.electrophileLeavingGroup} textAnchor="middle">X</text>
          <line x1="145" y1="65" x2="185" y2="65" stroke={MECH_COLORS.bond} strokeWidth="2" />
          <text x="200" y="70" fontSize="17" fontWeight="700" fill={MECH_COLORS.electrophileLeavingGroup} textAnchor="middle">X</text>
          <circle cx="158" cy="65" r="2.5" fill={MECH_COLORS.charge} />
          <circle cx="172" cy="65" r="2.5" fill={MECH_COLORS.charge} />
          <path d="M158,65 Q145,40 130,55" fill="none" stroke={MECH_COLORS.arrow} strokeWidth="2" markerEnd="url(#arrow-radical)" />
          <path d="M172,65 Q185,40 200,55" fill="none" stroke={MECH_COLORS.arrow} strokeWidth="2" markerEnd="url(#arrow-radical)" />
          <text x="165" y="100" fontSize="12" fill={MECH_COLORS.atom} textAnchor="middle">hν / חום</text>

          <line x1="270" y1="65" x2="330" y2="65" stroke={MECH_COLORS.arrow} strokeWidth="2.5" markerEnd="url(#arrow-radical-straight)" />

          <text x="400" y="70" fontSize="17" fontWeight="700" fill={MECH_COLORS.electrophileLeavingGroup} textAnchor="middle">X</text>
          <circle cx="408" cy="55" r="2.5" fill={MECH_COLORS.charge} />
          <text x="480" y="70" fontSize="17" fontWeight="700" fill={MECH_COLORS.electrophileLeavingGroup} textAnchor="middle">X</text>
          <circle cx="472" cy="55" r="2.5" fill={MECH_COLORS.charge} />
          <text x="440" y="70" fontSize="15" fill={MECH_COLORS.atom} textAnchor="middle">+</text>

          <text x="330" y="130" fontSize="13" fill={MECH_COLORS.atom} textAnchor="middle" fontWeight="600">
            X-X נשבר הומוליטית ⇽ שני רדיקלי הלוגן ראשונים
          </text>
        </g>

        <line x1="20" y1="160" x2="700" y2="160" stroke={MECH_COLORS.bond} strokeWidth="1" strokeDasharray="4 4" />

        {/* ===== שלב 2: התפשטות א' - הסטת מימן ===== */}
        <g fontFamily="inherit">
          <text x="360" y="195" fontSize="13" fill={MECH_COLORS.atom} textAnchor="middle" fontWeight="700">
            שלב 2 - התפשטות א' (Propagation): •X + R-H → R• + H-X
          </text>

          <text x="70" y="240" fontSize="17" fontWeight="700" fill={MECH_COLORS.atom} textAnchor="middle">R</text>
          <line x1="90" y1="235" x2="175" y2="235" stroke={MECH_COLORS.bond} strokeWidth="2" />
          <text x="195" y="240" fontSize="17" fontWeight="700" fill={MECH_COLORS.atom} textAnchor="middle">H</text>
          <circle cx="165" cy="227" r="2.5" fill={MECH_COLORS.charge} />
          <text x="270" y="240" fontSize="17" fontWeight="700" fill={MECH_COLORS.electrophileLeavingGroup} textAnchor="middle">X</text>
          <circle cx="258" cy="220" r="2.5" fill={MECH_COLORS.charge} />
          <path d="M165,227 Q205,187 250,218" fill="none" stroke={MECH_COLORS.arrow} strokeWidth="2.25" markerEnd="url(#arrow-radical)" />
          <text x="180" y="270" fontSize="12" fill={MECH_COLORS.atom} textAnchor="middle">R-H + •X</text>

          <line x1="330" y1="235" x2="400" y2="235" stroke={MECH_COLORS.arrow} strokeWidth="2.5" markerEnd="url(#arrow-radical-straight)" />

          <text x="460" y="240" fontSize="17" fontWeight="700" fill={MECH_COLORS.atom} textAnchor="middle">R</text>
          <circle cx="478" cy="222" r="2.5" fill={MECH_COLORS.charge} />
          <text x="545" y="240" fontSize="17" fontWeight="700" fill={MECH_COLORS.atom} textAnchor="middle">H</text>
          <line x1="560" y1="235" x2="625" y2="235" stroke={MECH_COLORS.bond} strokeWidth="2" />
          <text x="645" y="240" fontSize="17" fontWeight="700" fill={MECH_COLORS.electrophileLeavingGroup} textAnchor="middle">X</text>
          <text x="555" y="270" fontSize="12" fill={MECH_COLORS.atom} textAnchor="middle">•R + H-X</text>
        </g>

        <line x1="20" y1="300" x2="700" y2="300" stroke={MECH_COLORS.bond} strokeWidth="1" strokeDasharray="4 4" />

        {/* ===== שלב 3: התפשטות ב' - תקיפת X2 ===== */}
        <g fontFamily="inherit">
          <text x="360" y="335" fontSize="13" fill={MECH_COLORS.atom} textAnchor="middle" fontWeight="700">
            שלב 3 - התפשטות ב' (Propagation): R• + X-X → R-X + X•
          </text>

          <text x="70" y="380" fontSize="17" fontWeight="700" fill={MECH_COLORS.atom} textAnchor="middle">R</text>
          <circle cx="88" cy="362" r="2.5" fill={MECH_COLORS.charge} />
          <text x="180" y="380" fontSize="17" fontWeight="700" fill={MECH_COLORS.electrophileLeavingGroup} textAnchor="middle">X</text>
          <line x1="195" y1="375" x2="235" y2="375" stroke={MECH_COLORS.bond} strokeWidth="2" />
          <text x="250" y="380" fontSize="17" fontWeight="700" fill={MECH_COLORS.electrophileLeavingGroup} textAnchor="middle">X</text>
          <circle cx="208" cy="375" r="2.5" fill={MECH_COLORS.charge} />
          <path d="M88,362 Q135,340 172,368" fill="none" stroke={MECH_COLORS.arrow} strokeWidth="2.25" markerEnd="url(#arrow-radical)" />
          <path d="M208,375 Q222,350 245,362" fill="none" stroke={MECH_COLORS.arrow} strokeWidth="2.25" markerEnd="url(#arrow-radical)" />
          <text x="160" y="410" fontSize="12" fill={MECH_COLORS.atom} textAnchor="middle">•R + X-X</text>

          <line x1="330" y1="375" x2="400" y2="375" stroke={MECH_COLORS.arrow} strokeWidth="2.5" markerEnd="url(#arrow-radical-straight)" />

          <text x="460" y="380" fontSize="17" fontWeight="700" fill={MECH_COLORS.atom} textAnchor="middle">R</text>
          <line x1="475" y1="375" x2="515" y2="375" stroke={MECH_COLORS.bond} strokeWidth="2" />
          <text x="530" y="380" fontSize="17" fontWeight="700" fill={MECH_COLORS.electrophileLeavingGroup} textAnchor="middle">X</text>
          <text x="620" y="380" fontSize="17" fontWeight="700" fill={MECH_COLORS.electrophileLeavingGroup} textAnchor="middle">X</text>
          <circle cx="612" cy="362" r="2.5" fill={MECH_COLORS.charge} />
          <text x="545" y="410" fontSize="12" fill={MECH_COLORS.atom} textAnchor="middle">R-X + •X (חוזר לשלב 2)</text>
        </g>

        <line x1="20" y1="440" x2="700" y2="440" stroke={MECH_COLORS.bond} strokeWidth="1" strokeDasharray="4 4" />

        {/* ===== שלב 4: סיום ===== */}
        <g fontFamily="inherit">
          <text x="360" y="475" fontSize="13" fill={MECH_COLORS.atom} textAnchor="middle" fontWeight="700">
            שלב 4 - סיום (Termination): שני רדיקלים כלשהם מתלכדים
          </text>

          <text x="140" y="520" fontSize="17" fontWeight="700" fill={MECH_COLORS.atom} textAnchor="middle">R</text>
          <circle cx="158" cy="502" r="2.5" fill={MECH_COLORS.charge} />
          <text x="230" y="520" fontSize="15" fill={MECH_COLORS.atom} textAnchor="middle">+</text>
          <text x="300" y="520" fontSize="17" fontWeight="700" fill={MECH_COLORS.atom} textAnchor="middle">R</text>
          <circle cx="282" cy="502" r="2.5" fill={MECH_COLORS.charge} />
          <path d="M158,502 Q220,478 282,502" fill="none" stroke={MECH_COLORS.arrow} strokeWidth="2.25" markerEnd="url(#arrow-radical)" />

          <line x1="360" y1="515" x2="420" y2="515" stroke={MECH_COLORS.arrow} strokeWidth="2.5" markerEnd="url(#arrow-radical-straight)" />

          <text x="480" y="520" fontSize="17" fontWeight="700" fill={MECH_COLORS.atom} textAnchor="middle">R</text>
          <line x1="495" y1="515" x2="545" y2="515" stroke={MECH_COLORS.bond} strokeWidth="2" />
          <text x="560" y="520" fontSize="17" fontWeight="700" fill={MECH_COLORS.atom} textAnchor="middle">R</text>
          <text x="520" y="550" fontSize="12" fill={MECH_COLORS.atom} textAnchor="middle">קשר קוולנטי יציב - השרשרת נעצרת</text>
          <text x="520" y="568" fontSize="11" fill="#9ca3af" textAnchor="middle">(באותו אופן: X+X או R+X מתלכדים)</text>
        </g>
      </svg>
    </MechanismArtFrame>
  );
}
