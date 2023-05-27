import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AnnouncementPaths } from '@features/career-center/_commonPaths/announcementPaths.constants';
import { AnnouncementModel } from '@features/career-center/models/announcementModel';
import { DeleteAnnouncementRequest } from '@features/career-center/models/requests/deleteAnnouncementRequest';
import { CareerCenterHttpService } from '@features/career-center/services/career-center-http.service';



@Component({
  selector: 'app-announcements-list',
  templateUrl: './announcements-list.component.html',
  styleUrls: ['./announcements-list.component.scss']
})
export class AnnouncementsListComponent implements OnInit {
  paths = {
    addAnnouncement : AnnouncementPaths.addComponents,

  }
  announcementRequest : AnnouncementModel[]

  constructor(private router:Router, private crServ : CareerCenterHttpService) { }
  ngOnInit(): void {
    this.getAllAnnouncement()
  }
  // date field only for testing
  currentDate = new Date();
  onAddAnnouncement(){
    this.router.navigate(['/announcements/add-announcement']);
  }
  getAllAnnouncement(){
    this.crServ.getAllAnnouncementRequests().subscribe({
      next: (data) => {
        this.announcementRequest = data.announcementData;
      },
      error: (error) => {
        console.log(error)
      }
    })
  }
  deleteAnnouncement(id : string){
    let model : DeleteAnnouncementRequest = {
      id : id
    }
    this.crServ.deleteAnnouncementRequest(model).subscribe({
      next: () => {
        console.log("Announcement is deleted");
      },
      error: (error :any) => {
        console.log(error)
      }
    })

  }

}

