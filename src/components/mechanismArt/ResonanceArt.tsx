import { MechanismArtFrame, MECH_COLORS } from "./MechanismArtFrame";

/**
 * תרשים רזוננס (Resonance) - יון קרבוקסילט (RCOO⁻).
 * חשוב: זו לא תגובה של מגיבים→תוצרים! זו אותה מולקולה בדיוק, מתוארת בשני מבני
 * לואיס שונים (מבני רזוננס) המחוברים בחץ רזוננס דו-ראשי (↔), לא בחץ תגובה חד-כיווני.
 * פאנל 1 (עם 2 חצים מקווקווים) מראה כיצד "עוברים" למבנה 2: זוג בודד על ה-O⁻
 * הופך לקשר פי חדש, ובמקביל קשר הפי הקיים C=O הופך לזוג בודד על החמצן השני.
 */
export function ResonanceArt() {
  const OFFSET_X = 490;

  return (
    <MechanismArtFrame
      title="רזוננס של קרבוקסילט - שני מבני רזוננס שקולים"
      note="שימו לב: זו לא תגובה כימית! זו אותה מולקולה בדיוק (יון קרבוקסילט) - רק מיקום האטומים קבוע, ומה שמשתנה בין שני הציורים הוא מיקום האלקטרונים בלבד. חץ הרזוננס (↔, ראש כפול) מבטא זאת, בניגוד לחץ תגובה חד-כיווני. המבנה ה'אמיתי' של המולקולה הוא ההיברידיזציה של שני המבנים - המטען השלילי מפוזר שווה בשווה על שני החמצנים, ולכן קרבוקסילט יציב כל כך ולכן חומצה קרבוקסילית חומצית בהרבה יותר מאלכוהול מקביל."
    >
      <svg viewBox="0 0 760 230" className="w-full h-auto" style={{ minWidth: 620 }}>
        <defs>
          <marker id="arrow-resonance" viewBox="0 0 10 10" refX="8" refY="5" markerWidth="6" markerHeight="6" orient="auto-start-reverse">
            <path d="M0,0 L10,5 L0,10 z" fill={MECH_COLORS.arrow} />
          </marker>
        </defs>

        {/* ---------- פאנל 1: מבנה רזוננס א' (עם החצים המקווקווים) ---------- */}
        <g fontFamily="inherit">
          {/* R - קשר לפחמן */}
          <line x1="60" y1="120" x2="126" y2="120" stroke={MECH_COLORS.bond} strokeWidth="2" />
          <text x="50" y="125" fontSize="17" fontWeight="700" fill={MECH_COLORS.atom} textAnchor="middle">R</text>

          {/* פחמן מרכזי */}
          <circle cx="130" cy="120" r="4" fill={MECH_COLORS.atom} />
          <text x="130" y="140" fontSize="15" fill={MECH_COLORS.atom} textAnchor="middle">C</text>

          {/* C=O עליון - קשר כפול (ניטרלי במבנה זה) */}
          <line x1="132.0" y1="122.2" x2="197.0" y2="62.2" stroke={MECH_COLORS.bond} strokeWidth="2" />
          <line x1="127.97" y1="117.8" x2="192.97" y2="57.8" stroke={MECH_COLORS.bond} strokeWidth="2" />
          <text x="205" y="52" fontSize="15" fill={MECH_COLORS.atom} textAnchor="middle">O</text>
          <circle cx="188" cy="36" r="1.6" fill={MECH_COLORS.atom} />
          <circle cx="198" cy="36" r="1.6" fill={MECH_COLORS.atom} />

          {/* C-O תחתון - קשר יחיד, O עם מטען שלילי וזוג בודד */}
          <line x1="130" y1="120" x2="195" y2="180" stroke={MECH_COLORS.bond} strokeWidth="2" />
          <text x="205" y="192" fontSize="15" fill={MECH_COLORS.atom} textAnchor="middle">O</text>
          <text x="218" y="183" fontSize="13" fontWeight="700" fill={MECH_COLORS.charge} textAnchor="middle">⁻</text>
          <circle cx="209" cy="168" r="1.6" fill={MECH_COLORS.charge} />
          <circle cx="217" cy="174" r="1.6" fill={MECH_COLORS.charge} />

          {/* חץ 1: מהזוג הבודד של ה-O⁻ אל אמצע הקשר C-O (יוצר קשר פי חדש) */}
          <path d="M210,171 Q195,158 170,153" fill="none" stroke={MECH_COLORS.arrow} strokeWidth="2.25" markerEnd="url(#arrow-resonance)" />

          {/* חץ 2: מהקשר הכפול הקיים C=O אל אותו חמצן (הופך אותו ל-O⁻) */}
          <path d="M165,88 Q182,72 194,61" fill="none" stroke={MECH_COLORS.arrow} strokeWidth="2.25" markerEnd="url(#arrow-resonance)" />

          <text x="130" y="215" fontSize="13" fill={MECH_COLORS.atom} textAnchor="middle" fontWeight="600">מבנה רזוננס א׳</text>
        </g>

        {/* ---------- חץ רזוננס דו-ראשי (↔) בין שני מבני הרזוננס ---------- */}
        <g>
          <line x1="250" y1="120" x2="505" y2="120" stroke={MECH_COLORS.arrow} strokeWidth="2.5" markerStart="url(#arrow-resonance)" markerEnd="url(#arrow-resonance)" />
          <text x="377" y="105" fontSize="12" fill={MECH_COLORS.atom} textAnchor="middle" fontWeight="600">רזוננס (אותה מולקולה!)</text>
        </g>

        {/* ---------- פאנל 2: מבנה רזוננס ב' (שקול לחלוטין, ללא חצים) ---------- */}
        <g fontFamily="inherit" transform={`translate(${OFFSET_X}, 0)`}>
          {/* R - קשר לפחמן */}
          <line x1="60" y1="120" x2="126" y2="120" stroke={MECH_COLORS.bond} strokeWidth="2" />
          <text x="50" y="125" fontSize="17" fontWeight="700" fill={MECH_COLORS.atom} textAnchor="middle">R</text>

          {/* פחמן מרכזי */}
          <circle cx="130" cy="120" r="4" fill={MECH_COLORS.atom} />
          <text x="130" y="140" fontSize="15" fill={MECH_COLORS.atom} textAnchor="middle">C</text>

          {/* C-O עליון - עכשיו קשר יחיד, O עם מטען שלילי וזוג בודד */}
          <line x1="130" y1="120" x2="195" y2="60" stroke={MECH_COLORS.bond} strokeWidth="2" />
          <text x="205" y="52" fontSize="15" fill={MECH_COLORS.atom} textAnchor="middle">O</text>
          <text x="218" y="43" fontSize="13" fontWeight="700" fill={MECH_COLORS.charge} textAnchor="middle">⁻</text>
          <circle cx="209" cy="72" r="1.6" fill={MECH_COLORS.charge} />
          <circle cx="217" cy="66" r="1.6" fill={MECH_COLORS.charge} />

          {/* C=O תחתון - עכשיו קשר כפול (ניטרלי) */}
          <line x1="127.97" y1="122.2" x2="192.97" y2="182.2" stroke={MECH_COLORS.bond} strokeWidth="2" />
          <line x1="132.0" y1="117.8" x2="197.0" y2="177.8" stroke={MECH_COLORS.bond} strokeWidth="2" />
          <text x="205" y="192" fontSize="15" fill={MECH_COLORS.atom} textAnchor="middle">O</text>
          <circle cx="188" cy="204" r="1.6" fill={MECH_COLORS.atom} />
          <circle cx="198" cy="204" r="1.6" fill={MECH_COLORS.atom} />

          <text x="130" y="215" fontSize="13" fill={MECH_COLORS.atom} textAnchor="middle" fontWeight="600">מבנה רזוננס ב׳ (שקול לחלוטין)</text>
        </g>
      </svg>
    </MechanismArtFrame>
  );
}
