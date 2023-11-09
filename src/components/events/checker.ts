import { Client } from "discord.js";
import { Discord, On } from "discordx";
import { CronJob } from "cron";
import ColotteryApiWrapper from "../../api/colottery.js";
import DrawsHistoryStorageHandler from "../../storage/draws.js";

import dotenv from "dotenv";
dotenv.config();

@Discord()
export class Checker {
  @On({
    event: "ready",
  })
  async handler() {
    // await DrawsHistoryStorageHandler.actualize();

    async function checkForNewDraw() {
      const mostRecentDraw = await ColotteryApiWrapper.getMostRecentDraw();
      const mostRecentRegisteredDraw =
        DrawsHistoryStorageHandler.getLatestDraw();

      if (
        !(mostRecentRegisteredDraw.drawNumber === mostRecentDraw.drawNumber)
      ) {
        DrawsHistoryStorageHandler.saveDraws([mostRecentDraw]);
      }
    }

    const dailyBiCheck = [
      process.env.FIRST_CHECK!,
      process.env.SECOND_CHECK!,
    ].map((time) => {
      return new CronJob(time, async () => {
        await checkForNewDraw();
      });
    });

    for (const check of dailyBiCheck) {
      check.start();
      console.log(
        `A new job '${
          check.cronTime
        }' launched. Next run at [${check.nextDate()}].`,
      );
    }
  }
}
