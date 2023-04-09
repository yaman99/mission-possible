import { BrowseCampaignsFilterService } from './../../services/browse-campaigns-filter.service';
import { PromoterCampaignPaths } from './../../../paths/promoter-campaign.constants';
import { Observable } from 'rxjs';
import { PromoterCampaignState } from './../../store/states/promoter-campaign.state';
import { PromoterState } from './../../../_store/states/promoter.state';
import { BrowseCampaignsRequest } from './../../models/requests/browseCampaignsRequest';
import { BrowseCampaignFilter } from './../../models/browse-campaign-filter.model';
import { IBus } from '@shared/state-bus/IBus';
import { Component, OnInit } from '@angular/core';
import { CategoriesDataService } from '@shared/data/categories/services/categories-data.service';
import { CategoriesModel } from '@shared/data/categories/categoriesModel';
import { PromoterCampaignStateActions } from '../../store/actions/promoter-camapign-state.actions';
import { Select } from '@ngxs/store';
import { PromoterCampaign } from '../../models/promoter-campaign.model';
import { PagedResultBase } from '@shared/models/pagination';

@Component({
  selector: 'app-promoter-browse-campaign',
  templateUrl: './promoter-browse-campaign.component.html',
  styleUrls: ['./promoter-browse-campaign.component.scss'],
})
export class PromoterBrowseCampaignComponent implements OnInit {
  paths = {
    campaignDetails: PromoterCampaignPaths.browseComponents,
  };
  CategoriesIsCollapsed = false;
  CommissionTypeCollapsed = false;
  categories: CategoriesModel[];

  @Select(PromoterCampaignState.campaigns) campaigns$: Observable<PromoterCampaign[]>;
  @Select(PromoterCampaignState.pagination) pagination$: Observable<PagedResultBase>;

  constructor(private categoriesData: CategoriesDataService, private stateBus: IBus, private campaignFilter: BrowseCampaignsFilterService) {}

  ngOnInit(): void {
    this.categories = this.categoriesData.categories;
    this.getPage(1);
  }
  checkIfCategorySelected(code: string) {
    return this.campaignFilter.filter.categories.includes(code);
  }
  checkIfCommissionSelected(type: string) {
    return this.campaignFilter.filter.commissionType.includes(type);
  }
  selecteCategory(code: string) {
    this.campaignFilter.selecteCategory(code);
    this.getPage(1);
  }
  selectCommissionType(type: string) {
    this.campaignFilter.selectCommission(type);
    this.getPage(1);
  }
  getPage(page: number) {
    // const promoterId = this.stateBus.getSnapshout(PromoterState.promoterId);
    let model: BrowseCampaignsRequest = {
      filter: this.campaignFilter.filter,
      pagination: {
        page: page,
        result: 10,
        orderBy: 'CreatedDate',
      },
    };
    this.stateBus.excuteAction(new PromoterCampaignStateActions.Browse(model));
  }
}
