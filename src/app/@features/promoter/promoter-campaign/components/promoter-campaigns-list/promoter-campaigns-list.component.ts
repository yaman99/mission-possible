import { Component, OnInit } from '@angular/core';
import { NoticeService } from '@core/notification/notice.service';
import { AuthBaseState } from '@features/auth';
import { PromoterCampaignPaths } from '@features/promoter/paths';
import { PromoterState } from '@features/promoter/_store/states/promoter.state';
import { Select } from '@ngxs/store';
import { CampaignStatus } from '@shared/constants';
import { PagedResultBase } from '@shared/models/pagination';
import { IBus } from '@shared/state-bus/IBus';
import { Observable } from 'rxjs';
import { PromoterCampaign } from '../../models/promoter-campaign.model';
import { GetPromoterCampaignsRequest } from '../../models/requests/getPromoterCampaignsRequest';
import { PromoterCampaignStateActions } from '../../store/actions/promoter-camapign-state.actions';
import { PromoterCampaignState } from '../../store/states/promoter-campaign.state';

@Component({
  selector: 'app-promoter-campaigns-list',
  templateUrl: './promoter-campaigns-list.component.html',
  styleUrls: ['./promoter-campaigns-list.component.scss'],
})
export class PromoterCampaignsListComponent implements OnInit {
  @Select(PromoterCampaignState.campaigns) campaigns$: Observable<PromoterCampaign[]>;
  @Select(PromoterCampaignState.pagination) pagination$: Observable<PagedResultBase>;
  @Select(PromoterCampaignState.isLoading) loadingCampaign$: Observable<boolean>;
  paths = {
    campaignOverview: PromoterCampaignPaths.listComponents,
  };
  campaignStatus = CampaignStatus;
  constructor(private stateBus: IBus, private notify: NoticeService) {}

  ngOnInit(): void {
    this.getPage(1);
  }
  getPage(page: number) {
    const promoterId = this.stateBus.getSnapshot(PromoterState.promoterId);
    let model: GetPromoterCampaignsRequest = {
      promoterId,
      pagination: {
        page: page,
        result: 10,
        orderBy: 'CreatedDate',
      },
    };
    this.stateBus.excuteAction(new PromoterCampaignStateActions.Get(model));
  }
  copyUrl(campaignId: string, itemUrl: string) {
    const affiliateId = this.stateBus.getSnapshot(AuthBaseState.getUser).id!;
    let url = `${itemUrl}?in_a=${affiliateId}&in_c=${campaignId}`;
    navigator.clipboard.writeText(decodeURIComponent(url));

    this.notify.fireToast('GENERAL.ALERT.SUCCESS.LINK_COPIED' , 'success');
  }
}
