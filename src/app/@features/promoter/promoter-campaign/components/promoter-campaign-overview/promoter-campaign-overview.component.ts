import { CancelCampaignApplicationRequest } from './../../models/requests/cancelCampaignApplicationRequest';
import { ActivatedRoute } from '@angular/router';
import { IBus } from '@shared/state-bus/IBus';
import { Component, OnInit } from '@angular/core';
import { PromoterCampaignStateActions } from '../../store/actions/promoter-camapign-state.actions';
import { GetPromoterCampaignOverviewRequest } from '../../models/requests/getPromoterCampaignOverviewRequest';
import { PromoterState } from '@features/promoter/_store/states/promoter.state';
import { PromoterCampaignState } from '../../store/states/promoter-campaign.state';
import { PromoterCampaign } from '../../models/promoter-campaign.model';
import { Observable } from 'rxjs';
import { PromoterCampaignPaths } from '@features/promoter/paths';
import { AffiliateStatus, CampaignStatus } from '@shared/constants';
import { ApplyOnCampaignRequest } from '../../models/requests/applyOnCampaignRequest';
import { CategoriesDataService } from '@shared/data/categories/services/categories-data.service';
import { CountriesDataService } from '@shared/data/countries/services/countries-data.service';
import { NoticeService } from '@core/notification/notice.service';
import { AuthBaseState } from '@features/auth';
import { Select } from '@ngxs/store';
import { CommissionService } from '@shared/services/commission.service';

@Component({
  selector: 'app-promoter-campaign-overview',
  templateUrl: './promoter-campaign-overview.component.html',
  styleUrls: ['./promoter-campaign-overview.component.scss'],
})
export class PromoterCampaignOverviewComponent implements OnInit {
  @Select(PromoterCampaignState.isLoading) isLoading$: Observable<boolean>;
  paths = {
    campaignsList: PromoterCampaignPaths.listComponents,
  };
  campaignId: string;
  promoterId: string;
  currentCampaign$: Observable<PromoterCampaign | undefined>;
  campaignStatus = CampaignStatus;
  constructor(
    private stateBus: IBus,
    private route: ActivatedRoute,
    private categories: CategoriesDataService,
    private countriesDate: CountriesDataService,
    private notify: NoticeService,
    private commissionService:CommissionService
  ) {}

  ngOnInit(): void {
    this.campaignId = this.route.snapshot.paramMap.get('id')!;
    this.promoterId = this.stateBus.getSnapshot(PromoterState.promoterId);
    let model: GetPromoterCampaignOverviewRequest = {
      campaignId: this.campaignId,
      promoterId: this.promoterId,
    };
    this.stateBus.excuteAction(new PromoterCampaignStateActions.Overview(model));

    this.currentCampaign$ = this.stateBus.getState(
      PromoterCampaignState.getCampaign(this.campaignId)
    );
  }
  cancelApplication() {
    let model: CancelCampaignApplicationRequest = {
      campaign: this.campaignId,
      promoter: this.promoterId,
    };
    console.log(model);

    this.stateBus.excuteAction(new PromoterCampaignStateActions.Cancel(model));
  }
  applyToCampaign() {
    let model: ApplyOnCampaignRequest = {
      campaign: this.campaignId,
      promoter: this.promoterId,
    };
    this.stateBus.excuteAction(new PromoterCampaignStateActions.Apply(model));
  }

  getCategoryName(categoryCode: string) {
    return this.categories.getName(categoryCode);
  }

  getCountryName(countryCode: string) {
    return this.countriesDate.getName(countryCode);
  }

  copyUrl(campaignId: string, itemUrl: string) {
    const affiliateId = this.stateBus.getSnapshot(AuthBaseState.getUser).id!;
    let url = `${itemUrl}?in_a=${affiliateId}&in_c=${campaignId}`;
    navigator.clipboard.writeText(decodeURIComponent(url));

    this.notify.fireToast('GENERAL.ALERT.SUCCESS.LINK_COPIED', 'success');
  }

  getCommission(amount:number , type:string){
    if(type === 'fixed'){
      return this.commissionService.getCommissionFixedPriceForPromoter(amount);
    }else{
      return this.commissionService.getCommissionPercentageForPromoter(amount);
    }
  }
}
