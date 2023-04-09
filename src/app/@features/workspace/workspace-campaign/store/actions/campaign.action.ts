import { AddNewCampaignRequest } from '../../models/requests/addNewCampaignRequest';
import { changeApplicationStatusRequest } from '../../models/requests/changeApplicationStatusRequest';
import { ChangeCampaignStatusRequest } from '../../models/requests/changeCampaignStatusRequest';
import { GetWorkspaceCampaignsRequest } from '../../models/requests/getWorkspaceCampaignsRequest';
import { UpdateCampaignRequest } from '../../models/requests/updateCampaignRequest';

export namespace WorkspaceCampaignStateActions {
  export class Create {
    static readonly type = '[Campaign] Add New Campaign';
    constructor(public payload: AddNewCampaignRequest) {}
  }
  export class Update {
    static readonly type = '[Campaign] Update Campaign';
    constructor(public payload: UpdateCampaignRequest) {}
  }
  export class Delete {
    static readonly type = '[Campaign] Delete Campaign';
    constructor(public campaignId: string, public navigate: boolean) {}
  }
  export class GetAll {
    static readonly type = '[Campaign] Get Workspace Campaigns';
    constructor(public payload: GetWorkspaceCampaignsRequest) {}
  }
  export class ChangeStatus {
    static readonly type = '[Campaign] Update Workspace Campaign Status';
    constructor(public payload: ChangeCampaignStatusRequest) {}
  }
  export class ChangeApplicationStatus {
    static readonly type = '[Campaign] Update Workspace Campaign Application Status';
    constructor(public payload: changeApplicationStatusRequest) {}
  }

  export class GetOverview {
    static readonly type = '[Campaign] Get Campaign Overview';
    constructor(public campaignId: string, public itemId: string) {}
  }
}
