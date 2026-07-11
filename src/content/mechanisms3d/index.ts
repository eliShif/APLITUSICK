import type { Mechanism3DMeta } from "./schema";
import { SN2_MECHANISM_3D } from "./sn2";
import { E2_MECHANISM_3D } from "./e2";
import { SN1_MECHANISM_3D } from "./sn1";

export const MECHANISM_3D_REGISTRY: Record<string, Mechanism3DMeta> = {
  sn2: SN2_MECHANISM_3D,
  e2: E2_MECHANISM_3D,
  sn1: SN1_MECHANISM_3D,
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
];
