import { MathematicalConceptsN } from "./generator.js";

export namespace GuesserModelN {
  type LotteryOutcomeT = [first: number, second: number, third: number];

  export type PositionStatisticsT = Record<
    1 | 2 | 3,
    Partial<Record<MathematicalConceptsN.number_, number>>
  >;

  export type SequenceStatisticsT = Partial<
    Record<MathematicalConceptsN.seq, number>
  >;
  export type PatternStatisticsT = Partial<
    Record<MathematicalConceptsN.draw, number>
  >;

  export type LotteryOutcomeHistoryT = Array<LotteryOutcomeT>;
  export type EmbedReportDataT = {
    nominatedChoices: any;
    byPositionReport: any;
    bySequenceReport: any;
    byPatternReport: any;
    latestTop10Draws: any;
  };
}
