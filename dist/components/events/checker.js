var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
import { Discord, On } from "discordx";
import { CronJob } from "cron";
import ColotteryApiWrapper from "../../api/colottery.js";
import DrawsHistoryStorageHandler from "../../storage/draws.js";
import dotenv from "dotenv";
dotenv.config();
let Checker = class Checker {
    async handler() {
        // await DrawsHistoryStorageHandler.actualize();
        async function checkForNewDraw() {
            const mostRecentDraw = await ColotteryApiWrapper.getMostRecentDraw();
            const mostRecentRegisteredDraw = DrawsHistoryStorageHandler.getLatestDraw();
            if (!(mostRecentRegisteredDraw.drawNumber === mostRecentDraw.drawNumber)) {
                DrawsHistoryStorageHandler.saveDraws([mostRecentDraw]);
            }
        }
        const dailyBiCheck = [
            process.env.FIRST_CHECK,
            process.env.SECOND_CHECK,
        ].map((time) => {
            return new CronJob(time, async () => {
                await checkForNewDraw();
            });
        });
        for (const check of dailyBiCheck) {
            check.start();
            console.log(`A new job '${check.cronTime}' launched. Next run at [${check.nextDate()}].`);
        }
    }
};
__decorate([
    On({
        event: "ready",
    })
], Checker.prototype, "handler", null);
Checker = __decorate([
    Discord()
], Checker);
export { Checker };
