import { CommandInteraction } from "discord.js";
import { Discord, Slash } from "discordx";
import GuesserModelEmebds from "../embeds/guesser.js";
import {
  byPositionReport,
  bySequenceReport,
  byPatternReport,
  last10DrawsReport,
} from "../../adapters/model.js";
import DrawsHistoryStorageHandler from "../../storage/draws.js";
import GuesserModel from "../../model/guesser.js";
import { getOutcomes } from "../../adapters/outcomes.js";

@Discord()
export class Guess {
  @Slash({
    description: "Will show report analysis for the draws from calottery.com",
    name: "guess",
  })
  async handler(interaction: CommandInteraction) {
    await interaction.deferReply();
    const history = DrawsHistoryStorageHandler.getAllDraws();
    const guesser = new GuesserModel(getOutcomes(history));
    const byPositionReportData = byPositionReport(
      guesser.computeOccurenceByPosition(),
    );
    const bySequenceReportData = bySequenceReport(
      guesser.computeOccurenceBySequence(),
    );
    const byPatternReportData = byPatternReport(
      guesser.computeOccurenceByPattern(),
    );
    const last10DrawsReportData = last10DrawsReport(guesser.getLatest10Draws());
    const embed = GuesserModelEmebds.results({
      byPositionReport: byPositionReportData,
      bySequenceReport: bySequenceReportData,
      byPatternReport: byPatternReportData,
      latestTop10Draws: last10DrawsReportData,
    });

    await interaction.editReply({ embeds: [embed] });
  }
}
