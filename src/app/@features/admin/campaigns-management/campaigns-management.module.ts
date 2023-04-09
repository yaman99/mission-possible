import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CampaignsManagementRoutingModule } from './campaigns-management-routing.module';
import { CampaignsManagementComponent } from './campaigns-management.component';


@NgModule({
  declarations: [
    CampaignsManagementComponent
  ],
  imports: [
    CommonModule,
    CampaignsManagementRoutingModule
  ]
})
export class CampaignsManagementModule { }
