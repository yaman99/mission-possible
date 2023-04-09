import { PromoterConversionsState } from '@features/promoter/promoter-conversions/store/states/promoterConversionsState.state';
import { DashbaordComponent } from './dashbaord/dashbaord.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PromoterRoutingModule } from './promoter-routing.module';
import { SharedModule } from '@shared/shared.module';
import { NgxsModule } from '@ngxs/store';
import { PromoterState } from './_store/states/promoter.state';
import { PromoterComponent } from './promoter.component';
import { PopupsModule } from '@shared/components/popups/popups.module';
import { PromoterDashboardConversionsListComponent } from './dashbaord/components/promoter-dashboard-conversions-list/promoter-dashboard-conversions-list.component';
import { PromoterDashboardInsightsComponent } from './dashbaord/components/promoter-dashboard-insights/promoter-dashboard-insights.component';
import { PromoterWalletState } from './wallet/stateStore/state/promoterWallet.state';

@NgModule({
  declarations: [
    DashbaordComponent,
    PromoterComponent,
    PromoterDashboardConversionsListComponent,
    PromoterDashboardInsightsComponent,
  ],
  imports: [
    SharedModule,
    PromoterRoutingModule,
    NgxsModule.forFeature([PromoterConversionsState , PromoterWalletState]),
  ],
})
export class PromoterModule {}
