import { BrowserModule } from '@angular/platform-browser';
import { Observable, Observer, Subscription } from 'rxjs';
import { Component, Input, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Campaign } from '@shared/features/campaign/models/campaign.model';
import { WorkspaceCampaignStateActions } from '@features/workspace/workspace-campaign/store/actions/campaign.action';
import { WorkspaceCampaignState } from '@features/workspace/workspace-campaign/store/states/campaign.state';
import { Select } from '@ngxs/store';
import { IBus } from '@shared/state-bus/IBus';
import { CategoriesDataService } from '@shared/data/categories/services/categories-data.service';
import { CountriesDataService } from '@shared/data/countries/services/countries-data.service';

@Component({
  selector: 'app-workspace-campaign-overview',
  templateUrl: './workspace-campaign-overview.component.html',
  styleUrls: ['./workspace-campaign-overview.component.scss'],
})
export class WorkspaceCampaignOverviewComponent implements OnInit, OnDestroy {
  @Select(WorkspaceCampaignState.isLoading) isLoading$: Observable<boolean>;
  currentCampaign: Observable<Campaign>;
  campaignItem: string;
  subscription: Subscription[] = [];
  constructor(
    private stateBus: IBus,
    private route: ActivatedRoute,
    private categories: CategoriesDataService,
    private countriesDate: CountriesDataService
  ) {}
  ngOnDestroy(): void {
    this.subscription.forEach((x) => x.unsubscribe());
  }

  deleteCampaign(id: string) {}
  ngOnInit(): void {
    const campaignId = this.route.parent?.snapshot.paramMap.get('id')!;
    // this.campaignItem = this.stateBus.getSnapshot(
    //   WorkspaceCampaignState.getCampaignById(campaignId)
    // ).item;

    // this.stateBus.excuteAction(
    //   new WorkspaceCampaignStateActions.GetOverview(campaignId, this.campaignItem)
    // );

    /////////////////////
    const sub = this.stateBus
      .getStateOnce(WorkspaceCampaignState.getCampaignById(campaignId))
      .subscribe((data) => {
        this.stateBus.excuteAction(
          new WorkspaceCampaignStateActions.GetOverview(campaignId, data.item)
        );
      });
    this.currentCampaign = this.stateBus.getState(
      WorkspaceCampaignState.getCampaignById(campaignId)
    );

    this.subscription.push(sub);
  }
  getCategoryName(categoryCode: string) {
    return this.categories.getName(categoryCode);
  }

  getCountryName(countryCode: string) {
    return this.countriesDate.getName(countryCode);
  }
}
