import { NgModule } from "@angular/core";
import { AnnouncementsComponent } from "./announcements/announcements.component";
import { AddAnnouncementComponent } from "./announcements/add-announcement/add-announcement.component";
import { AnnouncementsListComponent } from "./announcements/announcements-list/announcements-list.component";
import { NotificationsComponent } from "./notifications/notifications.component";
import { SharedModule } from "@shared/shared.module";
import { CareerCenterRoutingModule } from "./careerCenter-routing.module";
import { CareerCenterComponent } from "./career-center.component";
import { SgkRequestsComponent } from './sgk-requests/sgk-requests.component';

@NgModule({
  declarations: [
    CareerCenterComponent,
    AddAnnouncementComponent,
    AnnouncementsComponent,
    AnnouncementsListComponent,
    NotificationsComponent,
    SgkRequestsComponent,

  ],
  imports: [
    SharedModule,
    CareerCenterRoutingModule,
    // NgxsModule.forFeature([]),
  ],
})


export class CareerCenterModule { }
