import { Injectable } from '@angular/core';
import { Action, Selector, State, StateContext } from '@ngxs/store';
import { LoadingHandler } from '@shared/state-helpers';
import { tap } from 'rxjs';
import { PromoterConversionsStateModel } from '../../models/PromoterConversionsState.model';
import { PromoterConversionHttpService } from '../../services/promoter-conversion-http.service';
import { PromoterConversionsStateActions } from '../actions/promoterConversionsState.actions';

@State<PromoterConversionsStateModel>({
  name: 'promoterConversions',
  defaults: {
    conversions: [],
    pagination: null,
    totalPaid: 0,
    totalRejected: 0,
    totalPending: 0,
    isLoading: false,
  },
})
@Injectable()
export class PromoterConversionsState extends LoadingHandler<PromoterConversionsStateModel> {
  @Selector()
  static isLoading(state: PromoterConversionsStateModel) {
    return state.isLoading;
  }
  @Selector()
  static conversions(state: PromoterConversionsStateModel) {
    return state.conversions;
  }
  @Selector()
  static pagination(state: PromoterConversionsStateModel) {
    return state.pagination;
  }
  @Selector()
  static insights(state: PromoterConversionsStateModel) {
    return {
      totalPaid: state.totalPaid,
      totalRejected: state.totalRejected,
      totalPending: state.totalPending,
    };
  }
  constructor(private conversionHttp: PromoterConversionHttpService) {
    super();
  }
  @Action(PromoterConversionsStateActions.Get)
  getConversions(
    ctx: StateContext<PromoterConversionsStateModel>,
    { payload }: PromoterConversionsStateActions.Get
  ) {
    this.startLoading(ctx);
    return this.conversionHttp.getConversions(payload).pipe(
      tap({
        next: (res) => {
          ctx.patchState({
            conversions: res.conversionsList.items,
            pagination: {
              currentPage: res.conversionsList.currentPage,
              resultsPerPage: res.conversionsList.resultsPerPage,
              totalPages: res.conversionsList.totalPages,
              totalResults: res.conversionsList.totalResults,
            },
            totalPaid: res.totalPaid,
            totalRejected: res.totalRejected,
            totalPending: res.totalPending,
          });
        },
        finalize: () => this.stopLoading(ctx),
      })
    );
  }
}
