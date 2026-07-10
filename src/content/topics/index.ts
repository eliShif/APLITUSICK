import type { Topic } from "@/content/types";
import { nomenclature } from "./nomenclature";
import { stereochemistry } from "./stereochemistry";
import { radicalReactions } from "./radical-reactions";
import { nucleophilicSubstitution } from "./nucleophilic-substitution";
import { reactivityToolkit } from "./reactivity-toolkit";
import { elimination } from "./elimination";
import { alkeneAddition } from "./alkene-addition";
import { alcoholsThiols } from "./alcohols-thiols";
import { resonance } from "./resonance";
import { aromaticity } from "./aromaticity";
import { carboxylicAcids } from "./carboxylic-acids";
import { aldehydesKetones } from "./aldehydes-ketones";
import { alphaCarbon } from "./alpha-carbon";
import { cycloalkanesCarbsRedox } from "./cycloalkanes-carbs-redox";

export const topics: Topic[] = [
  nomenclature,
  stereochemistry,
  radicalReactions,
  nucleophilicSubstitution,
  reactivityToolkit,
  elimination,
  alkeneAddition,
  alcoholsThiols,
  resonance,
  aromaticity,
  carboxylicAcids,
  aldehydesKetones,
  alphaCarbon,
  cycloalkanesCarbsRedox,
];

export function getTopic(slug: string): Topic | undefined {
  return topics.find((t) => t.slug === slug);
}
