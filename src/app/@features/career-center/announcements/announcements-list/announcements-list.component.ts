import { BehaviorSubject } from 'rxjs';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AnnouncementPaths } from '@features/career-center/_commonPaths/announcementPaths.constants';
import { AnnouncementModel } from '@features/career-center/models/announcementModel';
import { DeleteAnnouncementRequest } from '@features/career-center/models/requests/deleteAnnouncementRequest';
import { CareerCenterHttpService } from '@features/career-center/services/career-center-http.service';
import { AnnouncementManagementService } from '@shared/services/announcement-management.service';
import { NoticeService } from '@core/notification/notice.service';

@Component({
  selector: 'app-announcements-list',
  templateUrl: './announcements-list.component.html',
  styleUrls: ['./announcements-list.component.scss'],
})
export class AnnouncementsListComponent implements OnInit {
  paths = {
    addAnnouncement: AnnouncementPaths.addComponents,
  };
  announcementRequest = new BehaviorSubject<AnnouncementModel[]>([]);

  constructor(
    private router: Router,
    private crServ: AnnouncementManagementService,
    private notification: NoticeService
  ) {}
  ngOnInit(): void {
    this.getAllAnnouncement();
  }
  // date field only for testing
  currentDate = new Date();
  onAddAnnouncement() {
    this.router.navigate(['/announcements/add-announcement']);
  }
  getAllAnnouncement() {
    this.crServ.getAllAnnouncements().subscribe({
      next: (res) => {
        console.log(res);

        this.announcementRequest.next(res.data);
      },
    });
  }
  deleteAnnouncement(id: string) {
    let model: DeleteAnnouncementRequest = {
      id: id,
    };
    this.crServ.deleteAnnouncement(model).subscribe({
      next: () => {
        this.notification.successNotice('Announcement is deleted Successfully');
        this.getAllAnnouncement();
      },
      error: (error: any) => {
        console.log(error);
      },
    });
  }
}
