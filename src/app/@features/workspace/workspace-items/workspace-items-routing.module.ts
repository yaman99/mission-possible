import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ItemPaths } from '@shared/paths';
import { WorkpsaceItemDetailsComponent } from './components/workpsace-item-details/workpsace-item-details.component';
import { WorkspaceItemsFormComponent } from './components/workspace-items-form/workspace-items-form.component';
import { WorkspaceItemsListComponent } from './components/workspace-items-list/workspace-items-list.component';

const routes: Routes = [
  {
    path:ItemPaths.ItemsList,
    component:WorkspaceItemsListComponent
  },
  {
    path:ItemPaths.AddItem,
    component: WorkspaceItemsFormComponent
  },
  {
    path:ItemPaths.EditItem + '/:id',
    component: WorkspaceItemsFormComponent
  },
  {
    path:ItemPaths.ViewItem + '/:id',
    component: WorkpsaceItemDetailsComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class WorkspaceItemsRoutingModule { }
