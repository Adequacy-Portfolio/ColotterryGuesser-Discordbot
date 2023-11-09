export namespace ColotteryN {
  export type DrawOutcomeT = {
    drawTime: Date;
    drawNumber: [number, number, number];
    drawSerial: number;
  };

  export interface APIReponseT {
    DrawGameId: number;
    Name: string;
    NextDraw: {
      DrawNumber: number;
      DrawDate: string;
      DrawCloseTime: string | null;
      JackpotAmount: number | null;
      EstimatedCashValue: number | null;
      WinningNumbers: Record<
        string,
        {
          Number: string;
          IsSpecial: boolean;
          Name: string | null;
        }
      >;
      Prizes: Record<
        string,
        {
          PrizeTypeDescription: string;
          Count: number;
          Amount: number;
        }
      >;
      WinningRetailers: any[]; // You may want to define a type for this array
      RaceTime: string | null;
      DrawCloseDateTime: string | null;
    };
    HasJackpot: boolean;
    TotalPreviousDraws: number;
    LastWinningStraightPrizeAmount: number | null;
    MostRecentDraw: {
      DrawNumber: number;
      DrawDate: string;
      DrawCloseTime: string;
      JackpotAmount: number;
      EstimatedCashValue: number | null;
      WinningNumbers: Record<
        string,
        {
          Number: string;
          IsSpecial: boolean;
          Name: string | null;
        }
      >;
      Prizes: Record<
        string,
        {
          PrizeTypeDescription: string;
          Count: number;
          Amount: number;
        }
      >;
      WinningRetailers: any[]; // You may want to define a type for this array
      RaceTime: string | null;
      DrawCloseDateTime: string;
    };
    PreviousDraws: {
      DrawNumber: number;
      DrawDate: string;
      DrawCloseTime: string;
      JackpotAmount: number;
      EstimatedCashValue: number | null;
      WinningNumbers: Record<
        string,
        {
          Number: string;
          IsSpecial: boolean;
          Name: string | null;
        }
      >;
      Prizes: Record<
        string,
        {
          PrizeTypeDescription: string;
          Count: number;
          Amount: number;
        }
      >;
      WinningRetailers: any[]; // You may want to define a type for this array
      RaceTime: string | null;
      DrawCloseDateTime: string;
    }[];
  }

  export interface DrawObjectI {
    DrawNumber: number;
    DrawDate: string;
    WinningNumbers: {
      [key: string]: {
        Number: string;
        IsSpecial: boolean;
        Name: string | null;
      };
    };
  }
}
