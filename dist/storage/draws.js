import * as fs from 'fs';
export default class DrawsHistoryStorageHandler {
    static storage_path = './storage/draws.json';
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
