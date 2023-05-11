import { NgxsModule } from '@ngxs/store';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CoordinatorRoutingModule } from './coordinator-routing.module';
import { DashbaordComponent } from './dashbaord/dashbaord.component';
import { SharedModule } from '@shared/shared.module';
import { CoordinatorComponent } from './coordinator.component';
import { RequestManagementComponent } from './request-management/request-management.component';
import { NotificationsComponent } from './notifications/notifications.component';
import { AnnouncementsComponent } from './announcements/announcements.component';
import { MessagesComponent } from './messages/messages.component';
import { AddAnnouncementComponent } from './announcements/add-announcement/add-announcement.component';
import { AnnouncementsListComponent } from './announcements/announcements-list/announcements-list.component';

@NgModule({
  declarations: [DashbaordComponent , CoordinatorComponent, RequestManagementComponent, NotificationsComponent, AnnouncementsComponent, MessagesComponent, AddAnnouncementComponent, AnnouncementsListComponent],
  imports: [
    SharedModule,
    CoordinatorRoutingModule,
    // NgxsModule.forFeature([]),
  ],
})
export class CoordinatorModule {}
