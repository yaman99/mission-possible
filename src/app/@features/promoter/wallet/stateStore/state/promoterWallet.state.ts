import { Injectable } from '@angular/core';
import { Action, Selector, State, StateContext } from '@ngxs/store';
import { PagedResultBase } from '@shared/models/pagination';
import { LoadingHandler } from '@shared/state-helpers';
import { tap } from 'rxjs';
import { PaymentHistoryModel, PromoterWalletStateModel } from '../../models/PromoterWalletStateModel';
import { PromoterWalletHttpService } from '../../services/wallet-http-service.service';
import { PromoterWalletStateActions } from '../actions/promoterWallet.actions';


@State<PromoterWalletStateModel>({
  name: 'promoterWallet',
  defaults: {
    profit: '0',
    history: [],
    pagination: null,
    isLoading: false,
  },
})
@Injectable()
export class PromoterWalletState extends LoadingHandler<PromoterWalletStateModel> {
  @Selector()
  static isLoading(state: PromoterWalletStateModel): boolean {
    return state.isLoading;
  }
  @Selector()
  static Profit(state: PromoterWalletStateModel): string {
    return state.profit;
  }
  @Selector()
  static History(state: PromoterWalletStateModel): PaymentHistoryModel[] {
    return state.history;
  }
  @Selector()
  static Pagination(state: PromoterWalletStateModel): PagedResultBase {
    return state.pagination!;
  }

  constructor(private walletHttp: PromoterWalletHttpService) {
    super();
  }

  @Action(PromoterWalletStateActions.GetProfit)
  getPromoterBalance(
    ctx: StateContext<PromoterWalletStateModel>,
    { PromoterId }: PromoterWalletStateActions.GetProfit
  ) {
    this.startLoading(ctx);
    return this.walletHttp.getProfit(PromoterId).pipe(
      tap({
        next: (amount) => {
          ctx.patchState({
            profit: amount,
          });
        },
        finalize: () => this.stopLoading(ctx),
      })
    );
  }

  @Action(PromoterWalletStateActions.GetPaymentHistory)
  getPaymentHistory(
    ctx: StateContext<PromoterWalletStateModel>,
    { payload }: PromoterWalletStateActions.GetPaymentHistory
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
