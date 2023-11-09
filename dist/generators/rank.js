export function rankPossibilities(possibilities, history) {
    console.log(possibilities);
    const possibilitiesCount = {};
    // Count the occurrences of each possibility in history
    history.forEach((draw) => {
        possibilities.forEach((possibility) => {
            const possibilityString = possibility.join("");
            if (draw.includes(possibilityString)) {
                possibilitiesCount[possibilityString] =
                    (possibilitiesCount[possibilityString] || 0) + 1;
            }
        });
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
