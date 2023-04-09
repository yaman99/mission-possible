import { PromoterStateActions } from '@features/promoter/_store/actions/promoter-state.actions';
import { Component, OnInit } from '@angular/core';
import { AuthBaseState } from '@features/auth';
import { IBus } from '@shared/state-bus/IBus';

@Component({
  selector: 'app-promoter',
  templateUrl: './promoter.component.html',
  styleUrls: ['./promoter.component.scss'],
})
export class PromoterComponent {
  constructor() {}
}
