import { byPositionReport, } from "./adapters/model.js";
import { getOutcomes } from "./adapters/outcomes.js";
import GuesserModel from "./model/guesser.js";
import DrawsHistoryStorageHandler from "./storage/draws.js";
const history = DrawsHistoryStorageHandler.getAllDraws();
const guesser = new GuesserModel(getOutcomes(history));
const stats = guesser.computeOccurenceByPosition();
const report = byPositionReport(stats);
console.log(report);
