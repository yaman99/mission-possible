import { NgxsModule } from '@ngxs/store';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CoordinatorRoutingModule } from './coordinator-routing.module';
import { DashbaordComponent } from './dashbaord/dashbaord.component';
import { SharedModule } from '@shared/shared.module';
import { CoordinatorComponent } from './coordinator.component';
import { RequestManagementComponent } from './request-management/request-management.component';

import { MessagesComponent } from './messages/messages.component';
import { OfficialLetterRequestsComponent } from './official-letter-requests/official-letter-requests.component';
import { NotificationsComponent } from './notifications/notifications.component';



@NgModule({
  declarations: [DashbaordComponent , CoordinatorComponent, RequestManagementComponent,NotificationsComponent ,MessagesComponent, OfficialLetterRequestsComponent, ],
  imports: [
    SharedModule,
    CoordinatorRoutingModule,
    NgxsModule.forFeature([]),
  ],
})
export class CoordinatorModule {}
