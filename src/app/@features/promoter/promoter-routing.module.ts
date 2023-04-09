import { PromoterComponent } from './promoter.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashbaordComponent } from './dashbaord/dashbaord.component';
import { PromoterCampaignPaths, PromoterSettingsPaths } from './paths';

const routes: Routes = [
  {
    path: '',
    component: PromoterComponent,
    children: [
      {
        path: 'dashboard',
        component: DashbaordComponent,
      },
      {
        path: PromoterSettingsPaths.basePath,
        loadChildren: () => import('./promoter-settings/promoter-settings.module').then((m) => m.PromoterSettingsModule),
      },
      {
        path: PromoterCampaignPaths.basePath,
        loadChildren: () => import('./promoter-campaign/promoter-campaign.module').then((m) => m.PromoterCampaignModule),
      },
      {
        path: '',
        redirectTo: 'dashboard',
        pathMatch: 'full',
      },
      {
        path: '**',
        redirectTo: 'error/404',
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PromoterRoutingModule {}
