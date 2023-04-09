import { WorkspaceCampaignConversionsComponent } from './components/workspace-campaign-details/workspace-campaign-conversions/workspace-campaign-conversions.component';
import { WorkspaceCampaignPromotersComponent } from './components/workspace-campaign-details/workspace-campaign-promoters/workspace-campaign-promoters.component';
import { WorkspaceCampaignOverviewComponent } from './components/workspace-campaign-details/workspace-campaign-overview/workspace-campaign-overview.component';
import { WorkspaceCampaignsListComponent } from './components/workspace-campaigns-list/workspace-campaigns-list.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { WorkspaceCampaignFormComponent } from './components/workspace-campaign-form/workspace-campaign-form.component';
import { WorkspaceCampaignDetailsComponent } from './components/workspace-campaign-details/workspace-campaign-details.component';
import { CampaignPaths } from '@shared/paths';

const routes: Routes = [
  {
    path: CampaignPaths.CampaignsList,
    component: WorkspaceCampaignsListComponent,
  },
  {
    path: CampaignPaths.AddCampaign,
    component: WorkspaceCampaignFormComponent,
  },
  {
    path: CampaignPaths.EditCampaign + '/:id',
    component: WorkspaceCampaignFormComponent,
  },
  {
    path: CampaignPaths.ViewCampaign + '/:id',
    component: WorkspaceCampaignDetailsComponent,
    children:[
      {
        path:'overview',
        component:WorkspaceCampaignOverviewComponent
      },
      {
        path:'promoters',
        component:WorkspaceCampaignPromotersComponent
      },
      {
        path:'conversions',
        component:WorkspaceCampaignConversionsComponent
      },

      {
        path: '',
        redirectTo: 'overview',
        pathMatch: 'full',
      },
      {
        path: '**',
        redirectTo: 'error/404',
      },
    ]
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class WorkspaceCampaignRoutingModule {}
