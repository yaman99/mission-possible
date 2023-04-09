import { patch, updateItem } from '@ngxs/store/operators';
import { tap } from 'rxjs';
import { Injectable } from '@angular/core';
import { NoticeService } from '@core/notification/notice.service';
import { Action, createSelector, Selector, State, StateContext } from '@ngxs/store';
import { PagedResultBase } from '@shared/models/pagination';
import { ILoadingHandler, LoadingHandler } from '@shared/state-helpers';
import { Conversion } from '@shared/features/conversion/models/conversion.model';
import { ConversionHttpService } from '../../services/conversion-http.service';
import { ConversionStateActions } from '../actions/conversion.action';
import { ConversionStatus } from '@shared/constants';

export class ConversionStateModel implements ILoadingHandler {
  isLoading: boolean;
  conversions: Conversion[];
  pagination: PagedResultBase | null;
}
@State<ConversionStateModel>({
  name: 'conversions',
  defaults: {
    conversions: [],
    isLoading: false,
    pagination: null,
  },
})
@Injectable()
export class ConversionState extends LoadingHandler<ConversionStateModel> {
  @Selector()
  static pagination(state: ConversionStateModel) {
    return state.pagination;
  }
  @Selector()
  static conversions(state: ConversionStateModel) {
    return state.conversions;
  }
  @Selector()
  static Loading(state: ConversionStateModel) {
    return state.isLoading;
  }
  // static getConversions(id: string) {
  //   return createSelector([ConversionState], (state: ConversionStateModel) => {
  //     return state.conversions;
  //   });
  // }

  constructor(private conversionHttp: ConversionHttpService, private notify: NoticeService) {
    super();
  }

  @Action(ConversionStateActions.GetAll)
  getCampaignConversions(ctx: StateContext<ConversionStateModel>, { payload }: ConversionStateActions.GetAll) {
    this.startLoading(ctx);
    return this.conversionHttp.getConversions(payload).pipe(
      tap({
        next: (res) => {
          ctx.patchState({
            conversions: res.items,
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

  @Action(ConversionStateActions.Approve)
  onApprove(ctx: StateContext<ConversionStateModel>, { payload }: ConversionStateActions.Approve) {
    this.startLoading(ctx);
    return this.conversionHttp.approve(payload).pipe(
      tap({
        next: () => {
          ctx.setState(
            patch({
              conversions: updateItem<Conversion>((x) => x?.id === payload.conversionId, patch({ status: ConversionStatus.approved})),
            })
          );
          this.notify.successNotice('ITEM.ALERT.ADD_ITEM.SUCCESS');
        },
        finalize: () => this.stopLoading(ctx),
      })
    );
  }
  @Action(ConversionStateActions.Reject)
  onReject(ctx: StateContext<ConversionStateModel>, { conversionId }: ConversionStateActions.Reject) {
    this.startLoading(ctx);
    return this.conversionHttp.reject(conversionId).pipe(
      tap({
        next: () => {
          ctx.setState(
            patch({
              conversions: updateItem<Conversion>((x) => x?.id === conversionId, patch({ status: ConversionStatus.rejected })),
            })
          );
          this.notify.successNotice('ITEM.ALERT.ADD_ITEM.SUCCESS');
        },
        finalize: () => this.stopLoading(ctx),
      })
    );
  }
}
