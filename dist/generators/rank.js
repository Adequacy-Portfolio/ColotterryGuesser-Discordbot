export function rankPossibilitiesBySuccession(possibilities, history) {
    const possibilitiesCount = {};
    // Count the occurrences of each possibility in history
    history.forEach((draw, index) => {
        if (draw === history.slice(-1)[0]) {
            possibilities.forEach((possibility) => {
                const possibilityString = possibility.join("");
                if (history[index + 1]?.includes(possibilityString)) {
                    possibilitiesCount[possibilityString] =
                        (possibilitiesCount[possibilityString] || 0) + 1;
                }
            });
        }
    });
    // Sort possibilities based on their frequencies in descending order
    const sortedPossibilities = Object.keys(possibilitiesCount).sort((a, b) => {
        return (possibilitiesCount[b] -
            possibilitiesCount[a]);
    });
    // Convert sorted possibilities back to array format
    const rankedPossibilities = sortedPossibilities.map((possibility) => possibility.split(""));
    return rankedPossibilities;
}
export function rankPatternsByRecurrence(patternsList) {
    const patternCounts = {};
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
    const rankedPatterns = sortedPatterns.map((pattern) => pattern.split(""));
    return rankedPatterns;
}
