import fetchConfig from "./fetch.js";
export default class ColotteryApiWrapper {
    static past_draw_endpoint = "https://www.calottery.com/api/DrawGameApi/DrawGamePastDrawResults/<game>/<page>/<result_size>";
    static games = {
        Daily3: 9,
    };
    static async getMostRecentDraw() {
        const draws = await ColotteryApiWrapper.getPastDraws(ColotteryApiWrapper.games.Daily3);
        const most_recent_draw = draws.MostRecentDraw;
        return {
            drawTime: new Date(most_recent_draw.DrawDate),
            drawNumber: [
                Number(most_recent_draw.WinningNumbers["1"].Number),
                Number(most_recent_draw.WinningNumbers["2"].Number),
                Number(most_recent_draw.WinningNumbers["3"].Number),
            ],
        };
    }
    static async getPastDraws(game, page = 1, result_size = 20) {
        ColotteryApiWrapper.past_draw_endpoint =
            ColotteryApiWrapper.past_draw_endpoint
                .replace("<game>", String(game))
                .replace("<page>", String(page))
                .replace("<result_size>", String(result_size));
        const response = await fetch(ColotteryApiWrapper.past_draw_endpoint, fetchConfig);
        return await response.json();
    }
    static async getAllPastDraws() {
        let all_previous_draws = [];
        for (let i = 1; i <= 19; i++) {
            console.log(i);
            const draws = await ColotteryApiWrapper.getPastDraws(ColotteryApiWrapper.games.Daily3, i);
            console.log(JSON.stringify(draws));
            const previous_draws = draws["PreviousDraws"];
            console.log(JSON.stringify(previous_draws));
            all_previous_draws = [...previous_draws, ...all_previous_draws];
        }
        const draw_outcomes = [];
        for (const entry of all_previous_draws) {
            const drawDate = new Date(entry.DrawDate);
            const winningNumbers = [
                Number(entry.WinningNumbers["1"].Number),
                Number(entry.WinningNumbers["2"].Number),
                Number(entry.WinningNumbers["3"].Number),
            ];
            draw_outcomes.push({
                drawTime: drawDate,
                drawNumber: winningNumbers,
            });
        }
        return draw_outcomes;
    }
}
