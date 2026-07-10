// טיפוסים משותפים לכל תוכן האתר (נושאי לימוד, שאלונים, משחקי התאמה, מולקולות תלת-ממדיות).
// כל קובץ בתיקיית content/topics/*.ts חייב לייצא אובייקט יחיד מטיפוס Topic.

export interface Molecule {
  /** שם עברי להצגה, למשל "ברומואתן" */
  name: string;
  /** נוסחה מולקולרית/מבנית קצרה, למשל CH3CH2Br */
  formula?: string;
  /** PubChem CID - משמש לשליפת מבנה תלת-ממדי אמיתי (SDF) בזמן ריצה */
  pubchemCid?: number;
  /** הערה קצרה על תפקיד המולקולה בנושא */
  caption?: string;
}

export interface ComparisonTable {
  title: string;
  headers: string[];
  /** כל שורה היא מערך בגודל headers.length */
  rows: string[][];
}

export type QuizQuestion =
  | {
      type: "mc";
      question: string;
      options: string[];
      correctIndex: number;
      explanation?: string;
    }
  | {
      type: "tf";
      question: string;
      correct: boolean;
      explanation?: string;
    }
  | {
      /** השלמת מילה/ביטוי קצר - בדיקה מקורבת (case/רווחים) מול answers */
      type: "fill";
      question: string;
      answers: string[];
      explanation?: string;
    }
  | {
      /** סידור שלבים לפי הסדר הנכון */
      type: "order";
      question: string;
      steps: string[];
      correctOrder: number[];
      explanation?: string;
    };

export interface MatchPair {
  /** הצד שמוצג בעמודה הימנית (למשל מבנה/נוסחה/תיאור) */
  left: string;
  /** הצד שמוצג בעמודה השמאלית (למשל שם/הגדרה) */
  right: string;
}

export interface MatchingGame {
  title: string;
  instructions?: string;
  pairs: MatchPair[];
}

export interface KeyDifferenceBox {
  title: string;
  items: string[];
}

export interface SummarySection {
  heading: string;
  paragraphs?: string[];
  bullets?: string[];
  /** תיבות "הבדל בין X ל-Y" המודגשות ויזואלית */
  keyDifferences?: KeyDifferenceBox[];
}

export interface MechanismDiagram {
  title: string;
  /** תחביר mermaid (flowchart/graph) */
  mermaid: string;
  note?: string;
}

export interface Topic {
  slug: string;
  title: string;
  subtitle?: string;
  icon?: string;
  summary: SummarySection[];
  comparisonTables?: ComparisonTable[];
  diagrams?: MechanismDiagram[];
  molecules?: Molecule[];
  quiz: QuizQuestion[];
  matchingGame?: MatchingGame;
}
