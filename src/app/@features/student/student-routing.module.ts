import { Routes } from "@angular/router";
import { MessagesComponent } from "./messages/messages.component";
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { InternshiAppplicationsListComponent } from "./internship-applications/internship-appplications-list/internshi-appplications-list.component";
import { AnnouncementsComponent } from "./announcements/announcements.component";
import { StudentComponent } from "./student.component";
import { NotificationsComponent } from "./notifications/notifications.component";
import { StudentPaths } from "./_commonPaths/studentPaths.constants";
import { OfficialLetterComponent } from "./official-letter/official-letter.component";
import { AddApplicationComponent } from "./internship-applications/add-application/add-application.component";
import { InternshipApplicationsComponent } from "./internship-applications/internship-applications.component";
import { OfficialLetterPaths } from "./_commonPaths/officialLetterPaths.constants";
import { ListComponent } from "./official-letter/list/list.component";
import { AddComponent } from "./official-letter/add/add.component";


const routes: Routes = [
  {
    path: '',
    component: StudentComponent,

    children: [
      {
        path: StudentPaths.basePath,
        component: InternshipApplicationsComponent,
        children: [
          {
            path: StudentPaths.addApplication,
            component: AddApplicationComponent,
          },
          {
            path : StudentPaths.internshipApplicationList,
            component: InternshiAppplicationsListComponent,
          },

        ]
      },
      {
        path: 'notifications',
        component: NotificationsComponent
      },
      {
        path: 'announcements',
        component: AnnouncementsComponent,

      },
      {
        path: 'messages',
        component: MessagesComponent
      },
      {
        path:'official-letter',
        component: OfficialLetterComponent,
        children :[
          {
          path : 'list',
          component :ListComponent
          },
          {
            path : OfficialLetterPaths.addOfficialLetter,
            component: AddComponent
          }
        ]

      },
      {
        path: '',
        redirectTo: StudentPaths.internshipApplicationList,
        pathMatch: 'full'
      },
      {
        path: '**',
        redirectTo: 'error/404',
      },
    ]
  },


];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})


export class StudentRoutingModule { }
