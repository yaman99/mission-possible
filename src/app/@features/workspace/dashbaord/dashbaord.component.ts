import { Observable, Subscription } from 'rxjs';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { IBus } from '@shared/state-bus/IBus';
import { WorkspaceState } from '../_store/states/workspace.state';
import { DashboardViewModel } from './models/dashboardView';
import { WorkspaceDashboardHttpService } from './services/workspace-dashboard-http.service';
import { Select, State } from '@ngxs/store';
import { WorkspaceDashbaordState } from './store/states/workspaceDashboard.state';
import { WorkspaceWalletStateActions } from '../settings/store/actions/workspaceWallet.actions';
import { WorkspaceDashboardStateActions } from './store/actions/workspaceDashbaord.action';

@Component({
  selector: 'app-dashbaord',
  templateUrl: './dashbaord.component.html',
  styleUrls: ['./dashbaord.component.scss'],
})
export class DashbaordComponent {
  @Select(WorkspaceDashbaordState.data) dashboard$: Observable<DashboardViewModel>;
  @Select(WorkspaceDashbaordState.isLoading) loading$: Observable<boolean>;
  workspaceId: string;
  constructor(private stateBus: IBus) {
    this.workspaceId = this.stateBus.getSnapshot(WorkspaceState.workspace).id;
    this.stateBus.excuteAction(new WorkspaceDashboardStateActions.Get(this.workspaceId));
  }
}
