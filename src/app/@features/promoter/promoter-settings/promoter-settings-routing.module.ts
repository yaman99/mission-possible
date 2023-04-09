import { AccountFormComponent } from './components/promoter-account/account-form.component';
import { PromoterSettingsComponent } from './promoter-settings.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PromoterSettingsPaths } from '../paths';
import { PromoterProfileComponent } from './components/promoter-profile/promoter-profile.component';
import { PromoterPaymentComponent } from './components/promoter-payment/promoter-payment.component';

const routes: Routes = [
  {
    path:'',
    component:PromoterSettingsComponent,
    children:[
      {
        path:PromoterSettingsPaths.account,
        component: AccountFormComponent
      },
      {
        path:PromoterSettingsPaths.profile,
        component: PromoterProfileComponent
      },
      {
        path:PromoterSettingsPaths.payment,
        component: PromoterPaymentComponent
      },
      {
        path: '',
        redirectTo: PromoterSettingsPaths.profile,
        pathMatch: 'full',
      },
      {
        path: '**',
        redirectTo: 'error/404',
      },
    ]
  },
  {
    path: '',
    redirectTo: PromoterSettingsPaths.profile,
    pathMatch: 'full',
  },
  {
    path: '**',
    redirectTo: 'error/404',
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PromoterSettingsRoutingModule { }
