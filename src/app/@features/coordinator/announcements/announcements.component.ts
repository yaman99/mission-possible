import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { dateTimestampProvider } from 'rxjs/internal/scheduler/dateTimestampProvider';
import { AddAnnouncementPAths } from '@features/coordinator/_commonPaths/AddAnnouncementPaths.constants';

@Component({
  selector: 'app-announcements',
  templateUrl: './announcements.component.html',
  styleUrls: ['./announcements.component.scss']
})
export class AnnouncementsComponent  {
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