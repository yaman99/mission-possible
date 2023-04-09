import { ApproveConversionRequest } from '../../models/requests/changeConversionStatusRequest';
import { GetCampaignConversionsRequest } from '../../models/requests/getCampaignConversionsRequest';

export namespace ConversionStateActions {
  export class GetAll {
    static readonly type = '[Conversion] Get Campaign Conversions';
    constructor(public payload: GetCampaignConversionsRequest) {}
  }
  export class Approve {
    static readonly type = '[Conversion] Approve Conversion';
    constructor(public payload: ApproveConversionRequest) {}
  }
  export class Reject {
    static readonly type = '[Conversion] Reject Conversion';
    constructor(public conversionId: string) {}
  }
}
