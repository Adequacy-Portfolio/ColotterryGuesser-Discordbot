import { MathematicalConceptsN } from "../types/generator.js";
import { GuesserModelN } from "../types/model.js";

export default class GuesserModel {
  private _input: GuesserModelN.LotteryOutcomeHistoryT;

  constructor(input: GuesserModelN.LotteryOutcomeHistoryT) {
    this._input = input;
  }

  public computeOccurenceByPosition(): GuesserModelN.PositionStatisticsT {
    const outcomes: GuesserModelN.PositionStatisticsT = {
      1: {},
      2: {},
      3: {},
    }; // Object to store counts of each number at the given position
    const totalGames = this._input.length;

    for (const position of Object.keys(outcomes) as unknown as Array<
      keyof typeof outcomes
    >) {
      // Count occurrences of each number at the specified position
      this._input.forEach((game) => {
        const number = game[
          Number(position) - 1
        ] as MathematicalConceptsN.digit; // Get number at the specified position (0, 1, or 2)
        if (outcomes[position][number]) {
          outcomes[position][number]!++;
        } else {
          outcomes[position][number] = 1;
        }
      });

      // Calculate odds for each number at the specified position
      const odds: GuesserModelN.PositionStatisticsT[1 | 2 | 3] = {};
      Object.keys(outcomes[position]).forEach((number) => {
        //@ts-ignore
        const count = outcomes[position][number];
        const probability = (count / totalGames) * 100; // Calculate probability in percentage
        //@ts-ignore
        odds[number] = Number(probability.toFixed(2)); // Round to 2 decimal places
      });

      outcomes[position] = odds;
    }
    return outcomes;
  }

  public computeOccurenceBySequence(): GuesserModelN.SequenceStatisticsT {
    const digits = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9];
    const outcomes: GuesserModelN.SequenceStatisticsT = {};
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
        const conditionalProbability =
          (countBothNumbers / countFirstNumber) * 100;

        outcomes[`${first}${second}` as keyof typeof outcomes] = Number(
          conditionalProbability.toFixed(2),
        ); // Round to 2 decimal places
      }
    }
    return outcomes;
  }

  public computeOccurenceByPattern(): GuesserModelN.PatternStatisticsT {
    const totalGames = this._input.length;
    const outcomes: GuesserModelN.PatternStatisticsT = {};
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

      outcomes[pattern.join("") as keyof typeof outcomes] = Number(
        probability.toFixed(2),
      ); // Round to 2 decimal places
    }

    return outcomes;
  }

  public getLatest10Draws() {
    const history = this._input;
    return history.slice(0, 10);
  }
}
