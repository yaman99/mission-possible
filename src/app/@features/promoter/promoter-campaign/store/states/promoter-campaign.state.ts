import { AffiliateStatus } from '@shared/constants/affiliateStatus.constatns';
import { tap } from 'rxjs';
import { Injectable } from '@angular/core';
import { NoticeService } from '@core/notification/notice.service';
import { Action, createSelector, Selector, State, StateContext } from '@ngxs/store';
import { LoadingHandler } from '@shared/state-helpers';
import { PromoterCampaignStateModel } from '../../models/promoter-campaign-state.model';
import { PromoterCampaignHttpService } from '../../services/promoter-campaign-http.service';
import { PromoterCampaignStateActions } from '../actions/promoter-camapign-state.actions';
import { patch, updateItem } from '@ngxs/store/operators';
import { PromoterCampaign } from '../../models/promoter-campaign.model';
import { Navigate } from '@ngxs/router-plugin';
import { PromoterCampaignPaths } from '@features/promoter/paths';

@State<PromoterCampaignStateModel>({
  name: 'promoterCampaigns',
  defaults: {
    campaigns: [],
    isLoading: false,
    pagination: null,
  },
})
@Injectable()
export class PromoterCampaignState extends LoadingHandler<PromoterCampaignStateModel> {
  @Selector()
  static isLoading(state: PromoterCampaignStateModel): boolean {
    return state.isLoading;
  }
  @Selector()
  static campaigns(state: PromoterCampaignStateModel) {
    return state.campaigns;
  }
  @Selector()
  static pagination(state: PromoterCampaignStateModel) {
    return state.pagination;
  }
  static getCampaign(id: string) {
    return createSelector([PromoterCampaignState], (state: PromoterCampaignStateModel) => {
      return state.campaigns.find((x) => x.id === id);
    });
  }
  constructor(private campaignHttp: PromoterCampaignHttpService, private notify: NoticeService) {
    super();
  }
  @Action(PromoterCampaignStateActions.Browse)
  onBrowseCampaign(
    ctx: StateContext<PromoterCampaignStateModel>,
    { payload }: PromoterCampaignStateActions.Browse
  ) {
    this.startLoading(ctx);
    return this.campaignHttp.browseCampaigns(payload).pipe(
      tap({
        next: (res) => {
          ctx.patchState({
            campaigns: res.items,
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
  @Action(PromoterCampaignStateActions.Get)
  onGetPromoterCampaigns(
    ctx: StateContext<PromoterCampaignStateModel>,
    { payload }: PromoterCampaignStateActions.Get
  ) {
     this.startLoading(ctx);
    return this.campaignHttp.getPromoterCampaigns(payload).pipe(
      tap({
        next: (res) => {
          ctx.patchState({
            campaigns: res.items,
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
  @Action(PromoterCampaignStateActions.Details)
  onGetDetails(
    ctx: StateContext<PromoterCampaignStateModel>,
    { campaignId }: PromoterCampaignStateActions.Details
  ) {
     this.startLoading(ctx);
    return this.campaignHttp.getCampaignDetails(campaignId).pipe(
      tap({
        next: (res) => {
          ctx.setState(
            patch({
              campaigns: updateItem<PromoterCampaign>(
                (campaign) => campaign?.id === campaignId,
                patch(res)
              ),
            })
          );
        },
        finalize: () => this.stopLoading(ctx),
      })
    );
  }
  @Action(PromoterCampaignStateActions.Overview)
  onGetOverview(
    ctx: StateContext<PromoterCampaignStateModel>,
    { payload }: PromoterCampaignStateActions.Overview
  ) {
     this.startLoading(ctx);
    return this.campaignHttp.getCampaignOverview(payload).pipe(
      tap({
        next: (res) => {
          ctx.setState(
            patch({
              campaigns: updateItem<PromoterCampaign>(
                (campaign) => campaign?.id === payload.campaignId,
                patch(res)
              ),
            })
          );
        },
        finalize: () => this.stopLoading(ctx),
      })
    );
  }
  @Action(PromoterCampaignStateActions.Apply)
  onPromoterApply(
    ctx: StateContext<PromoterCampaignStateModel>,
    { payload }: PromoterCampaignStateActions.Apply
  ) {
     this.startLoading(ctx);
    return this.campaignHttp.ApplyOnCampaign(payload).pipe(
      tap({
        next: () => {
          this.notify.successNotice('PROMOTER_ALERT_UPDATE_SUCCESSFULLY');
          ctx.setState(
            patch({
              campaigns: updateItem<PromoterCampaign>(
                (campaign) => campaign?.id === payload.campaign,
                patch({ status: AffiliateStatus.active })
              ),
            })
          );
          ctx.dispatch(new Navigate(PromoterCampaignPaths.listComponents.concat(payload.campaign)));
        },
        finalize: () => this.stopLoading(ctx),
      })
    );
  }
  @Action(PromoterCampaignStateActions.Cancel)
  onCancelApplication(
    ctx: StateContext<PromoterCampaignStateModel>,
    { payload }: PromoterCampaignStateActions.Cancel
  ) {
     this.startLoading(ctx);
    return this.campaignHttp.CancelCampaignApplication(payload).pipe(
      tap({
        next: () => {
          this.notify.successNotice('PROMOTER_ALERT_UPDATE_SUCCESSFULLY');
          ctx.setState(
            patch({
              campaigns: updateItem<PromoterCampaign>(
                (campaign) => campaign?.id === payload.campaign,
                patch({ status: AffiliateStatus.canceled })
              ),
            })
          );
        },
        finalize: () => this.stopLoading(ctx),
      })
    );
  }
}
