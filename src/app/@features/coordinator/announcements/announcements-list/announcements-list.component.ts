import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AddAnnouncementPAths } from '@features/coordinator/_commonPaths/AddAnnouncementPaths.constants';

@Component({
  selector: 'app-announcements-list',
  templateUrl: './announcements-list.component.html',
  styleUrls: ['./announcements-list.component.scss']
})
export class AnnouncementsListComponent {
  paths = {
    addAnnouncement: AddAnnouncementPAths.addAnnouncementComponents
  }

  constructor(private router:Router) { }
  // date field only for testing
  currentDate = new Date();
  onAddAnnouncement(){
    this.router.navigate(['/announcements/add-announcement']);
  }
}
