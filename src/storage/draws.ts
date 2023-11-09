import * as fs from "fs";
import { ColotteryN } from "../types/api.js";
import ColotteryApiWrapper from "../api/colottery.js";
import { mergeAndRemoveDuplicates } from "../reducers/combine.js";

export default class DrawsHistoryStorageHandler {
  private static readonly storage_path = "./storage/draws.json";

  public static async actualize() {
    const history = DrawsHistoryStorageHandler.getAllDraws();
    const draws = await ColotteryApiWrapper.getAllPastDraws();

    DrawsHistoryStorageHandler.clear();
    DrawsHistoryStorageHandler.saveDraws(
      mergeAndRemoveDuplicates(history, draws),
    );
    DrawsHistoryStorageHandler.sort();
  }

  public static sort() {
    if (fs.existsSync(DrawsHistoryStorageHandler.storage_path)) {
      const content = JSON.parse(
        fs.readFileSync(DrawsHistoryStorageHandler.storage_path).toString(),
      ) as Array<ColotteryN.DrawOutcomeT>;

      const ordered_by_time = content.sort((first, second) => {
        if (first.drawSerial <= second.drawSerial) {
          return 1;
        } else {
          return -1;
        }
      });
      fs.writeFileSync(
        DrawsHistoryStorageHandler.storage_path,
        JSON.stringify([...ordered_by_time]),
      );
    }
  }

  public static clear() {
    if (fs.existsSync(DrawsHistoryStorageHandler.storage_path)) {
      fs.writeFileSync(
        DrawsHistoryStorageHandler.storage_path,
        JSON.stringify([]),
      );
    }
  }

  public static saveDraws(data: Array<ColotteryN.DrawOutcomeT>) {
    if (fs.existsSync(DrawsHistoryStorageHandler.storage_path)) {
      const content = JSON.parse(
        fs.readFileSync(DrawsHistoryStorageHandler.storage_path).toString(),
      ) as Array<ColotteryN.DrawOutcomeT>;
      fs.writeFileSync(
        DrawsHistoryStorageHandler.storage_path,
        JSON.stringify([...content, ...data]),
      );
    } else {
      fs.writeFileSync(
        DrawsHistoryStorageHandler.storage_path,
        JSON.stringify(data),
      );
    }

    DrawsHistoryStorageHandler.sort();
  }

  public static getAllDraws(): Array<ColotteryN.DrawOutcomeT> {
    let content = JSON.parse(
      fs.readFileSync(DrawsHistoryStorageHandler.storage_path).toString(),
    ) as Array<ColotteryN.DrawOutcomeT>;

    return content;
  }
  public static getLatestDraw(): ColotteryN.DrawOutcomeT {
    let content = JSON.parse(
      fs.readFileSync(DrawsHistoryStorageHandler.storage_path).toString(),
    ) as Array<ColotteryN.DrawOutcomeT>;

    return content[0];
  }
}
