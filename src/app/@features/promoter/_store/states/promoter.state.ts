import { PromoterConversionsStateActions } from '@features/promoter/promoter-conversions/store/actions/promoterConversionsState.actions';
import { tap } from 'rxjs';
import { LoadingHandler } from '@shared/state-helpers/loading-handler/LoadingHandler';
import { Injectable } from '@angular/core';
import { PromoterStateModel } from '@features/promoter/_models/promoterState.model';
import { Action, Selector, State, StateContext } from '@ngxs/store';
import { PromoterHttpService } from '@features/promoter/_services/promoter-http.service';
import { PromoterStateActions } from '../actions/promoter-state.actions';
import { NoticeService } from '@core/notification/notice.service';
import { AuthPaths } from '@shared/paths';
import { Navigate } from '@ngxs/router-plugin';

@State<PromoterStateModel>({
  name: 'promoter',
  defaults: {
    id: '',
    location: '',
    firstName: '',
    lastName: '',
    targetCountries: [],
    targetCategories: [],
    profilepic: '',
    setupCompleted: false,
    isLoading: false,
  },
})
@Injectable()
export class PromoterState extends LoadingHandler<PromoterStateModel> {
  @Selector()
  static isLoading(state: PromoterStateModel): boolean {
    return state.isLoading;
  }

  @Selector()
  static promoterId(state: PromoterStateModel): string {
    return state.id;
  }

  @Selector()
  static promoter(state: PromoterStateModel) {
    return {
      targetCountries: state.targetCountries,
      targetCategories: state.targetCategories,
      location: state.location,
      profilepic: state.profilepic,
      lastName: state.lastName,
      firstName: state.firstName,
    };
  }
  /**
   *
   */
  constructor(private promoterHttpService: PromoterHttpService, private notify: NoticeService) {
    super();
  }

  @Action(PromoterStateActions.Get)
  onGetPromoter(ctx: StateContext<PromoterStateModel>, { promoter }: PromoterStateActions.Get) {
    this.startLoading(ctx);
    return this.promoterHttpService.getPromoter(promoter).pipe(
      tap({
        next: (res) => {
          ctx.patchState(res);
          ctx.dispatch(new PromoterStateActions.NavigateToDashboard())
        },
        finalize: () =>{

          this.stopLoading(ctx)
        },
      })
    );
  }
  @Action(PromoterStateActions.NavigateToDashboard)
  navigateToDashboard(ctx: StateContext<PromoterStateModel>) {
    ctx.dispatch(new Navigate(AuthPaths.PromoterLoginRedirectPathComponents));
  }
  @Action(PromoterStateActions.Update)
  onUpdate(ctx: StateContext<PromoterStateModel>, { payload }: PromoterStateActions.Update) {
    this.startLoading(ctx);
    return this.promoterHttpService.update(payload).pipe(
      tap({
        next: () => {
          ctx.patchState(payload);
          this.notify.successNotice('PROMOTER_ALERT_UPDATE_SUCCESSFULLY');
        },
        finalize: () => this.stopLoading(ctx),
      })
    );
  }
  @Action(PromoterStateActions.UpdateTargetCountries)
  onUpdateTargetCountries(
    ctx: StateContext<PromoterStateModel>,
    { payload }: PromoterStateActions.UpdateTargetCountries
  ) {
    this.startLoading(ctx);
    return this.promoterHttpService.updateTargetCountries(payload).pipe(
      tap({
        next: () => {
          ctx.patchState({
            targetCountries: payload.countries,
          });
          this.notify.successNotice('PROMOTER_ALERT_UPDATE_SUCCESSFULLY');
        },
        finalize: () => this.stopLoading(ctx),
      })
    );
  }
  @Action(PromoterStateActions.UpdateTargetCategories)
  onUpdateTargetCategories(
    ctx: StateContext<PromoterStateModel>,
    { payload }: PromoterStateActions.UpdateTargetCategories
  ) {
    this.startLoading(ctx);
    return this.promoterHttpService.updateTargetCategories(payload).pipe(
      tap({
        next: () => {
          ctx.patchState({
            targetCategories: payload.categories,
          });
          this.notify.successNotice('PROMOTER_ALERT_UPDATE_SUCCESSFULLY');
        },
        finalize: () => this.stopLoading(ctx),
      })
    );
  }
}
