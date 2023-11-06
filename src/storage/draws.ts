import * as fs from 'fs';
import { ColotteryN } from '../types/api.js'

export default class DrawsHistoryStorageHandler {
    private static readonly storage_path = './storage/draws.json'

    public static saveDraws(data: Array<ColotteryN.DrawOutcomeT>) {
        if (fs.existsSync(DrawsHistoryStorageHandler.storage_path)) {
            const content = JSON.parse(fs.readFileSync(DrawsHistoryStorageHandler.storage_path).toString()) as Array<ColotteryN.DrawOutcomeT>
            fs.writeFileSync(
                DrawsHistoryStorageHandler.storage_path,
                JSON.stringify(
                    [...content, ...data]
                )
            )
        } else {
            fs.writeFileSync(
                DrawsHistoryStorageHandler.storage_path,
                JSON.stringify(data)
            )
        }
    }

    public static getAllDraws(): Array<ColotteryN.DrawOutcomeT> {
        let content = JSON.parse(fs.readFileSync(DrawsHistoryStorageHandler.storage_path).toString()) as Array<ColotteryN.DrawOutcomeT>

        return content
    }
    public static getLatestDraw(): ColotteryN.DrawOutcomeT {
        let content = JSON.parse(fs.readFileSync(DrawsHistoryStorageHandler.storage_path).toString()) as Array<ColotteryN.DrawOutcomeT>

        content = content.sort((first, second) => {
            const a = new Date(first.drawTime)
            const b = new Date(second.drawTime)
            if (a.getTime() <= b.getTime()) {
                return 1
            } else {
                return -1
            }
        })

        return content[0]

    }
}