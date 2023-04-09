import { NgxsModule } from '@ngxs/store';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { WorkspaceItemsRoutingModule } from './workspace-items-routing.module';
import { WorkspaceItemsFormComponent } from './components/workspace-items-form/workspace-items-form.component';
import { WorkspaceItemsListComponent } from './components/workspace-items-list/workspace-items-list.component';
import { SharedModule } from '@shared/shared.module';
import { WorkspaceItemState } from './store/states/item.state';
import { WorkpsaceItemDetailsComponent } from './components/workpsace-item-details/workpsace-item-details.component';
import { NgbDropdownModule } from '@ng-bootstrap/ng-bootstrap';

@NgModule({
  declarations: [WorkspaceItemsFormComponent, WorkspaceItemsListComponent, WorkpsaceItemDetailsComponent],
  imports: [SharedModule, WorkspaceItemsRoutingModule, NgxsModule.forFeature([WorkspaceItemState]) , NgbDropdownModule],
})
export class WorkspaceItemsModule {}
