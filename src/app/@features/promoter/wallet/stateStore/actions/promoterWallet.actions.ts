import { GetPromoterPaymentHistoryRequest } from "../../models/getPromoterPaymentHistoryRequest";

export namespace PromoterWalletStateActions{
  export class GetProfit {
    static readonly type = '[PromoterWallet] Get Balance';
    constructor(public PromoterId: string) {}
  }
  export class GetPaymentHistory {
    static readonly type = '[PromoterWallet] Get Payment History';
    constructor(public payload: GetPromoterPaymentHistoryRequest) {}
  }
}
