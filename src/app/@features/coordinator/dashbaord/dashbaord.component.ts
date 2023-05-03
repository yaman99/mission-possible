import { Observable, Subscription } from 'rxjs';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { IBus } from '@shared/state-bus/IBus';
import { Select, State } from '@ngxs/store';

@Component({
  selector: 'app-dashbaord',
  templateUrl: './dashbaord.component.html',
  styleUrls: ['./dashbaord.component.scss'],
})
export class DashbaordComponent {
  workspaceId: string;
  constructor(private stateBus: IBus) {
  }
}
