import { Component, OnInit } from '@angular/core';
import { NotificationModel } from './models/notificationModel';
import { NotificationHttpServiceService } from './notification-http-service.service';

@Component({
  selector: 'app-notification-list',
  templateUrl: './notification-list.component.html',
  styleUrls: ['./notification-list.component.scss']
})
export class NotificationListComponent implements OnInit {
  showToolbar: boolean = false;
  notificationRequest: NotificationModel[]

  constructor(private notiService: NotificationHttpServiceService) { }
  ngOnInit() {
    this.getNotification();
  }


  toggleToolbar() {
    this.showToolbar = !this.showToolbar;

  }
  createNotification(id: string, title: string, content: string) {
    let model: NotificationModel = {
      id: id,
      title: title,
      content: content
    }
    this.notiService.createNotification(model).subscribe({
      next: () => {
        console.log("created success");

      },
      error: (error) => {
        console.log(error);
      }
    })


  }
  getNotification() {
    this.notiService.getAllNotificationsRequests().subscribe({
      next: (data) => {
        this.notificationRequest = data.notificationData;
      },
      error: (error) => {
        console.log(error);
      }
    })
  }
}
