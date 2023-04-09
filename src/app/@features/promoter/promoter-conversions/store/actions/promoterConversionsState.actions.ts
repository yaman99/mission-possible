import { GetPromoterConversionsRequest } from "../../models/Requests/getPromoterConversionsRequest";

export namespace PromoterConversionsStateActions {
  export class Get {
    static readonly type = '[Promoter Conversions] Get Promoter Conversions';
    constructor(public payload: GetPromoterConversionsRequest) {}
  }
}
