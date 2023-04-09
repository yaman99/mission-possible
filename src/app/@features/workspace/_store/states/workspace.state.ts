import { IntegrationStatus } from '@shared/constants/integrationStatus';
import { NoticeService } from './../../../../@core/notification/notice.service';
import { map, tap } from 'rxjs';
import { LoadingHandler } from '@shared/state-helpers/loading-handler/LoadingHandler';
import { Injectable } from '@angular/core';
import { Action, Selector, State, StateContext } from '@ngxs/store';
import { AuthStateModel } from '@features/auth/models/authStateModel';
import { WorkspaceStateModel } from '@features/workspace/_models/WorkspaceState';
import { WorkspaceHttpService } from '@features/workspace/_services/workspace-http.service';
import { WorkspaceStateActions } from '../actions/workspace.action';
import { Workspace } from '@features/workspace/_models/workspace';
import { WorkspaceWalletStateActions } from '@features/workspace/settings/store/actions/workspaceWallet.actions';
import { WorkspaceDashboardStateActions } from '@features/workspace/dashbaord/store/actions/workspaceDashbaord.action';
import { WorkspaceCampaignStateActions } from '@features/workspace/workspace-campaign/store/actions/campaign.action';
import { GetWorkspaceCampaignsRequest } from '@features/workspace/workspace-campaign/models/requests/getWorkspaceCampaignsRequest';
import { WorkspaceIntegration } from '@features/workspace/_models/WorkspaceIntegration';
import { state } from '@angular/animations';
import { CreateIntegrationResponse } from '@features/workspace/_models/response/CreateIntegrationResponse';
import { IntegrationThirdParties } from '@shared/constants/integrationThirdParties';
import { Navigate } from '@ngxs/router-plugin';
import { AuthPaths } from '@shared/paths';

@State<WorkspaceStateModel>({
  name: 'workspace',
  defaults: {
    id: '',
    logo: '',
    title: '',
    category: '',
    firstName: '',
    lastName: '',
    subscriptionCode: '',
    isLoading: false,
    setupCompleted: false,
    integration: new WorkspaceIntegration(),
  },
})
@Injectable()
export class WorkspaceState extends LoadingHandler<WorkspaceStateModel> {
  @Selector()
  static isLoading(state: WorkspaceStateModel): boolean {
    return state.isLoading;
  }
  @Selector()
  static getLogo(state: WorkspaceStateModel): string {
    return state.logo;
  }
  @Selector()
  static workspace(state: WorkspaceStateModel): Workspace {
    return {
      id: state.id,
      title: state.title,
      firstName: state.firstName,
      lastName: state.lastName,
      category: state.category,
      setupCompleted: state.setupCompleted,
      logo: state.logo,
      subscriptionCode: state.subscriptionCode,
      integration: state.integration,
    };
  }

  @Selector()
  static isSetupCompleted(state: WorkspaceStateModel): boolean {
    return state.setupCompleted;
  }
  constructor(private workspaceHttp: WorkspaceHttpService, private notify: NoticeService) {
    super();
  }

  @Action(WorkspaceStateActions.Get)
  getWorkspaceByOwner(
    ctx: StateContext<WorkspaceStateModel>,
    { ownerId }: WorkspaceStateActions.Get
  ) {
    this.startLoading(ctx);
    return this.workspaceHttp.getByOwner(ownerId).pipe(
      tap({
        next: (res) => {
          console.log("w ",res.id);

          ctx.patchState(res);
          ctx.dispatch(new Navigate(AuthPaths.WorkspaceLoginRedirectPathComponents));

        },
        finalize: () => this.stopLoading(ctx),
      })
    );
  }

  @Action(WorkspaceStateActions.Update)
  updateWorkspace(
    ctx: StateContext<WorkspaceStateModel>,
    { payload }: WorkspaceStateActions.Update
  ) {
    this.startLoading(ctx);
    return this.workspaceHttp.update(payload).pipe(
      tap({
        next: () => {
          ctx.patchState(payload);
          this.notify.successNotice('WORKSPACE_ALERT_UPDATE_SUCCESSFULLY');
        },
        finalize: () => this.stopLoading(ctx),
      })
    );
  }

  @Action(WorkspaceStateActions.Integrate)
  integrateWorkspace(
    ctx: StateContext<WorkspaceStateModel>,
    { payload }: WorkspaceStateActions.Integrate
  ) {
    const state = ctx.getState();
    this.notify.loadingModal('جاري ربط المتجر');
    return this.workspaceHttp.createIntegration(payload).pipe(
      tap({
        next: () => {
          ctx.patchState({
            ...state,
            integration: {
              name: IntegrationThirdParties.salla,
              status: IntegrationStatus.integrated,
              tested: true,
            },
          });
          this.notify.successNotice('تم الربط بنجاح');
        },
      })
    );
  }

  @Action(WorkspaceStateActions.UpdateLogo)
  updateLogo(
    ctx: StateContext<WorkspaceStateModel>,
    { payload }: WorkspaceStateActions.UpdateLogo
  ) {
    this.startLoading(ctx);
    return this.workspaceHttp.updateLogo(payload).pipe(
      tap({
        next: (res) => {
          ctx.patchState({
            logo: res.id,
          });
          this.notify.successNotice('WORKSPACE_ALERT_UPDATE_SUCCESSFULLY');
        },
        finalize: () => this.stopLoading(ctx),
      })
    );
  }

  @Action(WorkspaceStateActions.SetSelectedLogo)
  setSelectedWorkspaceLogo(
    ctx: StateContext<WorkspaceStateModel>,
    { payload }: WorkspaceStateActions.SetSelectedLogo
  ) {
    this.startLoading(ctx);
    ctx.patchState({
      logo: payload,
    });
  }
}
