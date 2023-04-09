import { CancelCampaignApplicationRequest } from './../../models/requests/cancelCampaignApplicationRequest';
import { ApplyOnCampaignRequest } from '../../models/requests/applyOnCampaignRequest';
import { BrowseCampaignsRequest } from '../../models/requests/browseCampaignsRequest';
import { GetPromoterCampaignsRequest } from '../../models/requests/getPromoterCampaignsRequest';
import { GetPromoterCampaignOverviewRequest } from '../../models/requests/getPromoterCampaignOverviewRequest';

export namespace PromoterCampaignStateActions {
  export class Get {
    static readonly type = '[Promoter] Get Promoter Campaigns';
    constructor(public payload: GetPromoterCampaignsRequest) {}
  }
  export class Details {
    static readonly type = '[Promoter] Get Campaign Details';
    constructor(public campaignId: string) {}
  }
  export class Browse {
    static readonly type = '[Promoter] Browse Promoter Campaigns';
    constructor(public payload: BrowseCampaignsRequest) {}
  }
  export class Overview {
    static readonly type = '[Promoter] Get Promoter Campaign Overview';
    constructor(public payload: GetPromoterCampaignOverviewRequest) {}
  }
  export class Apply {
    static readonly type = '[Promoter] Apply Promoter to Campaign';
    constructor(public payload:ApplyOnCampaignRequest) {}
  }
  export class Cancel {
    static readonly type = '[Promoter] Cancel Promoter to Campaign';
    constructor(public payload:CancelCampaignApplicationRequest) {}
  }
}
