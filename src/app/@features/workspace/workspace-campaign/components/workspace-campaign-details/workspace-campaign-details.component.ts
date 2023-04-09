import { WorkspaceCampaignStateActions } from '@features/workspace/workspace-campaign/store/actions/campaign.action';
import { WorkspaceCampaignState } from './../../store/states/campaign.state';
import { Component, OnInit } from '@angular/core';
import { CampaignPaths } from '@shared/paths';
import { IBus } from '@shared/state-bus/IBus';
import { Campaign } from '@shared/features/campaign/models/campaign.model';
import { ActivatedRoute } from '@angular/router';
import { CampaignStatus } from '@shared/constants';

@Component({
  selector: 'app-workspace-campaign-details',
  templateUrl: './workspace-campaign-details.component.html',
  styleUrls: ['./workspace-campaign-details.component.scss'],
})
export class WorkspaceCampaignDetailsComponent implements OnInit {

  paths = {
    campaignsListPath: CampaignPaths.CampaignsListComponents,
    editCampaignPath: CampaignPaths.EditCampaignComponents,
  };
  campaignStatus = CampaignStatus;
  currentCampaign: Campaign;
  constructor(private stateBus: IBus, private route: ActivatedRoute) {}

  deleteCampaign(id: string) {
    this.stateBus.excuteAction(new WorkspaceCampaignStateActions.Delete(id, true));
  }
  ngOnInit(): void {
    const campaignId = this.route.snapshot.paramMap.get('id')!;
    this.currentCampaign = this.stateBus.getSnapshot(WorkspaceCampaignState.getCampaignById(campaignId))!;
  }
}
