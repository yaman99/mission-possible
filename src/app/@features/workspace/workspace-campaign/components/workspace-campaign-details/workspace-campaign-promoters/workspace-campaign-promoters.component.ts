import { GetCampaignAffiliatesRequest } from './../../../models/requests/getCampaignAffiliatesRequest';
import { AffiliateState } from './../../../store/states/affiliate.state';
import { Component, OnInit } from '@angular/core';
import { Affiliate } from '@shared/features/affiliate/models/affiliate.model';
import { Observable } from 'rxjs';
import { PagedResultBase } from '@shared/models/pagination';
import { Select } from '@ngxs/store';
import { IBus } from '@shared/state-bus/IBus';
import { ActivatedRoute } from '@angular/router';
import { AffiliateStateActions } from '@features/workspace/workspace-campaign/store/actions/affiliate.action';
import { AffiliateStatus } from '@shared/constants';

@Component({
  selector: 'app-workspace-campaign-promoters',
  templateUrl: './workspace-campaign-promoters.component.html',
  styleUrls: ['./workspace-campaign-promoters.component.scss'],
})
export class WorkspaceCampaignPromotersComponent implements OnInit {
  @Select(AffiliateState.getAffiliates) affiliates$: Observable<Affiliate[]>;
  @Select(AffiliateState.pagination) pagination$: Observable<PagedResultBase>;
  @Select(AffiliateState.loading) isLoading$: Observable<boolean>;
  campaignId: string;
  // conversionStatus = AffiliateStatus;
  constructor(private stateBus: IBus, private route: ActivatedRoute) {}

  ngOnInit(): void {
    this.campaignId = this.route.parent?.snapshot.paramMap.get('id')!;
    this.getPage(1);
  }
  getAffiliateStatus(status: number) {
    switch (status) {
      case AffiliateStatus.canceled:
        return 'AFFILIATE.STATUS.CANCELED';
      case AffiliateStatus.active:
        return 'AFFILIATE.STATUS.ACTIVE';
      case AffiliateStatus.applied:
        return 'AFFILIATE.STATUS.APPLIED';
    }
  }
  getPage(page: number) {
    let model: GetCampaignAffiliatesRequest = {
      campaign: this.campaignId,
      pagination: {
        page: page,
        result: 10,
        orderBy: 'CreatedDate',
      },
    };
    this.stateBus.excuteAction(new AffiliateStateActions.GetAll(model));
  }

  // changeStatus(conversionId: string, status: number) {
  //   let model: ChangeAffiliateStatusRequest = {
  //     conversion: conversionId,
  //     status: status,
  //   };
  //   switch (status) {
  //     case AffiliateStatus.approved:
  //       this.stateBus.excuteAction(new AffiliateStateActions.Approve(model));
  //       break;
  //     case AffiliateStatus.rejected:
  //       this.stateBus.excuteAction(new AffiliateStateActions.Reject(model));
  //       break;
  //   }
  // }
}
