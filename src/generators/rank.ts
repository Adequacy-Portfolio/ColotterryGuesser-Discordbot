import { MathematicalConceptsN } from "../types/generator.js";

export function rankPossibilities(
  possibilities: MathematicalConceptsN.pattern[],
  history: MathematicalConceptsN.draw[],
) {
  const possibilitiesCount: Partial<
    Record<MathematicalConceptsN.draw, number>
  > = {};

  // Count the occurrences of each possibility in history
  history.forEach((draw: any) => {
    possibilities.forEach((possibility: any) => {
      const possibilityString: MathematicalConceptsN.draw =
        possibility.join("");
      if (draw.includes(possibilityString)) {
        possibilitiesCount[possibilityString] =
          (possibilitiesCount[possibilityString] || 0) + 1;
      }
    });
  });

  // Sort possibilities based on their frequencies in descending order
  const sortedPossibilities = Object.keys(possibilitiesCount).sort((a, b) => {
    return (
      possibilitiesCount[b as keyof typeof possibilitiesCount]! -
      possibilitiesCount[a as keyof typeof possibilitiesCount]!
    );
  });

  // Convert sorted possibilities back to array format
  const rankedPossibilities = sortedPossibilities.map((possibility) =>
    possibility.split(""),
  ) as unknown as MathematicalConceptsN.pattern[];

  return rankedPossibilities;
}

export function rankPatternsByRecurrence(
  patternsList: MathematicalConceptsN.pattern[],
): MathematicalConceptsN.pattern[] {
  const patternCounts: Record<string, number> = {};

  // Count the occurrences of each pattern
  patternsList.forEach((pattern) => {
    const patternString = pattern.join("");
    patternCounts[patternString] = (patternCounts[patternString] || 0) + 1;
  });

  // Sort patterns based on their counts in descending order
  const sortedPatterns = Object.keys(patternCounts).sort((a, b) => {
    return patternCounts[b] - patternCounts[a];
  });

  // Convert sorted patterns back to array format
  const rankedPatterns: MathematicalConceptsN.pattern[] = sortedPatterns.map(
    (pattern) => pattern.split("") as MathematicalConceptsN.pattern,
  );

  return rankedPatterns;
}
