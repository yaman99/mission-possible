import { tap } from 'rxjs';
import { LoadingHandler } from '@shared/state-helpers/loading-handler/LoadingHandler';
import { Injectable } from '@angular/core';
import { Action, Selector, State, StateContext } from '@ngxs/store';
import { AuthStateModel } from '@features/auth/models/authStateModel';
import { WorkspaceHttpService } from '@features/workspace/_services/workspace-http.service';
import { Workspace } from '@features/workspace/_models/workspace';
import { WorkspaceWalletStateActions } from '@features/workspace/settings/store/actions/workspaceWallet.actions';
import { WorkspaceDashboardStateModel } from '../../models/workspaceDashboardStateModel';
import { DashboardViewModel } from '../../models/dashboardView';
import { NoticeService } from '@core/notification/notice.service';
import { WorkspaceDashboardStateActions } from '../actions/workspaceDashbaord.action';
import { WorkspaceDashboardHttpService } from '../../services/workspace-dashboard-http.service';

@State<WorkspaceDashboardStateModel>({
  name: 'wDashboard',
  defaults: {
    totalActiveAffiliates: 0,
    totalCanceledAffiliates: 0,
    totalConversions: 0,
    isLoading: false,
  },
})
@Injectable()
export class WorkspaceDashbaordState extends LoadingHandler<WorkspaceDashboardStateModel> {
  @Selector()
  static isLoading(state: WorkspaceDashboardStateModel): boolean {
    return state.isLoading;
  }

  @Selector()
  static data(state: WorkspaceDashboardStateModel): DashboardViewModel {
    return {
      totalActiveAffiliates: state.totalActiveAffiliates,
      totalCanceledAffiliates: state.totalCanceledAffiliates,
      totalConversions: state.totalConversions,
    };
  }

  constructor(private dashboardHttp: WorkspaceDashboardHttpService) {
    super();
  }

  @Action(WorkspaceDashboardStateActions.Get)
  getWorkspaceByOwner(ctx: StateContext<WorkspaceDashboardStateModel>, { ownerId }: WorkspaceDashboardStateActions.Get) {
    this.startLoading(ctx);
    return this.dashboardHttp.getDashboard(ownerId).pipe(
      tap({
        next: (res) => {
          ctx.patchState(res);
        },
        finalize: () => this.stopLoading(ctx),
      })
    );
  }
}
