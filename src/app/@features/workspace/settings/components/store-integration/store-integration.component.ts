import { WorkspaceStateActions } from '@features/workspace/_store/actions/workspace.action';
import { IntegrationWithSallaComponent } from './integration-with-salla/integration-with-salla.component';
import { ActivatedRoute, Router } from '@angular/router';
import { Component, OnInit, ViewChild, AfterViewInit } from '@angular/core';
import { v4 as uuidv4 } from 'uuid';
import { NoticeService } from '@core/notification/notice.service';
import { IBus } from '@shared/state-bus/IBus';
import { CreateIntegrationRequest } from '@features/workspace/_models/requests/CreateIntegrationRequest';
import { WorkspaceState } from '@features/workspace/_store/states/workspace.state';
import { WorkspaceSettingsPaths } from '@features/workspace/paths';
import { IntegrationStatus } from '@shared/constants/integrationStatus';
@Component({
  selector: 'app-store-integration',
  templateUrl: './store-integration.component.html',
  styleUrls: ['./store-integration.component.scss'],
})
export class StoreIntegrationComponent implements AfterViewInit {
  queryParameters = this.route.snapshot.queryParams;
  hasSelected = false;
  selectedStoreName: string;
  path = {
    integration: WorkspaceSettingsPaths.integrationComponents,
  };
  constructor(
    private route: ActivatedRoute,
    private notification: NoticeService,
    private stateBus: IBus,
    private router: Router
  ) {}
  ngAfterViewInit(): void {
    this.catchIntegrationCallBackUrl();
  }

  selectStore(name: string) {
    const integration = this.stateBus.getSnapshot(WorkspaceState.workspace).integration;
    if (integration.status === IntegrationStatus.integrated && integration.name === name) {
      this.setStore(name);
    } else if (integration.status === IntegrationStatus.notCreatedYet) {
      localStorage.setItem('storeName', name);
      localStorage.setItem('integrationState', uuidv4());
      this.setStore(name);
    } else {
      this.notification.generalErrorNotice('لايمكنك ربط مساحة العمل بأكثر من متجر');
    }
  }
  unSelectStore() {
    this.hasSelected = false;
    this.selectedStoreName = '';
  }
  setStore(name: string) {
    this.hasSelected = true;
    this.selectedStoreName = name;
  }
  catchIntegrationCallBackUrl() {
    if (this.queryParameters.code && this.queryParameters.state) {
      const storeName = localStorage.getItem('storeName');
      const intgreationState = localStorage.getItem('integrationState');
      if (intgreationState !== this.queryParameters.state) {
        this.notification.generalErrorNotice('Unable to Complete the integration');
        this.router.navigate(this.path.integration);
        return;
      }
      if (storeName) {
        this.setStore(storeName);
        let model: CreateIntegrationRequest = {
          authCode: this.queryParameters.code,
          workspaceId: this.stateBus.getSnapshot(WorkspaceState.workspace).id,
          integrationSide: storeName,
        };
        this.stateBus.excuteAction(new WorkspaceStateActions.Integrate(model));
      }
      localStorage.removeItem('storeName');
      localStorage.removeItem('integrationState');
    }
  }
}
