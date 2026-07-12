import type { Mechanism3DMeta } from "./schema";
import { SN2_MECHANISM_3D } from "./sn2";
import { E2_MECHANISM_3D } from "./e2";
import { SN1_MECHANISM_3D } from "./sn1";
import { E1_MECHANISM_3D } from "./e1";
import { RADICAL_MECHANISM_3D } from "./radical";
import { ADDITION_MECHANISM_3D } from "./addition";
import { HYDROGENATION_MECHANISM_3D } from "./hydrogenation";
import { CARBONYL_MECHANISM_3D } from "./carbonyl";
import { CARBOXYLIC_MECHANISM_3D } from "./carboxylic";
import { ALPHA_MECHANISM_3D } from "./alpha";
import { ALCOHOL_E1_MECHANISM_3D } from "./alcohol-e1";
import { BROMONIUM_MECHANISM_3D } from "./bromonium";
import { HEMIACETAL_MECHANISM_3D } from "./hemiacetal";
import { IMINE_MECHANISM_3D } from "./imine";
import { ACETAL_MECHANISM_3D } from "./acetal";
import { ALDOL_MECHANISM_3D } from "./aldol";

export const MECHANISM_3D_REGISTRY: Record<string, Mechanism3DMeta> = {
  sn2: SN2_MECHANISM_3D,
  e2: E2_MECHANISM_3D,
  sn1: SN1_MECHANISM_3D,
  e1: E1_MECHANISM_3D,
  radical: RADICAL_MECHANISM_3D,
  addition: ADDITION_MECHANISM_3D,
  bromonium: BROMONIUM_MECHANISM_3D,
  hydrogenation: HYDROGENATION_MECHANISM_3D,
  carbonyl: CARBONYL_MECHANISM_3D,
  imine: IMINE_MECHANISM_3D,
  acetal: ACETAL_MECHANISM_3D,
  carboxylic: CARBOXYLIC_MECHANISM_3D,
  "alpha-carbon": ALPHA_MECHANISM_3D,
  "alcohols-e1": ALCOHOL_E1_MECHANISM_3D,
  hemiacetal: HEMIACETAL_MECHANISM_3D,
  aldol: ALDOL_MECHANISM_3D,
};

export interface MechanismListEntry {
  slug: string;
  title: string;
}

/** רשימת כל המנגנונים לסיידבר - כולל אלו שעוד לא נבנו (available נגזר מקיום ב-REGISTRY). */
export const ALL_MECHANISMS_3D: MechanismListEntry[] = [
  { slug: "sn2", title: "SN2 - התקפה אחורית והיפוך קונפיגורציה" },
  { slug: "sn1", title: "SN1 - קרבוקטיון ורצמיזציה" },
  { slug: "e2", title: "E2 - אלימינציה חד-שלבית" },
  { slug: "e1", title: "E1 - אלימינציה דו-שלבית" },
  { slug: "radical", title: "הלוגנציה רדיקלית - Propagation" },
  { slug: "addition", title: "סיפוח הידרוהלוגני לאלקן" },
  { slug: "bromonium", title: "סיפוח Br₂ לאלקן - סטריאוכימיית אנטי" },
  { slug: "hydrogenation", title: "הידרוגנציה קטליטית" },
  { slug: "carbonyl", title: "סיפוח נוקלאופילי לקרבוניל" },
  { slug: "imine", title: "יצירת אימין (Schiff base)" },
  { slug: "acetal", title: "יצירת אצטל - יון אוקסוקרבניום" },
  { slug: "carboxylic", title: "תגובות נגזרות קרבוקסיליות" },
  { slug: "alpha-carbon", title: "אנוליזציה בפחמן אלפא" },
  { slug: "alcohols-e1", title: "התייבשות אלכוהול (E1)" },
  { slug: "hemiacetal", title: "יצירת המיאצטל (מודל לגלוקוז)" },
  { slug: "aldol", title: "עיבוי אלדולי" },
];
