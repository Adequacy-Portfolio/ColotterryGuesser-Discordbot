import * as fs from "fs";
import fetchConfig from "./fetch.js";
import { ColotteryN } from "../types/api.js";
import DrawsHistoryStorageHandler from "../storage/draws.js";

export default class ColotteryApiWrapper {
  private static past_draw_endpoint =
    "https://www.calottery.com/api/DrawGameApi/DrawGamePastDrawResults/<game>/<page>/<result_size>";

  public static readonly games = {
    Daily3: 9,
  };

  public static async getMostRecentDraw(): Promise<ColotteryN.DrawOutcomeT> {
    const draws = await ColotteryApiWrapper.getPastDraws(
      ColotteryApiWrapper.games.Daily3,
    );
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

  public static async getPastDraws(
    game: number,
    page: number = 1,
    result_size: number = 20,
  ): Promise<ColotteryN.APIReponseT> {
    ColotteryApiWrapper.past_draw_endpoint =
      ColotteryApiWrapper.past_draw_endpoint
        .replace("<game>", String(game))
        .replace("<page>", String(page))
        .replace("<result_size>", String(result_size));

    const response = await fetch(
      ColotteryApiWrapper.past_draw_endpoint,
      fetchConfig,
    );

    return await response.json();
  }

  public static async getAllPastDraws(): Promise<
    Array<ColotteryN.DrawOutcomeT>
  > {
    let all_previous_draws: ColotteryN.DrawObjectI[] = [];
    for (let i = 1; i <= 19; i++) {
      console.log(i);
      const draws = await ColotteryApiWrapper.getPastDraws(
        ColotteryApiWrapper.games.Daily3,
        i,
      );
      console.log(JSON.stringify(draws));
      const previous_draws = draws["PreviousDraws"];
      console.log(JSON.stringify(previous_draws));
      all_previous_draws = [...previous_draws, ...all_previous_draws];
    }

    const draw_outcomes: ColotteryN.DrawOutcomeT[] = [];

    for (const entry of all_previous_draws) {
      const drawDate: Date = new Date(entry.DrawDate);
      const winningNumbers: [number, number, number] = [
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
