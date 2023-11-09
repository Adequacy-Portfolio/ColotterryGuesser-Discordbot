import { MathematicalConceptsN } from "../types/generator.js";

export function generatePossibleDrawsFromSequences(
  sequences: MathematicalConceptsN.sequence[],
): MathematicalConceptsN.pattern[] {
  const possibleDraws: MathematicalConceptsN.pattern[] = [];

  // Generate draws based on shared first or second digit in sequences
  for (let i = 0; i < sequences.length; i++) {
    const firstDigit = sequences[i][0];
    const secondDigit = sequences[i][1];

    for (let j = 0; j < sequences.length; j++) {
      if (i !== j) {
        const draw: MathematicalConceptsN.pattern = [
          firstDigit,
          secondDigit,
          sequences[j][1],
        ];
        possibleDraws.push(draw);
      }
    }
  }

  return possibleDraws;
}

export function generatePossibleDrawsFromPositions(
  positions: MathematicalConceptsN.positions,
): MathematicalConceptsN.pattern[] {
  const possibleDraws: MathematicalConceptsN.pattern[] = [];

  // Generate draws by concatenating numbers from different positions
  for (let i = 0; i < positions[1].length; i++) {
    for (let j = 0; j < positions[2].length; j++) {
      for (let k = 0; k < positions[3].length; k++) {
        const draw: MathematicalConceptsN.pattern = [
          positions[1][i],
          positions[2][j],
          positions[3][k],
        ];
        possibleDraws.push(draw);
      }
    }
  }

  return possibleDraws;
}

export function generatePossibleDrawsFromPatterns(
  patterns: MathematicalConceptsN.pattern[],
): MathematicalConceptsN.pattern[] {
  return patterns;
}
