import { Component, OnInit } from '@angular/core';
import { NotificationModel } from './models/notificationModel';
import { NotificationHttpServiceService } from './notification-http-service.service';
import { NotificationManagementService } from '@shared/services/notification-management.service';
import { BehaviorSubject } from 'rxjs';
import { Select } from '@ngxs/store';
import { AuthBaseState } from '@features/auth';
import { IBus } from '@shared/state-bus/IBus';

@Component({
  selector: 'app-notification-list',
  templateUrl: './notification-list.component.html',
  styleUrls: ['./notification-list.component.scss'],
})
export class NotificationListComponent implements OnInit {
  showToolbar: boolean = false;
  // notificationRequest: NotificationModel[]

  constructor(private notifiyServ: NotificationManagementService, private stateBus: IBus) {}
  notifications = new BehaviorSubject<any>([]);

  ngOnInit(): void {
    this.getAllNotifications();
  }
  getAllNotifications() {
    const userType = this.stateBus.getSnapshot(AuthBaseState.getUserType)!
    console.log(userType);
    this.notifiyServ.getAllNotifications(userType).subscribe({
      next: (res) => {
        this.notifications.next(res.data);
      },
    });
  }

  toggleToolbar() {
    this.showToolbar = !this.showToolbar;
  }
  createNotification(id: string, title: string, content: string) {
    // let model: NotificationModel = {
    //   id: id,
    //   title: title,
    //   content: content
    // }
    // this.notiService.createNotification(model).subscribe({
    //   next: () => {
    //     console.log("created success");
    //   },
    //   error: (error) => {
    //     console.log(error);
    //   }
    // })
  }
  // getNotification() {
  //   this.notifiyServ.getAllNotificationsRequests().subscribe({
  //     next: (data) => {
  //       this.notificationRequest = data.notificationData;
  //     },
  //     error: (error) => {
  //       console.log(error);
  //     }
  //   })
  // }
}
