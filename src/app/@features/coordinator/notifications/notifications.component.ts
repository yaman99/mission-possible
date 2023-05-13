import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-notifications',
  templateUrl: './notifications.component.html',
  styleUrls: ['./notifications.component.scss']
})
export class NotificationsComponent  {
  showToolbar: boolean = false;

  constructor() { }


  toggleToolbar(){
    this.showToolbar = !this.showToolbar;

  }

}
