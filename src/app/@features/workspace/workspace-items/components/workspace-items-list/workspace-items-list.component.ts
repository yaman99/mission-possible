import { Observable } from 'rxjs';
import { WorkspaceItemState } from './../../store/states/item.state';
import { WorkspaceState } from './../../../_store/states/workspace.state';
import { GetWorkspaceItemsRequest } from './../../models/requests/getWorkspaceItemsRequest';
import { ItemPaths } from '@shared/paths';
import { Component, OnInit } from '@angular/core';
import { IBus } from '@shared/state-bus/IBus';
import { WorkspaceItemStateActions } from '../../store/actions/item.action';
import { Select } from '@ngxs/store';
import { Item } from '../../models/item.model';
import { PagedResultBase } from '@shared/models/pagination';
import { IntegrationThirdParties } from '@shared/constants/integrationThirdParties';
import { WorkspaceIntegration } from '@features/workspace/_models/WorkspaceIntegration';
import { IntegrationStatus } from '@shared/constants/integrationStatus';

@Component({
  selector: 'app-workspace-items-list',
  templateUrl: './workspace-items-list.component.html',
  styleUrls: ['./workspace-items-list.component.scss'],
})
export class WorkspaceItemsListComponent implements OnInit {
  @Select(WorkspaceItemState.items) items$: Observable<Item[]>;
  @Select(WorkspaceItemState.pagination) pagination$: Observable<PagedResultBase>;
  @Select(WorkspaceItemState.isLoading) isLoading$: Observable<boolean>;
  workspaceId: string;
  paths = {
    addItemPath: ItemPaths.AddItemComponents,
    // editItemPath: ItemPaths.EditItemComponents,
    viewItemPath: ItemPaths.ViewItemComponents,
  };
  thirdPartiesNames = IntegrationThirdParties;
  integrationStatus = IntegrationStatus;
  currentIntegraion: WorkspaceIntegration;
  constructor(private stateBus: IBus) {}

  ngOnInit(): void {
    this.currentIntegraion = this.stateBus.getSnapshot(WorkspaceState.workspace).integration;
    this.workspaceId = this.stateBus.getSnapshot(WorkspaceState.workspace).id;
    this.getPage(1);
  }
  deleteItem(itemId: string) {
    this.stateBus.excuteAction(new WorkspaceItemStateActions.Delete(itemId, false));
  }
  getPage(page: number) {
    let model: GetWorkspaceItemsRequest = {
      workspaceId: this.workspaceId,
      pagination: {
        page: page,
        result: 10,
        orderBy: 'CreatedDate',
      },
    };
    this.stateBus.excuteAction(new WorkspaceItemStateActions.GetAll(model));
  }

  SyncYourProduct() {
    this.stateBus.excuteAction(new WorkspaceItemStateActions.SyncSallaProducts(this.workspaceId));
  }
}
