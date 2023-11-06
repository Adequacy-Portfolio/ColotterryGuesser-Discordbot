import * as fs from "fs";
import ColotteryApiWrapper from "../api/colottery.js";
export default class DrawsHistoryStorageHandler {
    static storage_path = "./storage/draws.json";
    static async actualize() {
        const history = DrawsHistoryStorageHandler.getAllDraws();
        const draws = await ColotteryApiWrapper.getAllPastDraws();
        const compound = [...history, ...draws].map((draw) => JSON.stringify(draw));
        const actualizedHistory = compound.filter((el, pos) => {
            return compound.indexOf(el) === pos;
        });
        return actualizedHistory.map((draw) => JSON.parse(draw));
    }
    static saveDraws(data) {
        if (fs.existsSync(DrawsHistoryStorageHandler.storage_path)) {
            const content = JSON.parse(fs.readFileSync(DrawsHistoryStorageHandler.storage_path).toString());
            fs.writeFileSync(DrawsHistoryStorageHandler.storage_path, JSON.stringify([...content, ...data]));
        }
        else {
            fs.writeFileSync(DrawsHistoryStorageHandler.storage_path, JSON.stringify(data));
        }
    }
    static getAllDraws() {
        let content = JSON.parse(fs.readFileSync(DrawsHistoryStorageHandler.storage_path).toString());
        return content;
    }
    static getLatestDraw() {
        let content = JSON.parse(fs.readFileSync(DrawsHistoryStorageHandler.storage_path).toString());
        content = content.sort((first, second) => {
            const a = new Date(first.drawTime);
            const b = new Date(second.drawTime);
            if (a.getTime() <= b.getTime()) {
                return 1;
            }
            else {
                return -1;
            }
        });
        return content[0];
    }
}
