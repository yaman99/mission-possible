import { Component, OnInit } from '@angular/core';
import { CoordinatorPaths } from '@features/coordinator/_commonPaths/coordinatorPaths.constants';

@Component({
  selector: 'app-coordinator-aside-menu',
  templateUrl: './coordinator-aside-menu.component.html',
  styleUrls: ['./coordinator-aside-menu.component.scss']
})
export class CoordinatorAsideMenuComponent  {
  paths = {
    requestManagement: CoordinatorPaths.requestManagementComponents,
    notifications : CoordinatorPaths.notificationsComponents,
    messages : CoordinatorPaths.messagesComponents
  };


  constructor() { }



}
