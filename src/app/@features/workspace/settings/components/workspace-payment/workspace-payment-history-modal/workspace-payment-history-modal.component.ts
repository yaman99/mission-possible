import { WorkspaceState } from './../../../../_store/states/workspace.state';
import { Observable, Subscription, tap } from 'rxjs';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { IBus } from '@shared/state-bus/IBus';
import { PagedResult, PagedResultBase } from '@shared/models/pagination';
import { GetWorkspacePaymentHistoryResponse } from '@features/workspace/settings/models/getWorkspacePaymentHistoryResponse';
// import { GetWorkspacePaymentHistoryRequest } from '@features/workspace/settings/models/GetWorkspacePaymentHistoryRequest';
import { WorkspaceWalletHttpService } from '@features/workspace/settings/services/workspace-wallet-http.service';
import { GetWorkspacePaymentHistoryRequest } from '@features/workspace/settings/models/getWorkspacePaymentHistoryRequest';
import { WorkspaceWalletStateActions } from '@features/workspace/settings/store/actions/workspaceWallet.actions';
import { Select } from '@ngxs/store';
import { WorkspaceWalletState } from '@features/workspace/settings/store/states/workspaceWallet.state';
import { PaymentHistoryModel } from '@features/workspace/settings/models/workspaceWalletStateModel';
import { WalletTransactionType } from '@shared/constants/walletTransaction.constatns';

@Component({
  selector: 'app-workspace-payment-history-modal',
  templateUrl: './workspace-payment-history-modal.component.html',
  styleUrls: ['./workspace-payment-history-modal.component.scss'],
})
export class WorkspacePaymentHistoryModalComponent implements OnDestroy {
  @Select(WorkspaceWalletState.History) paymentHistory$: Observable<PaymentHistoryModel[]>;
  @Select(WorkspaceWalletState.Pagination) pagination$: Observable<PagedResultBase>;
  subscriptions: Subscription[] = [];

  walletTransactionType = WalletTransactionType;
  constructor(private modalService: NgbModal, private stateBus: IBus) {}


  getPage(page: number) {
    const workspaceId = this.stateBus.getSnapshot(WorkspaceState.workspace).id;
    let model: GetWorkspacePaymentHistoryRequest = {
      workspaceId: workspaceId,
      pagination: {
        page: page,
        result: 10,
        orderBy: 'CreatedDate',
      },
    };
    this.stateBus.excuteAction(new WorkspaceWalletStateActions.GetPaymentHistory(model));
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
