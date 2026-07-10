import { NucleophilicSubstitutionArt } from "./NucleophilicSubstitutionArt";
import { StereochemistryArt } from "./StereochemistryArt";
import { EliminationArt } from "./EliminationArt";
import { AlkeneAdditionArt } from "./AlkeneAdditionArt";
import { AlcoholsThiolsArt } from "./AlcoholsThiolsArt";
import { ResonanceArt } from "./ResonanceArt";
import { AromaticityArt } from "./AromaticityArt";
import { CarboxylicAcidsArt } from "./CarboxylicAcidsArt";
import { AldehydesKetonesArt } from "./AldehydesKetonesArt";
import { AlphaCarbonArt } from "./AlphaCarbonArt";
import { CycloalkanesCarbsRedoxArt } from "./CycloalkanesCarbsRedoxArt";
import { ReactivityToolkitArt } from "./ReactivityToolkitArt";

/** מיפוי slug של נושא → קומפוננטת תרשים מנגנון עם חצים (SVG). נומנקלטורה מכוונת בלי מנגנון. */
export const MECHANISM_ART: Record<string, React.ComponentType> = {
  stereochemistry: StereochemistryArt,
  "nucleophilic-substitution": NucleophilicSubstitutionArt,
  "reactivity-toolkit": ReactivityToolkitArt,
  elimination: EliminationArt,
  "alkene-addition": AlkeneAdditionArt,
  "alcohols-thiols": AlcoholsThiolsArt,
  resonance: ResonanceArt,
  aromaticity: AromaticityArt,
  "carboxylic-acids": CarboxylicAcidsArt,
  "aldehydes-ketones": AldehydesKetonesArt,
  "alpha-carbon": AlphaCarbonArt,
  "cycloalkanes-carbs-redox": CycloalkanesCarbsRedoxArt,
};
