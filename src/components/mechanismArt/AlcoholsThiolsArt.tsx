import { MechanismArtFrame, MECH_COLORS } from "./MechanismArtFrame";

export function AlcoholsThiolsArt() {
  return (
    <MechanismArtFrame
      title="פרוטונציה של אלכוהול - הופכת OH הגרוע לקבוצה עוזבת (H₂O) הטובה"
      note="לאחר הפרוטונציה, ה-OH (קבוצה עוזבת גרועה) הפך ל-OH₂⁺ (מים - קבוצה עוזבת מצוינת) שיכולה לעזוב בשלב הבא ולהשאיר קרבוקטיון (במנגנון E1/SN1) - זהו הצעד ה'טריק' הקלאסי להפעלת אלכוהול כתת-מצע."
    >
      <svg viewBox="0 0 760 230" className="w-full h-auto" style={{ minWidth: 620 }}>
        <defs>
          <marker id="arrow-oh-protonation" viewBox="0 0 10 10" refX="8" refY="5" markerWidth="6" markerHeight="6" orient="auto-start-reverse">
            <path d="M0,0 L10,5 L0,10 z" fill={MECH_COLORS.arrow} />
          </marker>
        </defs>

        {/* פאנל 1: מגיבים - R-O-H + H+ */}
        <g fontFamily="inherit">
          <text x="75" y="115" fontSize="17" fontWeight="700" fill={MECH_COLORS.atom} textAnchor="middle">R</text>
          <line x1="95" y1="110" x2="146" y2="110" stroke={MECH_COLORS.bond} strokeWidth="2" />

          <circle cx="150" cy="110" r="4" fill={MECH_COLORS.atom} />
          <text x="150" y="132" fontSize="15" fill={MECH_COLORS.atom} textAnchor="middle">O</text>

          <line x1="150" y1="110" x2="150" y2="155" stroke={MECH_COLORS.bond} strokeWidth="2" />
          <text x="150" y="172" fontSize="15" fill={MECH_COLORS.atom} textAnchor="middle">H</text>

          {/* זוג בודד תוקף (הזוג הבודד הרלוונטי על החמצן) */}
          <circle cx="163" cy="88" r="2" fill={MECH_COLORS.nucleophile} />
          <circle cx="171" cy="94" r="2" fill={MECH_COLORS.nucleophile} />

          {/* מפריד + בין המולקולה לפרוטון החיצוני */}
          <text x="205" y="115" fontSize="20" fill={MECH_COLORS.atom} textAnchor="middle">+</text>

          {/* H+ החיצוני */}
          <text x="250" y="115" fontSize="17" fontWeight="700" fill={MECH_COLORS.electrophileLeavingGroup} textAnchor="middle">H</text>
          <text x="264" y="98" fontSize="13" fontWeight="700" fill={MECH_COLORS.charge} textAnchor="middle">⁺</text>

          {/* החץ המרכזי: זוג בודד על O תוקף את H+ */}
          <path d="M167,90 Q205,68 244,104" fill="none" stroke={MECH_COLORS.arrow} strokeWidth="2.25" markerEnd="url(#arrow-oh-protonation)" />

          <text x="160" y="200" fontSize="13" fill={MECH_COLORS.atom} textAnchor="middle" fontWeight="600">מגיבים: R-OH + H⁺</text>
        </g>

        {/* חץ תגובה מרכזי */}
        <line x1="330" y1="115" x2="400" y2="115" stroke={MECH_COLORS.arrow} strokeWidth="2.5" markerEnd="url(#arrow-oh-protonation)" />

        {/* פאנל 2: תוצרים - אוקסוניום R-O(H)(H)+ */}
        <g fontFamily="inherit">
          <text x="485" y="115" fontSize="17" fontWeight="700" fill={MECH_COLORS.atom} textAnchor="middle">R</text>
          <line x1="505" y1="110" x2="556" y2="110" stroke={MECH_COLORS.bond} strokeWidth="2" />

          <circle cx="560" cy="110" r="4" fill={MECH_COLORS.atom} />
          <text x="560" y="132" fontSize="15" fill={MECH_COLORS.atom} textAnchor="middle">O</text>
          <text x="578" y="95" fontSize="16" fontWeight="700" fill={MECH_COLORS.charge} textAnchor="middle">⁺</text>

          {/* קשר O-H המקורי */}
          <line x1="560" y1="110" x2="560" y2="155" stroke={MECH_COLORS.bond} strokeWidth="2" />
          <text x="560" y="172" fontSize="15" fill={MECH_COLORS.atom} textAnchor="middle">H</text>

          {/* קשר O-H החדש שנוצר מהפרוטונציה */}
          <line x1="560" y1="110" x2="605" y2="82" stroke={MECH_COLORS.bond} strokeWidth="2" />
          <text x="617" y="76" fontSize="15" fill={MECH_COLORS.atom} textAnchor="middle">H</text>
          <text x="623" y="92" fontSize="10" fill={MECH_COLORS.nucleophile} textAnchor="middle">(חדש)</text>

          {/* זוג בודד יחיד שנותר על החמצן */}
          <circle cx="540" cy="90" r="2" fill={MECH_COLORS.atom} />
          <circle cx="533" cy="96" r="2" fill={MECH_COLORS.atom} />

          <text x="570" y="200" fontSize="13" fill={MECH_COLORS.atom} textAnchor="middle" fontWeight="600">תוצרים: R-OH₂⁺ (אוקסוניום) - LG מצוין (H₂O)</text>
        </g>
      </svg>
    </MechanismArtFrame>
  );
}
