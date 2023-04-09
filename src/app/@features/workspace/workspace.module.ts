import { WorkspaceDashbaordState } from './dashbaord/store/states/workspaceDashboard.state';
import { WorkspaceState } from './_store/states/workspace.state';
import { NgxsModule } from '@ngxs/store';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { WorkspaceRoutingModule } from './workspace-routing.module';
import { DashbaordComponent } from './dashbaord/dashbaord.component';
import { SharedModule } from '@shared/shared.module';
import { WorkspaceComponent } from './workspace.component';
import { WorkspaceWalletState } from './settings/store/states/workspaceWallet.state';
import { WorkspaceCampaignModule } from './workspace-campaign/workspace-campaign.module';

@NgModule({
  declarations: [WorkspaceComponent],
  imports: [
    SharedModule,
    WorkspaceRoutingModule,
    NgxsModule.forFeature([WorkspaceWalletState]),
  ],
})
export class WorkspaceModule {}
