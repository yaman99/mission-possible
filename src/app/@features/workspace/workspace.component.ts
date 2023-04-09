import { Component, OnInit } from '@angular/core';
import { AuthBaseState } from '@features/auth';
import { Select } from '@ngxs/store';
import { IBus } from '@shared/state-bus/IBus';
import { WorkspaceWalletStateActions } from './settings/store/actions/workspaceWallet.actions';
import { WorkspaceStateActions } from './_store/actions/workspace.action';
import { WorkspaceState } from './_store/states/workspace.state';

@Component({
  selector: 'app-workspace',
  templateUrl: './workspace.component.html',
  styleUrls: ['./workspace.component.scss'],
})
export class WorkspaceComponent   {
  constructor() {}


}
