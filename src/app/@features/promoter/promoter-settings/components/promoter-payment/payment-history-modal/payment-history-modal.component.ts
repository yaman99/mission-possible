import { Observable, Subscription, tap } from 'rxjs';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { IBus } from '@shared/state-bus/IBus';
import { PromoterState } from '@features/promoter/_store/states/promoter.state';
import {  PagedResultBase } from '@shared/models/pagination';
import { GetPromoterPaymentHistoryRequest } from '@features/promoter/wallet/models/getPromoterPaymentHistoryRequest';
import { PromoterWalletState } from '@features/promoter/wallet/stateStore/state/promoterWallet.state';
import { PaymentHistoryModel } from '@features/promoter/wallet/models/PromoterWalletStateModel';
import { Select } from '@ngxs/store';
import { PromoterWalletStateActions } from '@features/promoter/wallet/stateStore/actions/promoterWallet.actions';
import { WalletTransactionType } from '@shared/constants/walletTransaction.constatns';

@Component({
  selector: 'app-payment-history-modal',
  templateUrl: './payment-history-modal.component.html',
  styleUrls: ['./payment-history-modal.component.scss'],
})
export class PaymentHistoryModalComponent implements OnDestroy {
  constructor(
    private modalService: NgbModal,
    private stateBus: IBus
  ) {}
  @Select(PromoterWalletState.History) paymentHistory$: Observable<PaymentHistoryModel[]>;
  @Select(PromoterWalletState.Pagination) pagination$: Observable<PagedResultBase>;
  subscriptions: Subscription[] = [];
  walletTransactionType = WalletTransactionType;
  getPage(page: number) {
    const promoterId = this.stateBus.getSnapshot(PromoterState.promoterId);
    let model: GetPromoterPaymentHistoryRequest = {
      promoterId: promoterId,
      pagination: {
        page: page,
        result: 10,
        orderBy: 'CreatedDate',
      },
    };
    this.stateBus.excuteAction(new PromoterWalletStateActions.GetPaymentHistory(model));

  }
  openModal(content: any) {
    this.getPage(1);
    this.modalService.open(content, { size: 'lg' }).result.then(
      () => {},
      () => {}
    );
  }
  ngOnDestroy(): void {
    this.subscriptions.forEach((x) => x.unsubscribe());
  }
}
