import { tap } from 'rxjs';
import { WorkspaceCampaignHttpService } from './../../services/workspace-campaign-http.service';
import { ILoadingHandler, LoadingHandler } from '@shared/state-helpers';
import { Action, createSelector, Selector, State, StateContext } from '@ngxs/store';
import { Campaign } from '@shared/features/campaign/models/campaign.model';
import { WorkspaceCampaignStateActions } from '../actions/campaign.action';
import { patch, updateItem, removeItem } from '@ngxs/store/operators';
import { Injectable } from '@angular/core';
import { PagedResult, PagedResultBase } from '@shared/models/pagination';
import { NoticeService } from '@core/notification/notice.service';
import { Navigate } from '@ngxs/router-plugin';
import { CampaignPaths } from '@shared/paths';

export class CampaignStateModel implements ILoadingHandler {
  isLoading: boolean;
  campaigns: Campaign[];
  pagination: PagedResultBase | null;
}
@State<CampaignStateModel>({
  name: 'campaigns',
  defaults: {
    campaigns: [],
    isLoading: false,
    pagination: null,
  },
})
@Injectable()
export class WorkspaceCampaignState extends LoadingHandler<CampaignStateModel> {
  @Selector()
  static isLoading(state: CampaignStateModel) {
    return state.isLoading;
  }
  @Selector()
  static pagination(state: CampaignStateModel) {
    return state.pagination;
  }
  @Selector()
  static campaigns(state: CampaignStateModel) {
    return state.campaigns;
  }
  static getCampaignById(id: string) {
    return createSelector([WorkspaceCampaignState], (state: CampaignStateModel) => {
      return state.campaigns.find((x) => x.id === id)!;
    });
  }
  static getCampaignOverview(id: string) {
    return createSelector([WorkspaceCampaignState], (state: CampaignStateModel) => {
      return state.campaigns.find((x) => x.id === id)?.overview;
    });
  }

  constructor(private campaignHttp: WorkspaceCampaignHttpService, private notify: NoticeService) {
    super();
  }

  @Action(WorkspaceCampaignStateActions.Create)
  onAddCampaign(ctx: StateContext<CampaignStateModel>, { payload }: WorkspaceCampaignStateActions.Create) {
    this.startLoading(ctx);
    return this.campaignHttp.createCampaign(payload).pipe(
      tap({
        next: () => {
          this.notify.successNotice('CAMPAIGN.ALERT.SUCCESS.CREATED');
          ctx.dispatch(new Navigate(CampaignPaths.CampaignsListComponents));
        },
        finalize: () => this.stopLoading(ctx),
      })
    );
  }
  @Action(WorkspaceCampaignStateActions.ChangeStatus)
  onChangeStatus(ctx: StateContext<CampaignStateModel>, { payload }: WorkspaceCampaignStateActions.ChangeStatus) {
    this.startLoading(ctx);
    return this.campaignHttp.changeStatus(payload).pipe(
      tap({
        next: () => {
          ctx.setState(
            patch({
              campaigns: updateItem<Campaign>((campaign) => campaign?.id === payload.campaignId, patch({ status: payload.status })),
            })
          );
          this.notify.successNotice('CAMPAIGN.ALERT.SUCCESS.UPDATED');
        },
        finalize: () => this.stopLoading(ctx),
      })
    );
  }
  @Action(WorkspaceCampaignStateActions.ChangeApplicationStatus)
  onChangeApplicationStatus(ctx: StateContext<CampaignStateModel>, { payload }: WorkspaceCampaignStateActions.ChangeApplicationStatus) {
    this.startLoading(ctx);
    return this.campaignHttp.ChangeApplicationStatus(payload).pipe(
      tap({
        next: () => {
          ctx.setState(
            patch({
              campaigns: updateItem<Campaign>((campaign) => campaign?.id === payload.campaignId, patch({ isApplicable: payload.status })),
            })
          );
          this.notify.successNotice('CAMPAIGN.ALERT.SUCCESS.UPDATED');
        },
        finalize: () => this.stopLoading(ctx),
      })
    );
  }
  @Action(WorkspaceCampaignStateActions.Update)
  onUpdateCampaign(ctx: StateContext<CampaignStateModel>, { payload }: WorkspaceCampaignStateActions.Update) {
    this.startLoading(ctx);
    return this.campaignHttp.updateCampaign(payload).pipe(
      tap({
        next: () => {
          this.notify.successNotice('CAMPAIGN.ALERT.SUCCESS.UPDATED');
          ctx.dispatch(new Navigate(CampaignPaths.CampaignsListComponents));
        },
        finalize: () => this.stopLoading(ctx),
      })
    );
  }

  @Action(WorkspaceCampaignStateActions.Delete)
  onDeleteCampaign(ctx: StateContext<CampaignStateModel>, { campaignId, navigate }: WorkspaceCampaignStateActions.Delete) {
    this.startLoading(ctx);
    return this.campaignHttp.deleteCampaign(campaignId).pipe(
      tap({
        next: () => {
          this.notify.successNotice('CAMPAIGN.ALERT.SUCCESS.DELETED');
          ctx.setState(
            patch({
              campaigns: removeItem<Campaign>((campaign) => campaign?.id === campaignId),
            })
          );
          if (navigate) {
            ctx.dispatch(new Navigate(CampaignPaths.CampaignsListComponents));
          }
        },
        finalize: () => this.stopLoading(ctx),
      })
    );
  }

  @Action(WorkspaceCampaignStateActions.GetAll)
  onGetCampaigns(ctx: StateContext<CampaignStateModel>, { payload }: WorkspaceCampaignStateActions.GetAll) {
    this.startLoading(ctx);
    const state = ctx.getState();
    return this.campaignHttp.getCampaigns(payload).pipe(
      tap({
        next: (res) => {
          ctx.patchState({
            ...state,
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
  @Action(WorkspaceCampaignStateActions.GetOverview)
  onGetCampaignOverview(ctx: StateContext<CampaignStateModel>, { campaignId , itemId }: WorkspaceCampaignStateActions.GetOverview) {
    this.startLoading(ctx);
    return this.campaignHttp.getCampaignOverview(campaignId , itemId).pipe(
      tap({
        next: (res) => {
          ctx.setState(
            patch({
              campaigns: updateItem<Campaign>(
                (campaign) => campaign?.id === campaignId,
                patch({
                  productName: res.productName,
                  productUrl: res.productUrl,
                  productStore: res.productStore,
                  productPrice: res.productPrice,
                  overview: {
                    totalViews: res.totalViews,
                    totalConversions: res.totalConversions,
                    totalActiveAffiliate: res.totalActiveAffiliate,
                    totalCanceledAffiliate: res.totalCanceledAffiliate,
                  },
                })
              ),
            })
          );
        },
        finalize: () => this.stopLoading(ctx),
      })
    );
  }
}
