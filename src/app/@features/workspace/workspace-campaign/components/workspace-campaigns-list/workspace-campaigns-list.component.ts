import { Component, OnInit, OnDestroy } from '@angular/core';
import { WorkspaceState } from '@features/workspace/_store/states/workspace.state';
import { Select } from '@ngxs/store';
import { PagedResultBase } from '@shared/models/pagination';
import { CampaignPaths } from '@shared/paths';
import { IBus } from '@shared/state-bus/IBus';
import { Observable, Subscription } from 'rxjs';
import { Campaign } from '@shared/features/campaign/models/campaign.model';
import { changeApplicationStatusRequest } from '../../models/requests/changeApplicationStatusRequest';
import { ChangeCampaignStatusRequest } from '../../models/requests/changeCampaignStatusRequest';
import { GetWorkspaceCampaignsRequest } from '../../models/requests/getWorkspaceCampaignsRequest';
import { WorkspaceCampaignStateActions as WorkspaceCampaignStateActions } from '../../store/actions/campaign.action';
import { WorkspaceCampaignState } from '../../store/states/campaign.state';
import { CampaignStatus } from '@shared/constants';

@Component({
  selector: 'app-workspace-campaigns-list',
  templateUrl: './workspace-campaigns-list.component.html',
  styleUrls: ['./workspace-campaigns-list.component.scss'],
})
export class WorkspaceCampaignsListComponent implements OnInit, OnDestroy {
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
  ngOnDestroy(): void {
    this.subscribtion.forEach((x) => x.unsubscribe());
  }

  ngOnInit(): void {
    const sub = this.stateBus.getState(WorkspaceState.workspace).subscribe((data) => {
      console.log(data);
      this.workspaceId = data?.id;
    });
    this.subscribtion.push(sub);
    this.getPage(1);
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
