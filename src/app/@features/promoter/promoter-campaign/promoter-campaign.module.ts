import { NgxsModule } from '@ngxs/store';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PromoterCampaignRoutingModule } from './promoter-campaign-routing.module';
import { PromoterBrowseCampaignComponent } from './components/promoter-browse-campaign/promoter-browse-campaign.component';
import { PromoterCampaignsListComponent } from './components/promoter-campaigns-list/promoter-campaigns-list.component';
import { PromoterCampaignsDetailsComponent } from './components/promoter-campaigns-details/promoter-campaigns-details.component';
import { PromoterCampaignOverviewComponent } from './components/promoter-campaign-overview/promoter-campaign-overview.component';
import { SharedModule } from '@shared/shared.module';
import { PromoterCampaignState } from './store/states/promoter-campaign.state';
import { BrowseCampaignsFilterComponent } from './components/promoter-browse-campaign/browse-campaigns-filter/browse-campaigns-filter.component';

@NgModule({
  declarations: [
    PromoterBrowseCampaignComponent,
    PromoterCampaignsListComponent,
    PromoterCampaignsDetailsComponent,
    PromoterCampaignOverviewComponent,
    BrowseCampaignsFilterComponent,
  ],
  imports: [SharedModule, PromoterCampaignRoutingModule, NgxsModule.forFeature([PromoterCampaignState])],
})
export class PromoterCampaignModule {}
