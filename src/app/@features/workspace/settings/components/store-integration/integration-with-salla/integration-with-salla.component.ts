import { environment } from 'src/environments/environment';
import { Observable } from 'rxjs';
import { Component, OnInit } from '@angular/core';
import { WorkspaceState } from '@features/workspace/_store/states/workspace.state';
import { Select } from '@ngxs/store';
import { Workspace } from '@features/workspace/_models/workspace';
import { Router } from '@angular/router';
import { IntegrationStatus } from '@shared/constants/integrationStatus';

@Component({
  selector: 'app-integration-with-salla',
  templateUrl: './integration-with-salla.component.html',
  styleUrls: ['./integration-with-salla.component.scss'],
})
export class IntegrationWithSallaComponent {
  appInstalled = false;
  step2Completed: boolean;
  integrationState = localStorage.getItem('integrationState');
  callbackUrl = environment.integrationCallbackUrl;
  clientId = 'ee9ebcaebff3db1c5ea6f4ae68573415';
  integrationStatus = IntegrationStatus
  @Select(WorkspaceState.workspace) workspace$: Observable<Workspace>;
  constructor() {}
  startIntegration() {
    // https://accounts.salla.sa/oauth2/auth?scope=offline_access&state=m,bnzxc7&response_type=code&approval_prompt=auto&redirect_uri=http://localhost:4200/w/settings/integration&client_id=ee9ebcaebff3db1c5ea6f4ae68573415
    let url = `https://accounts.salla.sa/oauth2/auth?scope=offline_access&state=${this.integrationState}&response_type=code&approval_prompt=auto&redirect_uri=${this.callbackUrl}&client_id=${this.clientId}`;
    location.assign(url);
  }
}
