export namespace GuesserModelN {
  type LotteryOutcomeT = [first: number, second: number, third: number];

  export type LotteryOutcomeHistoryT = Array<LotteryOutcomeT>;
  export type EmbedReportDataT = {
    byPositionReport: any;
    bySequenceReport: any;
    byPatternReport: any;
    latestTop10Draws: any;
  };
}
