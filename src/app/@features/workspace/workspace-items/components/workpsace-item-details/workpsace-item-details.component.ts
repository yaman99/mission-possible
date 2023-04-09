import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ItemPaths } from '@shared/paths';
import { IBus } from '@shared/state-bus/IBus';
import { Item } from '../../models/item.model';
import { WorkspaceItemStateActions } from '../../store/actions/item.action';
import { WorkspaceItemState } from '../../store/states/item.state';

@Component({
  selector: 'app-workpsace-item-details',
  templateUrl: './workpsace-item-details.component.html',
  styleUrls: ['./workpsace-item-details.component.scss'],
})
export class WorkpsaceItemDetailsComponent implements OnInit {
  currentItem: Item | undefined;
  paths = {
    ItemsListPath: ItemPaths.ItemsListComponents,
    editItemPath: ItemPaths.EditItemComponents,
  };
  constructor(private route: ActivatedRoute, private stateBus: IBus) {}

  ngOnInit(): void {
    this.getDetails();
  }
  deleteItem(itemId: string) {
    this.stateBus.excuteAction(new WorkspaceItemStateActions.Delete(itemId, true));
  }
  getDetails() {
    const itemId = this.route.snapshot.paramMap.get('id')!;
    this.currentItem = this.stateBus.getSnapshot(WorkspaceItemState.getItemById(itemId))!;
  }
}
