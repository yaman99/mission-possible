import { WorkspaceItemState } from './../../store/states/item.state';
import { Item } from './../../models/item.model';
import { WorkspaceState } from './../../../_store/states/workspace.state';
import { AddNewItemRequest } from '../../models/requests/addNewItemRequest';
import { ItemActions, ItemPaths } from '@shared/paths/item.constants';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { UpdateItemRequest } from '../../models/requests/updateItemRequest';
import { IBus } from '@shared/state-bus/IBus';
import { WorkspaceItemStateActions } from '../../store/actions/item.action';

@Component({
  selector: 'app-workspace-items-form',
  templateUrl: './workspace-items-form.component.html',
  styleUrls: ['./workspace-items-form.component.scss'],
})
export class WorkspaceItemsFormComponent implements OnInit {
  paths = {
    ItemsListPath: ItemPaths.ItemsListComponents,
  };
  subscriptions: Subscription[] = [];
  pictureInput: HTMLInputElement | null;
  logoEditMode = false;
  oldImage: string;
  formData = new FormData();
  itemForm: FormGroup;
  updateMode = false;
  workspaceId: string;
  currentItem: Item | undefined;
  get form() {
    return this.itemForm.controls;
  }

  constructor(private route: ActivatedRoute, private fb: FormBuilder, private stateBus: IBus) {}

  ngOnInit(): void {
    this.initForm();
    const action = this.route.snapshot.url[0];
    switch (action.path) {
      case ItemActions.EditItem:
        this.updateMode = true;
        this.prepareUpdateForm();
        break;
      case ItemActions.AddItem:
        this.updateMode = false;
        break;
    }
    this.workspaceId = this.stateBus.getSnapshot(WorkspaceState.workspace).id;
  }
  prepareUpdateForm() {
    const itemId = this.route.snapshot.paramMap.get('id')!;
    this.currentItem = this.stateBus.getSnapshot(WorkspaceItemState.getItemById(itemId))!;
    this.itemForm.patchValue({
      name: this.currentItem.name,
      url: this.currentItem.url,
      price: this.currentItem.product.price,
      store: this.currentItem.product.store,
      sku: this.currentItem.product.sku,
    });
  }

  initForm() {
    this.itemForm = this.fb.group({
      name: ['', Validators.required],
      url: ['', Validators.required],
      price: ['', Validators.required],
      store: ['', Validators.required],
      sku: ['', Validators.required],
    });
  }
  // onTypeSelect(e: Event) {
  //   const target = e.target as HTMLSelectElement;
  //   if (target.value === 'ecommerce') {
  //     this.itemAsProduct = true;
  //   } else {
  //     this.itemAsProduct = false;
  //   }
  // }
  saveChanges() {
    // let addModel: AddNewItemRequest = {
    //   name: this.form.name.value,
    //   url: decodeURIComponent(this.form.url.value),
    //   workspace: this.workspaceId,
    //   product: {
    //     price: this.form.price?.value,
    //     store: this.form.store?.value,
    //     sku: this.form.sku?.value,
    //   },
    // };
    // if (this.updateMode) {
    //   let updateModel: UpdateItemRequest = {
    //     ...addModel,
    //     itemId: this.currentItem?.id!,
    //   };
    //   this.stateBus.excuteAction(new WorkspaceItemStateActions.Update(updateModel));
    // } else {
    //   this.stateBus.excuteAction(new WorkspaceItemStateActions.Add(addModel));
    // }
  }
  // openFileSelection() {
  //   document.getElementById('upload-image')?.click();
  // }
  // fileSelected(event: Event) {
  //   // this.oldImage = this.workspace.logo;
  //   this.logoEditMode = true;

  //   this.pictureInput = event.target as HTMLInputElement;
  //   const picture = this.pictureInput.files![0];
  //   if (picture) {
  //     this.formData.append('logo', picture);

  //     const reader = new FileReader();
  //     reader.readAsDataURL(picture);
  //     // reader.onload = () => this.stateBus.excuteAction(new WorkspaceStateActions.SetSelectedLogo(reader.result));
  //   }
  // }

  // saveImage() {
  //   // this.stateBus.excuteAction(new WorkspaceStateActions.UpdateLogo(this.formData));
  // }
  // resetImage() {
  //   this.logoEditMode = false;
  //   this.pictureInput!.value = '';
  //   // this.stateBus.excuteAction(new WorkspaceStateActions.SetSelectedLogo(this.oldLogo));
  // }
}
