import * as fs from "fs";
import ColotteryApiWrapper from "../api/colottery.js";
import { mergeAndRemoveDuplicates } from "../reducers/combine.js";
export default class DrawsHistoryStorageHandler {
    static storage_path = "./storage/draws.json";
    static async actualize() {
        const history = DrawsHistoryStorageHandler.getAllDraws();
        const draws = await ColotteryApiWrapper.getAllPastDraws();
        DrawsHistoryStorageHandler.clear();
        DrawsHistoryStorageHandler.saveDraws(mergeAndRemoveDuplicates(history, draws));
        DrawsHistoryStorageHandler.sort();
    }
    static sort() {
        if (fs.existsSync(DrawsHistoryStorageHandler.storage_path)) {
            const content = JSON.parse(fs.readFileSync(DrawsHistoryStorageHandler.storage_path).toString());
            const ordered_by_time = content.sort((first, second) => {
                if (first.drawSerial <= second.drawSerial) {
                    return 1;
                }
                else {
                    return -1;
                }
            });
            fs.writeFileSync(DrawsHistoryStorageHandler.storage_path, JSON.stringify([...ordered_by_time]));
        }
    }
    static clear() {
        if (fs.existsSync(DrawsHistoryStorageHandler.storage_path)) {
            fs.writeFileSync(DrawsHistoryStorageHandler.storage_path, JSON.stringify([]));
        }
    }
    static saveDraws(data) {
        if (fs.existsSync(DrawsHistoryStorageHandler.storage_path)) {
            const content = JSON.parse(fs.readFileSync(DrawsHistoryStorageHandler.storage_path).toString());
            fs.writeFileSync(DrawsHistoryStorageHandler.storage_path, JSON.stringify([...content, ...data]));
        }
        else {
            fs.writeFileSync(DrawsHistoryStorageHandler.storage_path, JSON.stringify(data));
        }
        DrawsHistoryStorageHandler.sort();
    }
    static getAllDraws() {
        let content = JSON.parse(fs.readFileSync(DrawsHistoryStorageHandler.storage_path).toString());
        return content;
    }
    static getLatestDraw() {
        let content = JSON.parse(fs.readFileSync(DrawsHistoryStorageHandler.storage_path).toString());
        return content[0];
    }
}
