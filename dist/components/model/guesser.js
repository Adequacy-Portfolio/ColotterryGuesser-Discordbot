import { getOutcomes } from '../../adapters/outcomes.js';
import DrawsHistoryStorageHandler from "../../storage/draws.js";
export default class GuesserModel {
    _input;
    _prediction;
    constructor(input) {
        this._input = input;
        this._prediction = null;
    }
    computeOccurenceByPosition() {
        const outcomes = {
            1: {},
            2: {},
            3: {},
        }; // Object to store counts of each number at the given position
        const totalGames = this._input.length;
        for (const position of Object.keys(outcomes)) {
            // Count occurrences of each number at the specified position
            this._input.forEach((game) => {
                const number = game[Number(position) - 1]; // Get number at the specified position (0, 1, or 2)
                if (outcomes[position][number]) {
                    outcomes[position][number]++;
                }
                else {
                    outcomes[position][number] = 1;
                }
            });
            // Calculate odds for each number at the specified position
            const odds = {};
            Object.keys(outcomes[position]).forEach((number) => {
                const count = outcomes[position][number];
                const probability = (count / totalGames) * 100; // Calculate probability in percentage
                odds[number] = Number(probability.toFixed(2)); // Round to 2 decimal places
            });
            outcomes[position] = odds;
        }
        return outcomes;
    }
    computeOccurenceBySequence() {
        const digits = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9];
        const outcomes = {};
        for (const first of digits) {
            let countFirstNumber = 0;
            let countBothNumbers = 0;
            for (const second of digits) {
                this._input.forEach((game) => {
                    for (let i = 0; i < 2; i++) {
                        if (game[i] === first) {
                            countFirstNumber++;
                            if (game[i + 1] === second) {
                                countBothNumbers++;
                            }
                        }
                    }
                });
                // Calculate the conditional probability
                const conditionalProbability = (countBothNumbers / countFirstNumber) * 100;
                outcomes[`${first}${second}`] = conditionalProbability.toFixed(2); // Round to 2 decimal places
            }
        }
        return outcomes;
    }
    computeOccurenceByPattern() {
        const totalGames = this._input.length;
        const outcomes = {};
        for (const pattern of this._input) {
            let matchingGames = 0;
            // Iterate through the historical outcomes and count matching games
            this._input.forEach((game) => {
                if (pattern.every((number) => game.includes(number))) {
                    matchingGames++;
                }
            });
            // Calculate the probability of the full pattern
            const probability = (matchingGames / totalGames) * 100;
            outcomes[pattern.join("")] = Number(probability.toFixed(2)); // Round to 2 decimal places
        }
        return outcomes;
    }
}
const a = new GuesserModel(getOutcomes(DrawsHistoryStorageHandler.getAllDraws()));
console.log(a.computeOccurenceByPosition());
console.log(a.computeOccurenceByPattern());
console.log(a.computeOccurenceBySequence());
