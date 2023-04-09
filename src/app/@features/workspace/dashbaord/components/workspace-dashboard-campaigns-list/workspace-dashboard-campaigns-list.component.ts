import { Component, OnInit, OnDestroy } from '@angular/core';
import { WorkspaceWalletStateActions } from '@features/workspace/settings/store/actions/workspaceWallet.actions';
import { changeApplicationStatusRequest } from '@features/workspace/workspace-campaign/models/requests/changeApplicationStatusRequest';
import { ChangeCampaignStatusRequest } from '@features/workspace/workspace-campaign/models/requests/changeCampaignStatusRequest';
import { GetWorkspaceCampaignsRequest } from '@features/workspace/workspace-campaign/models/requests/getWorkspaceCampaignsRequest';
import { WorkspaceCampaignStateActions } from '@features/workspace/workspace-campaign/store/actions/campaign.action';
import { WorkspaceCampaignState } from '@features/workspace/workspace-campaign/store/states/campaign.state';
import { WorkspaceState } from '@features/workspace/_store/states/workspace.state';
import { Select } from '@ngxs/store';
import { CampaignStatus } from '@shared/constants';
import { Campaign } from '@shared/features/campaign';
import { PagedResultBase } from '@shared/models/pagination';
import { CampaignPaths } from '@shared/paths';
import { IBus } from '@shared/state-bus/IBus';
import { Observable, Subscription } from 'rxjs';
import { WorkspaceDashboardStateActions } from '../../store/actions/workspaceDashbaord.action';

@Component({
  selector: 'app-workspace-dashboard-campaigns-list',
  templateUrl: './workspace-dashboard-campaigns-list.component.html',
  styleUrls: ['./workspace-dashboard-campaigns-list.component.scss'],
})
export class WorkspaceDashboardCampaignsListComponent implements OnInit, OnDestroy {
  @Select(WorkspaceCampaignState.campaigns) campaigns$: Observable<Campaign[]>;
  @Select(WorkspaceCampaignState.pagination) pagination$: Observable<PagedResultBase>;
  @Select(WorkspaceCampaignState.isLoading) loadingCampaign$: Observable<boolean>;
  workspaceId: string;
  subscribtion: Subscription[] = [];
  paths = {
    addCampaignPath: CampaignPaths.AddCampaignComponents,
    editCampaignPath: CampaignPaths.EditCampaignComponents,
    viewCampaignPath: CampaignPaths.ViewCampaignComponents,
  };
  campaignStatus = CampaignStatus;
  constructor(private stateBus: IBus) {}
  ngOnInit(): void {
    this.workspaceId = this.stateBus.getSnapshot(WorkspaceState.workspace).id;
    this.getPage(1);
  }
  ngOnDestroy(): void {
    this.subscribtion.forEach((x) => x.unsubscribe());
  }

  deleteCampaign(campaignId: string) {
    this.stateBus.excuteAction(new WorkspaceCampaignStateActions.Delete(campaignId, false));
  }
  getPage(page: number) {
    let model: GetWorkspaceCampaignsRequest = {
      workspace: this.workspaceId,
      pagination: {
        page: page,
        result: 10,
        orderBy: 'CreatedDate',
      },
    };
    this.stateBus.excuteAction(new WorkspaceCampaignStateActions.GetAll(model));

  }

  changeStatus(id: string, status: number) {
    let model: ChangeCampaignStatusRequest = {
      campaignId: id,
      status,
    };
    this.stateBus.excuteAction(new WorkspaceCampaignStateActions.ChangeStatus(model));
  }

  changeApplicationStatus(id: string, status: boolean) {
    let model: changeApplicationStatusRequest = {
      campaignId: id,
      status,
    };
    this.stateBus.excuteAction(new WorkspaceCampaignStateActions.ChangeApplicationStatus(model));
  }
}
