import { PromoterStateActions } from '@features/promoter/_store/actions/promoter-state.actions';
import { ApplyOnCampaignRequest } from './../../models/requests/applyOnCampaignRequest';
import { PromoterState } from './../../../_store/states/promoter.state';
import { IBus } from '@shared/state-bus/IBus';
import { ActivatedRoute } from '@angular/router';
import { Observable, tap, Subscription, BehaviorSubject } from 'rxjs';
import { PromoterCampaign } from './../../models/promoter-campaign.model';
import { Component, OnInit, OnDestroy, AfterViewInit } from '@angular/core';
import { PromoterCampaignPaths } from '@features/promoter/paths';
import { Select } from '@ngxs/store';
import { PromoterCampaignState } from '../../store/states/promoter-campaign.state';
import { PromoterCampaignStateActions } from '../../store/actions/promoter-camapign-state.actions';
import { CheckIfPromoterAppliedRequest } from '../../models/requests/checkIfPromoterAppliedRequest';
import { PromoterCampaignHttpService } from '../../services/promoter-campaign-http.service';
import { CountriesDataService } from '@shared/data/countries/services/countries-data.service';
import { CategoriesDataService } from '@shared/data/categories/services/categories-data.service';

@Component({
  selector: 'app-promoter-campaigns-details',
  templateUrl: './promoter-campaigns-details.component.html',
  styleUrls: ['./promoter-campaigns-details.component.scss'],
})
export class PromoterCampaignsDetailsComponent implements OnInit, OnDestroy, AfterViewInit {
  subscriptions: Subscription[] = [];
  paths = {
    browseCampaigns: PromoterCampaignPaths.browseComponents,
  };
  campaignId: string;
  promoterId: string;
  isApplied: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);
  currentCampaign$: Observable<PromoterCampaign | undefined>;
  loadingWhileChecking = new BehaviorSubject(false);
  constructor(
    private route: ActivatedRoute,
    private stateBus: IBus,
    private promoterhttp: PromoterCampaignHttpService,
    private categories: CategoriesDataService,
    private countriesDate: CountriesDataService
  ) {
    this.campaignId = this.route.snapshot.paramMap.get('id')!;
    this.stateBus.excuteAction(new PromoterCampaignStateActions.Details(this.campaignId));
  }
  ngAfterViewInit(): void {
    this.checkIfPromoterApplied();
  }

  ngOnInit(): void {
    this.currentCampaign$ = this.stateBus.getState(
      PromoterCampaignState.getCampaign(this.campaignId)
    );
    this.promoterId = this.stateBus.getSnapshot(PromoterState.promoterId);
  }
  checkIfPromoterApplied() {
    this.loadingWhileChecking.next(true);
    let checkModel: CheckIfPromoterAppliedRequest = {
      promoterId: this.promoterId,
      campaignId: this.campaignId,
    };
    const sub = this.promoterhttp.checkIfApplied(checkModel).subscribe({
      next: (res) => {
        this.isApplied.next(res);
      },
    });
    this.loadingWhileChecking.next(false);
    this.subscriptions.push(sub);
  }
  applyToCampaign() {
    let model: ApplyOnCampaignRequest = {
      campaign: this.campaignId,
      promoter: this.promoterId,
    };
    this.stateBus.excuteAction(new PromoterCampaignStateActions.Apply(model));
  }
  ngOnDestroy(): void {
    this.subscriptions.forEach((x) => x.unsubscribe());
  }

  getCategoryName(categoryCode: string) {
    return this.categories.getName(categoryCode);
  }

  getCountryName(countryCode: string) {
    return this.countriesDate.getName(countryCode);
  }
}
