import { Component, OnInit } from '@angular/core';
import { CareerCenterPaths } from '@features/career-center/_commonPaths/careerCenterPaths.constants';


@Component({
  selector: 'app-career-center-aside-menu',
  templateUrl: './career-center-aside-menu.component.html',
  styleUrls: ['./career-center-aside-menu.component.scss']
})
export class CareerCenterAsideMenuComponent {
  constructor() { }
  paths = {
    notifications : CareerCenterPaths.notificationsComponents,
    announcements : CareerCenterPaths.announcementsComponents,
    sgkRequest :  CareerCenterPaths.sgkRequestComponents,
  }
}
