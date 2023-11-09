// Sample data for analysis
const positionalStatistics = {
    firstNumber: ["4", "8", "0"],
    secondNumber: ["3", "7", "5"],
    thirdNumber: ["7", "6", "1"],
};
const sequentialStatistics = ["16", "38", "51", "60", "96", "78"];
const patternStatistics = {
    patterns: ["333", "666", "000", "757", "755", "575"],
};
const latestDraws = [
    "805",
    "241",
    "586",
    "739",
    "369",
    "448",
    "877",
    "956",
    "217",
    "327",
];
function analyzeData() {
    const possibleDraws = [];
    // Analyze positional statistics
    for (let i = 0; i < 3; i++) {
        const draw = [
            positionalStatistics.firstNumber[i],
            positionalStatistics.secondNumber[i],
            positionalStatistics.thirdNumber[i],
        ];
        possibleDraws.push(draw);
    }
    // Analyze sequential statistics and add to possible draws
    for (let i = 0; i < sequentialStatistics.length; i++) {
        const draw = [];
        for (let j = 0; j < sequentialStatistics[i].length; j++) {
            draw.push(sequentialStatistics[i][j]);
        }
        possibleDraws.push(draw);
    }
    // Analyze pattern statistics and add to possible draws
    for (let i = 0; i < 3; i++) {
        const draw = [];
        draw.push(patternStatistics.patterns[i][0]);
        draw.push(patternStatistics.patterns[i][1]);
        draw.push(patternStatistics.patterns[i][2]);
        possibleDraws.push(draw);
    }
    return possibleDraws;
}
function filterDraws(possibleDraws, latestDraws) {
    const filteredDraws = [];
    // Check if the draw is not in the latest draws
    for (const draw of possibleDraws) {
        let isValid = true;
        for (const number of draw) {
            if (latestDraws.includes(number)) {
                isValid = false;
                break;
            }
        }
        if (isValid) {
            filteredDraws.push(draw);
        }
    }
    return filteredDraws;
}
const possibleDraws = analyzeData();
const filteredDraws = filterDraws(possibleDraws, latestDraws);
console.log("Possible Draws:");
console.log(filteredDraws);
export {};
