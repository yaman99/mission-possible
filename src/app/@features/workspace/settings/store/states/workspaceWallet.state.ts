import { Injectable } from '@angular/core';
import { Action, Selector, State, StateContext } from '@ngxs/store';
import { PagedResultBase } from '@shared/models/pagination';
import { LoadingHandler } from '@shared/state-helpers';
import { tap } from 'rxjs';
import {
  PaymentHistoryModel,
  WorkspaceWalletStateModel,
} from '../../models/workspaceWalletStateModel';
import { WorkspaceWalletHttpService } from '../../services/workspace-wallet-http.service';
import { WorkspaceWalletStateActions } from '../actions/workspaceWallet.actions';

@State<WorkspaceWalletStateModel>({
  name: 'workspaceWallet',
  defaults: {
    blanace: '0',
    forecast: '0',
    debt: '0',
    history: [],
    pagination: null,
    isLoading: false,
  },
})
@Injectable()
export class WorkspaceWalletState extends LoadingHandler<WorkspaceWalletStateModel> {
  @Selector()
  static isLoading(state: WorkspaceWalletStateModel): boolean {
    return state.isLoading;
  }
  @Selector()
  static Balance(state: WorkspaceWalletStateModel): string {
    return state.blanace;
  }
  @Selector()
  static History(state: WorkspaceWalletStateModel): PaymentHistoryModel[] {
    return state.history;
  }
  @Selector()
  static Pagination(state: WorkspaceWalletStateModel): PagedResultBase {
    return state.pagination!;
  }

  constructor(private walletHttp: WorkspaceWalletHttpService) {
    super();
  }

  @Action(WorkspaceWalletStateActions.GetBlanace)
  getWorkspaceBalance(
    ctx: StateContext<WorkspaceWalletStateModel>,
    { workspaceId }: WorkspaceWalletStateActions.GetBlanace
  ) {
    this.startLoading(ctx);
    return this.walletHttp.getBalance(workspaceId).pipe(
      tap({
        next: (res) => {
          ctx.patchState({
            blanace: res.balance,
            forecast: res.forecast,
            debt: res.debt,
          });
        },
        finalize: () => this.stopLoading(ctx),
      })
    );
  }

  @Action(WorkspaceWalletStateActions.GetPaymentHistory)
  getPaymentHistory(
    ctx: StateContext<WorkspaceWalletStateModel>,
    { payload }: WorkspaceWalletStateActions.GetPaymentHistory
  ) {
    this.startLoading(ctx);
    return this.walletHttp.getPaymentHistory(payload).pipe(
      tap({
        next: (res) => {
          console.log(res);
          ctx.patchState({
            history: res.items,
            pagination: {
              currentPage: res.currentPage,
              resultsPerPage: res.resultsPerPage,
              totalPages: res.totalPages,
              totalResults: res.totalResults,
            },
          });
        },
        finalize: () => this.stopLoading(ctx),
      })
    );
  }
}
