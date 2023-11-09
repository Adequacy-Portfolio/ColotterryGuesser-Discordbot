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
            drawSerial: Number(most_recent_draw.DrawNumber),
        };
    }
    static async getPastDraws(game, page = 1, result_size = 20) {
        const past_draw_endpoint = ColotteryApiWrapper.past_draw_endpoint
            .replace("<game>", String(game))
            .replace("<page>", String(page))
            .replace("<result_size>", String(result_size));
        console.log("Grabbing data from " + past_draw_endpoint);
        const response = await fetch(past_draw_endpoint, fetchConfig);
        return await response.json();
    }
    static async getAllPastDraws() {
        let all_previous_draws = [];
        for (let i = 1; i <= 19; i++) {
            const draws = await ColotteryApiWrapper.getPastDraws(ColotteryApiWrapper.games.Daily3, i);
            const previous_draws = draws["PreviousDraws"];
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
            const drawSerial = Number(entry.DrawNumber);
            draw_outcomes.push({
                drawTime: drawDate,
                drawNumber: winningNumbers,
                drawSerial,
            });
        }
        return draw_outcomes;
    }
}
