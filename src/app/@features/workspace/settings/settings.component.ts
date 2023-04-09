import { Observable, Subscription } from 'rxjs';
import { WorkspaceState } from '@features/workspace/_store/states/workspace.state';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { Select } from '@ngxs/store';
import { Workspace } from '../_models/workspace';
import { AuthBaseState } from '@features/auth';
import { IBus } from '@shared/state-bus/IBus';
import { WorkspaceStateActions } from '../_store/actions/workspace.action';
import { User } from '@features/auth/models/user';
import { WorkspaceSettingsPaths } from '../paths';

@Component({
  selector: 'app-settings',
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.scss'],
})
export class SettingsComponent implements OnInit, OnDestroy {
  subscriptions: Subscription[] = [];
  pictureInput: HTMLInputElement | null;
  logoEditMode = false;
  oldLogo: string;
  workspace: Workspace;
  formData = new FormData();
  paths = {
    account: WorkspaceSettingsPaths.accountComponents,
    payment: WorkspaceSettingsPaths.paymentComponents,
    profile: WorkspaceSettingsPaths.workspaceComponents,
    integration: WorkspaceSettingsPaths.integrationComponents,
  };

  @Select(WorkspaceState.getLogo) logo$: Observable<string>;
  @Select(AuthBaseState.getUser) user$: Observable<User>;

  constructor(private stateBus: IBus) {}

  ngOnInit(): void {
    const sub = this.stateBus.getState(WorkspaceState.workspace).subscribe((x) => {
      this.workspace = x;
    });
    this.subscriptions.push(sub);
  }

  changeLogo() {
    document.getElementById('upload-file')?.click();
  }
  fileSelected(event: Event) {
    this.oldLogo = this.workspace.logo;
    this.logoEditMode = true;

    this.pictureInput = event.target as HTMLInputElement;
    const picture = this.pictureInput.files![0];
    if (picture) {
      this.formData.append('logo', picture);

      const reader = new FileReader();
      reader.readAsDataURL(picture);
      reader.onload = () => this.stateBus.excuteAction(new WorkspaceStateActions.SetSelectedLogo(reader.result));
    }
  }

  saveImage() {
    this.stateBus.excuteAction(new WorkspaceStateActions.UpdateLogo(this.formData));
  }
  resetImage() {
    this.logoEditMode = false;
    this.pictureInput!.value = '';
    this.stateBus.excuteAction(new WorkspaceStateActions.SetSelectedLogo(this.oldLogo));
  }
  ngOnDestroy(): void {
    this.subscriptions.forEach((x) => x.unsubscribe());
  }
}
