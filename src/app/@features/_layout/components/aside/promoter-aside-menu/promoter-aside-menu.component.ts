import { PromoterCampaignPaths } from './../../../../promoter/paths/promoter-campaign.constants';
import { Component, OnInit } from '@angular/core';
import { PromoterSettingsPaths } from '@features/promoter/paths';

@Component({
  selector: 'app-promoter-aside-menu',
  templateUrl: './promoter-aside-menu.component.html',
  styleUrls: ['./promoter-aside-menu.component.scss']
})
export class PromoterAsideMenuComponent  {
  paths ={
    account : PromoterSettingsPaths.accountComponents,
    payment : PromoterSettingsPaths.paymentComponents,
    profile : PromoterSettingsPaths.profileComponents,
    campaignsList: PromoterCampaignPaths.listComponents,
    campaignDetails: PromoterCampaignPaths.detailsComponents,
    browseCampaigns: PromoterCampaignPaths.browseComponents,
  }
  constructor() { }

}
