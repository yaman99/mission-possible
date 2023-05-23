import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CareerCenterComponent } from '@features/career-center/career-center.component';
import { CareerCenterPaths } from '@features/career-center/_commonPaths/careerCenterPaths.constants';
import { AnnouncementsListComponent } from '@features/career-center/announcements/announcements-list/announcements-list.component';

import { AddAnnouncementComponent } from '@features/career-center/announcements/add-announcement/add-announcement.component';
import { NotificationsComponent } from '@features/career-center/notifications/notifications.component';
import { AnnouncementsComponent } from './announcements/announcements.component';
import { AnnouncementPaths } from './_commonPaths/announcementPaths.constants';
import { SgkRequestsComponent } from './sgk-requests/sgk-requests.component';

const routes: Routes = [
  {
    path: '',
    component: CareerCenterComponent,

    children: [
      {
        path: 'announcements',
        component: AnnouncementsComponent,
        children: [
          {
            path: AnnouncementPaths.list,
            component: AnnouncementsListComponent,
          },
          {
            path: AnnouncementPaths.add,
            component: AddAnnouncementComponent,
          },
          {
            path: '',
            redirectTo: AnnouncementPaths.list,
            pathMatch: 'full',
          },
          {
            path: '**',
            redirectTo: 'error/404',
          },
        ],
      },

      {
        path: CareerCenterPaths.notifications,
        component: NotificationsComponent,
      },
      {
        path: CareerCenterPaths.sgkRequest,
        component: SgkRequestsComponent,
      },
      {
        path: '',
        redirectTo: CareerCenterPaths.sgkRequest,
        pathMatch: 'full',
      },
      {
        path: '**',
        redirectTo: 'error/404',
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class CareerCenterRoutingModule {}
