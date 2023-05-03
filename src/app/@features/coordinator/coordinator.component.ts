import { Component, OnInit } from '@angular/core';
import { AuthBaseState } from '@features/auth';
import { Select } from '@ngxs/store';
import { IBus } from '@shared/state-bus/IBus';

@Component({
  selector: 'app-coordinator',
  templateUrl: './coordinator.component.html',
  styleUrls: ['./coordinator.component.scss'],
})
export class CoordinatorComponent   {
  constructor() {}
}
