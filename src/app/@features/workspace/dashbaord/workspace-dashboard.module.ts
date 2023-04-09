import { WorkspaceCampaignState } from '@features/workspace/workspace-campaign/store/states/campaign.state';
import { RouterModule, Routes } from '@angular/router';
import { NgxsModule } from '@ngxs/store';
import { WorkspaceCampaignModule } from './../workspace-campaign/workspace-campaign.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DashbaordComponent } from './dashbaord.component';
import { SharedModule } from '@shared/shared.module';
import { WorkspaceDashbaordState } from './store/states/workspaceDashboard.state';
import { WorkspaceDashboardCampaignsListComponent } from './components/workspace-dashboard-campaigns-list/workspace-dashboard-campaigns-list.component';

const routes: Routes = [
  {
    path: '',
    component: DashbaordComponent,
  },
];

@NgModule({
  declarations: [DashbaordComponent, WorkspaceDashboardCampaignsListComponent],
  imports: [
    RouterModule.forChild(routes),
    CommonModule,
    SharedModule,
    NgxsModule.forFeature([WorkspaceDashbaordState, WorkspaceCampaignState]),
  ],
})
export class WorkspaceDashboardModule {}
