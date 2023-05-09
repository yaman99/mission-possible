import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashbaordComponent } from './dashbaord/dashbaord.component'
import { CoordinatorComponent } from './coordinator.component';
import { RequestManagementComponent } from './request-management/request-management.component';
import { NotificationsComponent } from './notifications/notifications.component';
import { AnnouncementsComponent } from './announcements/announcements.component';
import { MessagesComponent } from './messages/messages.component';

const routes: Routes = [
  {
    path:'',
    component:CoordinatorComponent,
    children:[
      {
        path:'dashboard',
        component: DashbaordComponent
      },
      {
        path:'request-management',
        component:RequestManagementComponent

      },
      {
        path:'notifications',
        component:NotificationsComponent
      },
      {
        path:'announcements',
        component :AnnouncementsComponent
      },
      {
        path:'messages',
        component : MessagesComponent
      },{
        path: '',
        redirectTo: 'dashboard',
        pathMatch: 'full',
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
export class CoordinatorRoutingModule { }
