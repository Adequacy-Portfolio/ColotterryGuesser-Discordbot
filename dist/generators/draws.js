export function generatePossibleDrawsFromSequences(sequences) {
    const possibleDraws = [];
    // Generate draws based on shared first or second digit in sequences
    for (let i = 0; i < sequences.length; i++) {
        const firstDigit = sequences[i][0];
        const secondDigit = sequences[i][1];
        for (let j = 0; j < sequences.length; j++) {
            if (i !== j) {
                const draw = [
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
export function generatePossibleDrawsFromPositions(positions) {
    const possibleDraws = [];
    // Generate draws by concatenating numbers from different positions
    for (let i = 0; i < positions[1].length; i++) {
        for (let j = 0; j < positions[2].length; j++) {
            for (let k = 0; k < positions[3].length; k++) {
                const draw = [
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
export function generatePossibleDrawsFromPatterns(patterns) {
    return patterns;
}
