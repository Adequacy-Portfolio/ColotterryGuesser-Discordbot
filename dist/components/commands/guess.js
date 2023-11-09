var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
import { Discord, Slash } from "discordx";
import GuesserModelEmebds from "../embeds/guesser.js";
import { byPositionReport, bySequenceReport, byPatternReport, last10DrawsReport, } from "../../adapters/model.js";
import DrawsHistoryStorageHandler from "../../storage/draws.js";
import GuesserModel from "../../model/guesser.js";
import { getOutcomes } from "../../adapters/outcomes.js";
import { rankPossibilities } from "../../generators/rank.js";
import { generatePossibleDrawsFromPositions, generatePossibleDrawsFromSequences, generatePossibleDrawsFromPatterns, } from "../../generators/draws.js";
import { byPatternReportDataForm, byPositionReportDataForm, bySequenceReportDataForm, } from "../../adapters/draws.js";
let Guess = class Guess {
    async handler(interaction) {
        await interaction.deferReply();
        try {
            const history = DrawsHistoryStorageHandler.getAllDraws();
            const guesser = new GuesserModel(getOutcomes(history));
            const occurenceByPosition = guesser.computeOccurenceByPosition();
            const occurenceBySequence = guesser.computeOccurenceBySequence();
            const occurenceByPattern = guesser.computeOccurenceByPattern();
            const nominatedChoices = rankPossibilities([
                ...generatePossibleDrawsFromPositions(byPositionReportDataForm(occurenceByPosition)),
                ...generatePossibleDrawsFromSequences(bySequenceReportDataForm(occurenceBySequence)),
                ...generatePossibleDrawsFromPatterns(byPatternReportDataForm(occurenceByPattern)),
            ], getOutcomes(history).map((draw) => draw.join("")));
            const byPositionReportData = byPositionReport(occurenceByPosition);
            const bySequenceReportData = bySequenceReport(occurenceBySequence);
            const byPatternReportData = byPatternReport(occurenceByPattern);
            const last10DrawsReportData = last10DrawsReport(guesser.getLatest10Draws());
            const embed = GuesserModelEmebds.results({
                nominatedChoices,
                byPositionReport: byPositionReportData,
                bySequenceReport: bySequenceReportData,
                byPatternReport: byPatternReportData,
                latestTop10Draws: last10DrawsReportData,
            });
            await interaction.editReply({ embeds: [embed] });
        }
        catch (err) {
            await interaction.editReply({
                content: `An error occured. Please check the logs.`,
            });
            console.log(err);
        }
    }
};
__decorate([
    Slash({
        description: "Will show report analysis for the draws from calottery.com",
        name: "guess",
    })
], Guess.prototype, "handler", null);
Guess = __decorate([
    Discord()
], Guess);
export { Guess };
