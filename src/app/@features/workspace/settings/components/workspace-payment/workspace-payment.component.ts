import { Observable } from 'rxjs';
import { WorkspaceState } from '@features/workspace/_store/states/workspace.state';
import { IBus } from '@shared/state-bus/IBus';
import { Component, OnInit } from '@angular/core';
import { Select } from '@ngxs/store';
import { WorkspaceWalletState } from '../../store/states/workspaceWallet.state';
import { WorkspaceWalletStateActions } from '../../store/actions/workspaceWallet.actions';

@Component({
  selector: 'app-workspace-payment',
  templateUrl: './workspace-payment.component.html',
  styleUrls: ['./workspace-payment.component.scss'],
})
export class WorkspacePaymentComponent implements OnInit {
  @Select(WorkspaceWalletState.Balance) balance$: Observable<string>;
  @Select(WorkspaceWalletState.isLoading) isLoading$: Observable<boolean>;
  constructor(private stateBus: IBus) {}

  ngOnInit(): void {
    const workspaceId = this.stateBus.getSnapshot(WorkspaceState.workspace).id;
    this.stateBus.excuteAction(new WorkspaceWalletStateActions.GetBlanace(workspaceId));
    // this.balance = this.stateBus.getSnapshout(WorkspaceWalletState.Balance);
  }
}
