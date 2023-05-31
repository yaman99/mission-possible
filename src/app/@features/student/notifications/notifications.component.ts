import { Component, OnInit } from '@angular/core';
import { NotificationManagementService } from '@shared/services/notification-management.service';
import { BehaviorSubject } from 'rxjs';

@Component({
  selector: 'app-notifications',
  templateUrl: './notifications.component.html',
  styleUrls: ['./notifications.component.scss'],
})
export class NotificationsComponent implements OnInit {
  constructor(private notifiyServ: NotificationManagementService) {}
  notifications = new BehaviorSubject([]);

  ngOnInit(): void {
    this.getAllNotifications();
  }
  getAllNotifications() {
    this.notifiyServ.getAllNotifications('student').subscribe({
      next: (res) => {
        this.notifications.next(res.data);
      },
    });
  }
}
