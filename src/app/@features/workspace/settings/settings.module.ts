import { SharedModule } from './../../../@shared/shared.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SettingsComponent } from './settings.component';
import { AccountDetailsComponent } from './components/account-details/account-details.component';
import { WorkspaceDetailsComponent } from './components/workspace-details/workspace-details.component';
import { SettingsRoutingModule } from './settings-routing.module';
import { StoreIntegrationComponent } from './components/store-integration/store-integration.component';
import { StoresListComponent } from './components/store-integration/stores-list/stores-list.component';
import { IntegrationWithSallaComponent } from './components/store-integration/integration-with-salla/integration-with-salla.component';
import { IntegrationWithZidComponent } from './components/store-integration/integration-with-zid/integration-with-zid.component';
import { WorkspacePaymentComponent } from './components/workspace-payment/workspace-payment.component';
import { NgxsModule } from '@ngxs/store';
import { WorkspaceWalletState } from './store/states/workspaceWallet.state';
import { WorkspacePaymentHistoryModalComponent } from './components/workspace-payment/workspace-payment-history-modal/workspace-payment-history-modal.component';

@NgModule({
  declarations: [
    SettingsComponent,
    AccountDetailsComponent,
    WorkspaceDetailsComponent,
    StoreIntegrationComponent,
    StoresListComponent,
    IntegrationWithSallaComponent,
    IntegrationWithZidComponent,
    WorkspacePaymentComponent,
    WorkspacePaymentHistoryModalComponent,
  ],
  imports: [
    CommonModule,
    SharedModule,
    SettingsRoutingModule,
    NgxsModule.forFeature([WorkspaceWalletState]),
  ],
})
export class SettingsModule {}
