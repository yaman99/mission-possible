import { Component, OnInit, OnDestroy } from '@angular/core';
import { PromoterWalletStateActions } from '@features/promoter/wallet/stateStore/actions/promoterWallet.actions';
import { PromoterWalletState } from '@features/promoter/wallet/stateStore/state/promoterWallet.state';
import { PromoterState } from '@features/promoter/_store/states/promoter.state';
import { Select } from '@ngxs/store';
import { IBus } from '@shared/state-bus/IBus';
import { BehaviorSubject, Observable, Subscription, tap } from 'rxjs';

@Component({
  selector: 'app-promoter-payment',
  templateUrl: './promoter-payment.component.html',
  styleUrls: ['./promoter-payment.component.scss'],
})
export class PromoterPaymentComponent implements OnInit, OnDestroy {
  subscriptions: Subscription[] = [];
  @Select(PromoterWalletState.Profit) profit$: Observable<string>;
  @Select(PromoterWalletState.isLoading) isLoading$: Observable<boolean>;
  constructor( private stateBus: IBus) {}

  ngOnInit(): void {
    const promoterId = this.stateBus.getSnapshot(PromoterState.promoterId);
    this.stateBus.excuteAction(new PromoterWalletStateActions.GetProfit(promoterId));

  }
  ngOnDestroy(): void {
    this.subscriptions.forEach((x) => x.unsubscribe());
  }
}
