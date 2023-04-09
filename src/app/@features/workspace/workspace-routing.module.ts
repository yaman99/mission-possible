import { SettingsComponent } from './settings/settings.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashbaordComponent } from './dashbaord/dashbaord.component';
import { WorkspaceComponent } from './workspace.component';
import { CampaignPaths, ItemPaths } from '@shared/paths';

const routes: Routes = [
  {
    path:'',
    component:WorkspaceComponent,
    children:[
      {
        path:'dashboard',
        loadChildren: () =>
          import('./dashbaord/workspace-dashboard.module').then((m) => m.WorkspaceDashboardModule),
      },
      {
        path:'settings',
        loadChildren: () =>
          import('./settings/settings.module').then((m) => m.SettingsModule),
      },
      {
        path:ItemPaths.ItemDefaultPath,
        loadChildren: () =>
          import('./workspace-items/workspace-items.module').then((m) => m.WorkspaceItemsModule),
      },
      {
        path:CampaignPaths.CampaignDefaultPath,
        loadChildren: () =>
          import('./workspace-campaign/workspace-campaign.module').then((m) => m.WorkspaceCampaignModule),
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
    ]
  },


];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class WorkspaceRoutingModule { }
