import { Observable } from 'rxjs';
import { IntegrationThirdParties } from '../../../../../../@shared/constants/integrationThirdParties';
import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { Select } from '@ngxs/store';
import { WorkspaceState } from '@features/workspace/_store/states/workspace.state';
import { Workspace } from '@features/workspace/_models/workspace';
import { IBus } from '@shared/state-bus/IBus';
import { IntegrationStatus } from '@shared/constants/integrationStatus';

@Component({
  selector: 'app-stores-list',
  templateUrl: './stores-list.component.html',
  styleUrls: ['./stores-list.component.scss'],
})
export class StoresListComponent {
  @Output() selectedStore = new EventEmitter<string>();
  @Select(WorkspaceState.workspace) $workspace: Observable<Workspace>;
  integrationStatus = IntegrationStatus;
  stores = [
    {
      name: IntegrationThirdParties.salla,
      title: "سلة - Salla",
      logo: './assets/media/logos/salla.png',
    },
    {
      name: IntegrationThirdParties.zid,
      title: "زد - Zid",
      logo: './assets/media/logos/zid.png',
      class:'mt-7'
    },
    {
      name: IntegrationThirdParties.glary,
      title: "قلاري - Glary",
      logo: './assets/media/logos/glary.png',
    },
    {
      name: IntegrationThirdParties.dash,
      title: "داش - Dash ",
      logo: './assets/media/logos/dash.png',
    },
  ];

  selectStore(name: string) {
    this.selectedStore.emit(name);
  }
}
