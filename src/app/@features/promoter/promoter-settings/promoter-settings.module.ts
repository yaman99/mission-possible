import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PromoterSettingsRoutingModule } from './promoter-settings-routing.module';
import { AccountFormComponent } from './components/promoter-account/account-form.component';
import { PromoterProfileComponent } from './components/promoter-profile/promoter-profile.component';
import { PromoterPaymentComponent } from './components/promoter-payment/promoter-payment.component';
import { PromoterSettingsComponent } from './promoter-settings.component';
import { SharedModule } from '@shared/shared.module';
import { TargetCountriesModalComponent } from './components/promoter-profile/target-countries-modal/target-countries-modal.component';
import { TargetCategoriesModalComponent } from './components/promoter-profile/target-categories-modal/target-categories-modal.component';
import { PaymentHistoryModalComponent } from './components/promoter-payment/payment-history-modal/payment-history-modal.component';
import { ProfileFormModalComponent } from './components/promoter-profile/profile-form-modal/profile-form-modal.component';
import { PopupsModule } from '@shared/components/popups/popups.module';


@NgModule({
  declarations: [
    AccountFormComponent,
    PromoterProfileComponent,
    PromoterPaymentComponent,
    PromoterSettingsComponent,
    TargetCountriesModalComponent,
    TargetCategoriesModalComponent,
    ProfileFormModalComponent,
    PaymentHistoryModalComponent,
  ],
  imports: [
    SharedModule,
    PromoterSettingsRoutingModule,
    PopupsModule
  ]
})
export class PromoterSettingsModule { }
