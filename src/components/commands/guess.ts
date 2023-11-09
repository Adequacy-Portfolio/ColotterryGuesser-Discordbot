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
import { rankPossibilities } from "../../generators/rank.js";
import {
  generatePossibleDrawsFromPositions,
  generatePossibleDrawsFromSequences,
  generatePossibleDrawsFromPatterns,
} from "../../generators/draws.js";
import {
  byPatternReportDataForm,
  byPositionReportDataForm,
  bySequenceReportDataForm,
} from "../../adapters/draws.js";
import { MathematicalConceptsN } from "../../types/generator.js";

@Discord()
export class Guess {
  @Slash({
    description: "Will show report analysis for the draws from calottery.com",
    name: "guess",
  })
  async handler(interaction: CommandInteraction) {
    await interaction.deferReply();
    try {
      const history = DrawsHistoryStorageHandler.getAllDraws();
      const guesser = new GuesserModel(getOutcomes(history));

      const occurenceByPosition = guesser.computeOccurenceByPosition();
      const occurenceBySequence = guesser.computeOccurenceBySequence();
      const occurenceByPattern = guesser.computeOccurenceByPattern();

      const nominatedChoices = rankPossibilities(
        [
          ...generatePossibleDrawsFromPositions(
            byPositionReportDataForm(occurenceByPosition),
          ),
          ...generatePossibleDrawsFromSequences(
            bySequenceReportDataForm(occurenceBySequence),
          ),
          ...generatePossibleDrawsFromPatterns(
            byPatternReportDataForm(occurenceByPattern),
          ),
        ],
        getOutcomes(history).map((draw) =>
          draw.join(""),
        ) as MathematicalConceptsN.draw[],
      );
      const byPositionReportData = byPositionReport(occurenceByPosition);
      const bySequenceReportData = bySequenceReport(occurenceBySequence);
      const byPatternReportData = byPatternReport(occurenceByPattern);
      const last10DrawsReportData = last10DrawsReport(
        guesser.getLatest10Draws(),
      );
      const embed = GuesserModelEmebds.results({
        nominatedChoices,
        byPositionReport: byPositionReportData,
        bySequenceReport: bySequenceReportData,
        byPatternReport: byPatternReportData,
        latestTop10Draws: last10DrawsReportData,
      });
      await interaction.editReply({ embeds: [embed] });
    } catch (err) {
      await interaction.editReply({
        content: `An error occured. Please check the logs.`,
      });
      console.log(err);
    }
  }
}
