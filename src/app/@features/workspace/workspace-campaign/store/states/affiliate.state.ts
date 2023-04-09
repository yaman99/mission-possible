import { tap } from 'rxjs';
import { Injectable } from '@angular/core';
import { NoticeService } from '@core/notification/notice.service';
import { Action, createSelector, Selector, State, StateContext } from '@ngxs/store';
import { PagedResultBase } from '@shared/models/pagination';
import { ILoadingHandler, LoadingHandler } from '@shared/state-helpers';
import { AffiliateHttpService } from '../../services/affiliate-http.service';
import { AffiliateStateActions } from '../actions/affiliate.action';
import { Affiliate } from '@shared/features/affiliate/models/affiliate.model';

export class AffiliatesStateModel implements ILoadingHandler {
  isLoading: boolean;
  affiliates: Affiliate[];
  pagination: PagedResultBase | null;
}
@State<AffiliatesStateModel>({
  name: 'affiliates',
  defaults: {
    affiliates: [],
    isLoading: false,
    pagination: null,
  },
})
@Injectable()
export class AffiliateState extends LoadingHandler<AffiliatesStateModel> {
  @Selector()
  static pagination(state: AffiliatesStateModel) {
    return state.pagination;
  }
  @Selector()
  static getAffiliates(state: AffiliatesStateModel) {
    return state.affiliates;
  }
  @Selector()
  static loading(state: AffiliatesStateModel) {
    return state.isLoading;
  }

  constructor(private affiliateHttp: AffiliateHttpService, private notify: NoticeService) {
    super();
  }

  @Action(AffiliateStateActions.GetAll)
  getCampaignAffiliates(ctx: StateContext<AffiliatesStateModel>, { payload }: AffiliateStateActions.GetAll) {
    this.startLoading(ctx);
    return this.affiliateHttp.getAffiliates(payload).pipe(
      tap({
        next: (res) => {
          ctx.patchState({
            affiliates: res.items,
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
