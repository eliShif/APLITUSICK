import { MechanismArtFrame, MECH_COLORS } from "./MechanismArtFrame";

/**
 * המנגנון המלא של דהידרציה חומצית (E1) של אלכוהול - שלושה שלבים:
 * 1) פרוטונציה של ה-OH (הופך לקבוצה עוזבת טובה).
 * 2) עזיבת המים ⇽ קרבוקטיון.
 * 3) בסיס מסיר מימן בטא ⇽ אלקן.
 */
export function AlcoholsThiolsArt() {
  return (
    <MechanismArtFrame
      title="המנגנון המלא: דהידרציה חומצית (E1) - פרוטונציה, קרבוקטיון ואלקן"
      note="שלב 1: זוג בודד על החמצן תוקף H⁺ ⇽ אוקסוניום. שלב 2: קשר C-O נשבר, המים (קבוצה עוזבת מצוינת עכשיו) עוזבים ⇽ קרבוקטיון שטוח. שלב 3: בסיס חלש (כמו מולקולת מים נוספת) מסיר מימן על הפחמן השכן (בטא), זוג האלקטרונים של אותו קשר C-H יוצר קשר פי חדש - מתקבל האלקן."
    >
      <svg viewBox="0 0 720 620" className="w-full h-auto" style={{ minWidth: 540 }}>
        <defs>
          <marker id="arrow-oh-protonation" viewBox="0 0 10 10" refX="8" refY="5" markerWidth="6" markerHeight="6" orient="auto-start-reverse">
            <path d="M0,0 L10,5 L0,10 z" fill={MECH_COLORS.arrow} />
          </marker>
        </defs>

        <text x="360" y="20" fontSize="13" fill={MECH_COLORS.atom} textAnchor="middle" fontWeight="700">
          שלב 1 - פרוטונציה
        </text>

        {/* ===== פאנל 1: מגיבים - R-O-H + H+ ===== */}
        <g fontFamily="inherit">
          <text x="55" y="110" fontSize="17" fontWeight="700" fill={MECH_COLORS.atom} textAnchor="middle">R</text>
          <line x1="72" y1="105" x2="118" y2="105" stroke={MECH_COLORS.bond} strokeWidth="2" />
          <circle cx="122" cy="105" r="4" fill={MECH_COLORS.atom} />
          <text x="122" y="127" fontSize="14" fill={MECH_COLORS.atom} textAnchor="middle">O</text>
          <line x1="122" y1="105" x2="122" y2="140" stroke={MECH_COLORS.bond} strokeWidth="2" />
          <text x="122" y="155" fontSize="14" fill={MECH_COLORS.atom} textAnchor="middle">H</text>
          <circle cx="134" cy="86" r="2" fill={MECH_COLORS.nucleophile} />
          <circle cx="141" cy="91" r="2" fill={MECH_COLORS.nucleophile} />
          <text x="175" y="110" fontSize="18" fill={MECH_COLORS.atom} textAnchor="middle">+</text>
          <text x="210" y="110" fontSize="17" fontWeight="700" fill={MECH_COLORS.electrophileLeavingGroup} textAnchor="middle">H</text>
          <text x="222" y="93" fontSize="12" fontWeight="700" fill={MECH_COLORS.charge} textAnchor="middle">⁺</text>
          <path d="M138,88 Q170,68 205,100" fill="none" stroke={MECH_COLORS.arrow} strokeWidth="2" markerEnd="url(#arrow-oh-protonation)" />
        </g>

        <line x1="260" y1="108" x2="315" y2="108" stroke={MECH_COLORS.arrow} strokeWidth="2.5" markerEnd="url(#arrow-oh-protonation)" />

        {/* ===== פאנל 2: תוצר שלב 1 - אוקסוניום R-OH2+ ===== */}
        <g fontFamily="inherit">
          <text x="365" y="110" fontSize="17" fontWeight="700" fill={MECH_COLORS.atom} textAnchor="middle">R</text>
          <line x1="382" y1="105" x2="428" y2="105" stroke={MECH_COLORS.bond} strokeWidth="2" />
          <circle cx="432" cy="105" r="4" fill={MECH_COLORS.atom} />
          <text x="452" y="90" fontSize="14" fontWeight="700" fill={MECH_COLORS.charge} textAnchor="middle">⁺</text>
          <line x1="432" y1="105" x2="432" y2="140" stroke={MECH_COLORS.bond} strokeWidth="2" />
          <text x="432" y="155" fontSize="14" fill={MECH_COLORS.atom} textAnchor="middle">H</text>
          <line x1="432" y1="105" x2="470" y2="80" stroke={MECH_COLORS.bond} strokeWidth="2" />
          <text x="482" y="72" fontSize="14" fill={MECH_COLORS.atom} textAnchor="middle">H</text>
          <text x="500" y="115" fontSize="11" fill={MECH_COLORS.atom} textAnchor="middle">(אוקסוניום)</text>
        </g>

        <line x1="20" y1="185" x2="700" y2="185" stroke={MECH_COLORS.bond} strokeWidth="1" strokeDasharray="4 4" />

        <text x="360" y="220" fontSize="13" fill={MECH_COLORS.atom} textAnchor="middle" fontWeight="700">
          שלב 2 - עזיבת המים ⇽ קרבוקטיון
        </text>

        {/* ===== פאנל 3: מגיבים לשלב 2 - R-OH2+ שוב ===== */}
        <g fontFamily="inherit">
          <text x="80" y="290" fontSize="17" fontWeight="700" fill={MECH_COLORS.atom} textAnchor="middle">Cα</text>
          <line x1="100" y1="285" x2="146" y2="285" stroke={MECH_COLORS.bond} strokeWidth="2" />
          <circle cx="150" cy="285" r="4" fill={MECH_COLORS.electrophileLeavingGroup} />
          <text x="150" y="265" fontSize="14" fontWeight="700" fill={MECH_COLORS.electrophileLeavingGroup} textAnchor="middle">OH₂⁺</text>
          <path d="M118,283 Q135,255 148,278" fill="none" stroke={MECH_COLORS.arrow} strokeWidth="2.25" markerEnd="url(#arrow-oh-protonation)" />
        </g>

        <line x1="230" y1="285" x2="285" y2="285" stroke={MECH_COLORS.arrow} strokeWidth="2.5" markerEnd="url(#arrow-oh-protonation)" />

        {/* ===== פאנל 4: תוצר שלב 2 - קרבוקטיון שטוח + H2O ===== */}
        <g fontFamily="inherit">
          <text x="360" y="290" fontSize="17" fontWeight="700" fill={MECH_COLORS.atom} textAnchor="middle">Cα⁺</text>
          <line x1="330" y1="295" x2="305" y2="270" stroke={MECH_COLORS.bond} strokeWidth="1.5" />
          <line x1="390" y1="295" x2="415" y2="270" stroke={MECH_COLORS.bond} strokeWidth="1.5" />
          <text x="440" y="290" fontSize="15" fill={MECH_COLORS.atom} textAnchor="middle">+</text>
          <text x="480" y="290" fontSize="16" fill={MECH_COLORS.atom} textAnchor="middle">H₂O</text>
          <text x="380" y="330" fontSize="11" fill={MECH_COLORS.atom} textAnchor="middle">(שטוח, sp2 - אלקטרופיל חסר-סבלנות)</text>
        </g>

        <line x1="20" y1="365" x2="700" y2="365" stroke={MECH_COLORS.bond} strokeWidth="1" strokeDasharray="4 4" />

        <text x="360" y="400" fontSize="13" fill={MECH_COLORS.atom} textAnchor="middle" fontWeight="700">
          שלב 3 - בסיס מסיר Hβ ⇽ אלקן
        </text>

        {/* ===== פאנל 5: מגיבים לשלב 3 - בסיס + קרבוקטיון (עם Cβ-Hβ שכן) ===== */}
        <g fontFamily="inherit">
          <text x="75" y="440" fontSize="16" fontWeight="700" fill={MECH_COLORS.nucleophile} textAnchor="middle">Base</text>
          <circle cx="95" cy="452" r="2" fill={MECH_COLORS.nucleophile} />
          <circle cx="102" cy="457" r="2" fill={MECH_COLORS.nucleophile} />
          <text x="120" y="475" fontSize="15" fill={MECH_COLORS.atom} textAnchor="middle">Hβ</text>
          <line x1="120" y1="480" x2="120" y2="500" stroke={MECH_COLORS.bond} strokeWidth="2" />
          <text x="120" y="518" fontSize="15" fill={MECH_COLORS.atom} textAnchor="middle">Cβ</text>
          <line x1="140" y1="512" x2="185" y2="500" stroke={MECH_COLORS.bond} strokeWidth="2" />
          <text x="200" y="500" fontSize="15" fontWeight="700" fill={MECH_COLORS.atom} textAnchor="middle">Cα⁺</text>
          <path d="M100,455 Q108,470 118,483" fill="none" stroke={MECH_COLORS.arrow} strokeWidth="2.25" markerEnd="url(#arrow-oh-protonation)" />
          <path d="M120,495 Q155,478 190,495" fill="none" stroke={MECH_COLORS.arrow} strokeWidth="2.25" markerEnd="url(#arrow-oh-protonation)" />
        </g>

        <line x1="250" y1="495" x2="305" y2="495" stroke={MECH_COLORS.arrow} strokeWidth="2.5" markerEnd="url(#arrow-oh-protonation)" />

        {/* ===== פאנל 6: תוצר סופי - אלקן + Base-H ===== */}
        <g fontFamily="inherit">
          <text x="350" y="450" fontSize="15" fill={MECH_COLORS.nucleophile} textAnchor="middle">Base</text>
          <line x1="350" y1="455" x2="350" y2="480" stroke={MECH_COLORS.bond} strokeWidth="2" />
          <text x="350" y="495" fontSize="14" fill={MECH_COLORS.atom} textAnchor="middle">H</text>

          <text x="430" y="530" fontSize="15" fill={MECH_COLORS.atom} textAnchor="middle">Cβ</text>
          <line x1="450" y1="524" x2="500" y2="524" stroke={MECH_COLORS.bond} strokeWidth="2" />
          <line x1="450" y1="530" x2="500" y2="530" stroke={MECH_COLORS.bond} strokeWidth="2" />
          <text x="515" y="530" fontSize="15" fill={MECH_COLORS.atom} textAnchor="middle">Cα</text>
          <text x="470" y="560" fontSize="12" fill={MECH_COLORS.atom} textAnchor="middle">האלקן (תוצר, לרוב לפי כלל זייצב)</text>
        </g>
      </svg>
    </MechanismArtFrame>
  );
}
