export default class ColotteryApiWrapper {
  private static past_draw_endpoint =
    "https://www.calottery.com/api/DrawGameApi/DrawGamePastDrawResults/<game>/<page>/<result_size>";

  public static games = {
    Daily3: 9,
  };

  public static async getPastDraws(
    game: number,
    page?: number = 1,
    result_size?: number = 20,
  ) {
    ColotteryApiWrapper.past_draw_endpoint
      .replace("<game>", String(game))
      .replace("<page>", String(page))
      .replace("<result_size>", String(result_size));

    const response = await fetch(ColotteryApiWrapper.past_draw_endpoint, {
      headers: {
        accept: "*/*",
        "accept-language": "en-US,en;q=0.9",
        "sec-ch-ua":
          '"Chromium";v="118", "Microsoft Edge";v="118", "Not=A?Brand";v="99"',
        "sec-ch-ua-mobile": "?0",
        "sec-ch-ua-platform": '"Windows"',
        "sec-fetch-dest": "empty",
        "sec-fetch-mode": "cors",
        "sec-fetch-site": "same-origin",
        cookie:
          "ASP.NET_SessionId=5pjpp1cbl4zga01ofv53enfl; sxa_site=PWS; persistence=!Q/+ZYKJQmAaC+RlLP+2DzxQOIhaSXEq5HWL12QWbgvdvHuGarWsINh0KKIZOX0G1KzgWh/1+TNo9Lg==; _gid=GA1.2.2130354826.1699010641; TS0142f413=0115e471ae8aee27aa323584839e1f98a20bd648808dac7ba3eba4d702b903651d96f78ecab29cdb884dcdce8e272747d84ac6e2ec; SC_ANALYTICS_GLOBAL_COOKIE=33e736f7572e4c288906e7e4c8fe6680|True; _ga=GA1.1.335101317.1699010641; _ga_HC5FCF7MV5=GS1.1.1699010642.1.1.1699011578.0.0.0; TS012e8fcb=0115e471aec3e044a1308262c3298fa581f5ada7f952132fd5f56b837e78c45be7878ff06652c286cc6ac4d9dab8258498238446a8; TS01cd3c19=015bea3ff9a5e71fea0751f33d18d0ce40800dec3180e74b65eb7bba943f80b16d5d188ae9d1326481d962536e9dfbd51320aeb968",
        Referer: "https://www.calottery.com/draw-games/daily-3",
        "Referrer-Policy": "strict-origin-when-cross-origin",
      },
      body: null,
      method: "GET",
    });

    return response;
  }

  public static async getAllPastDraws() {}
}

console.log(
  await ColotteryApiWrapper.getPastDraws(ColotteryApiWrapper.games.Daily3),
);
