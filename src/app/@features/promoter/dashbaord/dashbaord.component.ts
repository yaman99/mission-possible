import { Component, OnInit } from '@angular/core';
import { IBus } from '@shared/state-bus/IBus';
import { PromoterWalletStateActions } from '../wallet/stateStore/actions/promoterWallet.actions';
import { PromoterState } from '../_store/states/promoter.state';

@Component({
  selector: 'app-dashbaord',
  templateUrl: './dashbaord.component.html',
  styleUrls: ['./dashbaord.component.scss'],
})
export class DashbaordComponent   {
  constructor() {}

}
