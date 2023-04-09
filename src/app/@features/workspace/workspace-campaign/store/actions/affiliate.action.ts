import { GetCampaignAffiliatesRequest } from "../../models/requests/getCampaignAffiliatesRequest";

export namespace AffiliateStateActions {
  export class GetAll {
    static readonly type = '[Affiliate] Get Campaign Promoters';
    constructor(public payload: GetCampaignAffiliatesRequest) {}
  }
}
