import { Component, OnInit } from '@angular/core';
import { AnnouncementModel } from '@features/career-center/models/announcementModel';
import { AnnouncementManagementService } from '@shared/services/announcement-management.service';
import { BehaviorSubject } from 'rxjs';

@Component({
  selector: 'app-announcements',
  templateUrl: './announcements.component.html',
  styleUrls: ['./announcements.component.scss']
})
export class AnnouncementsComponent implements OnInit {
  announcementRequest = new BehaviorSubject<AnnouncementModel[]>([]);
  constructor(private annServ: AnnouncementManagementService) { }
  ngOnInit(): void {
    this.getAllAnnouncement();
  }
  getAllAnnouncement() {
    this.annServ.getAllAnnouncements().subscribe({
      next: (res) => {
        this.announcementRequest.next(res.data);
      },
    });
  }

}
