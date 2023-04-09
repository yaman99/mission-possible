import { Injectable } from '@angular/core';
import { PromoterState } from '@features/promoter/_store/states/promoter.state';
import { IBus } from '@shared/state-bus/IBus';
import { BrowseCampaignFilter } from '../models/browse-campaign-filter.model';

@Injectable({
  providedIn: 'root',
})
export class BrowseCampaignsFilterService {
  private _campaignFilter: BrowseCampaignFilter = new BrowseCampaignFilter();
  get filter() {
    return this._campaignFilter;
  }
  constructor(private stateBus: IBus) {
    this.initFilter();
  }
  initFilter() {
    const promoterCategories = this.stateBus.getSnapshot(PromoterState.promoter).targetCategories;
    this._campaignFilter = {
      categories: [...promoterCategories] ? [...promoterCategories] : [],
      commissionType: [],
    };
  }
  selecteCategory(code: string) {
    const index = this._campaignFilter.categories.findIndex((x) => x === code);
    if (index === -1) {
      this._campaignFilter.categories.push(code);
    } else {
      this._campaignFilter.categories.splice(index, 1);
    }
  }
  selectCommission(type: string) {
    const index = this._campaignFilter.commissionType.findIndex((x) => x === type);
    if (index === -1) {
      this._campaignFilter.commissionType.push(type);
    } else {
      this._campaignFilter.commissionType.splice(index, 1);
    }
  }
}
