import { NgModule } from "@angular/core";
import { AnnouncementsComponent } from "./announcements/announcements.component";
import { InternshipApplicationsComponent } from "./internship-applications/internship-applications.component";
import { MessagesComponent } from "./messages/messages.component";
import { NotificationsComponent } from "./notifications/notifications.component";
import { StudentComponent } from "./student.component";
import { SharedModule } from "@shared/shared.module";
import { StudentRoutingModule } from "./student-routing.module"
import { InternshiAppplicationsListComponent } from "./internship-applications/internship-appplications-list/internshi-appplications-list.component";
import { OfficialLetterComponent } from './official-letter/official-letter.component';
import { AddApplicationComponent } from './internship-applications/add-application/add-application.component';
import { ListComponent } from './official-letter/list/list.component';
import { AddComponent } from './official-letter/add/add.component';

@NgModule({
  declarations: [InternshipApplicationsComponent,
    StudentComponent,
    MessagesComponent,
    NotificationsComponent,
    AnnouncementsComponent,
    InternshiAppplicationsListComponent,
    OfficialLetterComponent,
    AddApplicationComponent,
    ListComponent,
    AddComponent],
  imports: [
    SharedModule,
    StudentRoutingModule,
    // NgxsModule.forFeature([]),
  ],
})


export class StudentModule { }
