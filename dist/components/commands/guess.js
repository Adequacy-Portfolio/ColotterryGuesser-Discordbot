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
let Guess = class Guess {
    async handler(interaction) {
        await interaction.deferReply();
        const history = DrawsHistoryStorageHandler.getAllDraws();
        const guesser = new GuesserModel(getOutcomes(history));
        const byPositionReportData = byPositionReport(guesser.computeOccurenceByPosition());
        const bySequenceReportData = bySequenceReport(guesser.computeOccurenceBySequence());
        const byPatternReportData = byPatternReport(guesser.computeOccurenceByPattern());
        const last10DrawsReportData = last10DrawsReport(guesser.getLatest10Draws());
        const embed = GuesserModelEmebds.results({
            byPositionReport: byPositionReportData,
            bySequenceReport: bySequenceReportData,
            byPatternReport: byPatternReportData,
            latestTop10Draws: last10DrawsReportData,
        });
        await interaction.editReply({ embeds: [embed] });
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
