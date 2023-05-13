import { Component, OnInit } from '@angular/core';
import { OfficialLetterPaths } from '@features/student/_commonPaths/officialLetterPaths.constants';
import { StudentPaths } from '@features/student/_commonPaths/studentPaths.constants';

@Component({
  selector: 'app-student-aside-menu',
  templateUrl: './student-aside-menu.component.html',
  styleUrls: ['./student-aside-menu.component.scss']
})
export class StudentAsideMenuComponent {
  paths = {
    internshipApplications: StudentPaths.internshipApplicationListComponents,
    notifications : StudentPaths.notificationsComponents,
    announcements : StudentPaths.announcementsComponents,
    messages : StudentPaths.messagesComponents,
    officialLetter: OfficialLetterPaths.listComponents,
  }
  constructor() { }



  }
