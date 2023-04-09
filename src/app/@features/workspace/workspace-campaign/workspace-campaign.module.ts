import { AffiliateState } from './store/states/affiliate.state';
import { WidgetsModule } from '@shared/partials/content/widgets/widgets.module';
import { WorkspaceCampaignState } from './store/states/campaign.state';
import { NgxsModule } from '@ngxs/store';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { WorkspaceCampaignRoutingModule } from './workspace-campaign-routing.module';
import { WorkspaceCampaignFormComponent } from './components/workspace-campaign-form/workspace-campaign-form.component';
import { WorkspaceCampaignsListComponent } from './components/workspace-campaigns-list/workspace-campaigns-list.component';
import { WorkspaceCampaignDetailsComponent } from './components/workspace-campaign-details/workspace-campaign-details.component';
import { SharedModule } from '@shared/shared.module';
import { WorkspaceItemState } from '../workspace-items/store/states/item.state';
import { ReviewCampaignComponent } from './components/workspace-campaign-form/review-campaign/review-campaign.component';
import { WorkspaceCampaignOverviewComponent } from './components/workspace-campaign-details/workspace-campaign-overview/workspace-campaign-overview.component';
import { WorkspaceCampaignPromotersComponent } from './components/workspace-campaign-details/workspace-campaign-promoters/workspace-campaign-promoters.component';
import { WorkspaceCampaignConversionsComponent } from './components/workspace-campaign-details/workspace-campaign-conversions/workspace-campaign-conversions.component';
import { ConversionState } from './store/states/conversion.state';
import { PopupsModule } from '@shared/components/popups/popups.module';

@NgModule({
  declarations: [
    WorkspaceCampaignFormComponent,
    WorkspaceCampaignsListComponent,
    WorkspaceCampaignDetailsComponent,
    ReviewCampaignComponent,
    WorkspaceCampaignOverviewComponent,
    WorkspaceCampaignPromotersComponent,
    WorkspaceCampaignConversionsComponent,
  ],
  imports: [
    SharedModule,
    WorkspaceCampaignRoutingModule,
    NgxsModule.forFeature([WorkspaceCampaignState, WorkspaceItemState, ConversionState , AffiliateState]),
    WidgetsModule,
    PopupsModule
  ],
  exports:[
    WorkspaceCampaignsListComponent
  ]
})
export class WorkspaceCampaignModule {}
