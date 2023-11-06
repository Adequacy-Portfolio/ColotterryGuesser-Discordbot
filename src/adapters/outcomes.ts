import { ColotteryN } from '../types/api.js'
import { GuesserModelN } from '../types/model.js'

export function getOutcomes(history: ColotteryN.DrawOutcomeT[]): GuesserModelN.LotteryOutcomeHistoryT {
    return history.map(draw => {
        return draw.drawNumber
    })
}