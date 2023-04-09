import { PromoterCampaignsListComponent } from './components/promoter-campaigns-list/promoter-campaigns-list.component';
import { PromoterBrowseCampaignComponent } from './components/promoter-browse-campaign/promoter-browse-campaign.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PromoterCampaignPaths } from '../paths/promoter-campaign.constants';
import { PromoterCampaignsDetailsComponent } from './components/promoter-campaigns-details/promoter-campaigns-details.component';
import { PromoterCampaignOverviewComponent } from './components/promoter-campaign-overview/promoter-campaign-overview.component';

const routes: Routes = [
  {
    path: PromoterCampaignPaths.browse,
    component: PromoterBrowseCampaignComponent,
  },
  {
    path: PromoterCampaignPaths.browse + '/:id',
    component: PromoterCampaignsDetailsComponent,
  },
  {
    path: PromoterCampaignPaths.list,
    component: PromoterCampaignsListComponent,
  },
  {
    path: PromoterCampaignPaths.list + '/:id',
    component: PromoterCampaignOverviewComponent,
  },
  {
    path: '',
    redirectTo: PromoterCampaignPaths.list,
    pathMatch: 'full',
  },
  {
    path: '**',
    redirectTo: 'error/404',
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PromoterCampaignRoutingModule {}
