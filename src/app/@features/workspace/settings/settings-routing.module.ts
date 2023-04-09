import { StoreIntegrationComponent } from './components/store-integration/store-integration.component';
import { SettingsComponent } from './settings.component';
import { WorkspaceDetailsComponent } from './components/workspace-details/workspace-details.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { AccountDetailsComponent } from './components/account-details/account-details.component';
import { WorkspaceSettingsPaths } from '../paths';
import { WorkspacePaymentComponent } from './components/workspace-payment/workspace-payment.component';

const routes: Routes = [
  {
    path:'',
    component:SettingsComponent,
    children:[
      {
        path:WorkspaceSettingsPaths.workspace,
        component:WorkspaceDetailsComponent
      },
      {
        path:WorkspaceSettingsPaths.account,
        component:AccountDetailsComponent
      },
      {
        path:WorkspaceSettingsPaths.integration,
        component:StoreIntegrationComponent
      },
      {
        path:WorkspaceSettingsPaths.payment,
        component:WorkspacePaymentComponent
      },
      {
        path: '',
        redirectTo: WorkspaceSettingsPaths.workspace,
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
    redirectTo: WorkspaceSettingsPaths.workspace,
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
export class SettingsRoutingModule { }
