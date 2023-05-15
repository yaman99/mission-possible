import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AnnouncementPaths } from '@features/career-center/_commonPaths/announcementPaths.constants';



@Component({
  selector: 'app-announcements-list',
  templateUrl: './announcements-list.component.html',
  styleUrls: ['./announcements-list.component.scss']
})
export class AnnouncementsListComponent  {
  paths = {
    addAnnouncement : AnnouncementPaths.addComponents,

  }

  constructor(private router:Router) { }
  // date field only for testing
  currentDate = new Date();
  onAddAnnouncement(){
    this.router.navigate(['/announcements/add-announcement']);
  }

}

