import { Observable, Subscription } from 'rxjs';
import { IBus } from '@shared/state-bus/IBus';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { Select } from '@ngxs/store';
import { WorkspaceState } from '@features/workspace/_store/states/workspace.state';
import { Workspace } from '@features/workspace/_models/workspace';
import { UpdateWorkspaceModel } from '@features/workspace/_models/updateWorkspace';
import { WorkspaceStateActions } from '@features/workspace/_store/actions/workspace.action';

@Component({
  selector: 'app-workspace-details',
  templateUrl: './workspace-details.component.html',
  styleUrls: ['./workspace-details.component.scss'],
})
export class WorkspaceDetailsComponent implements OnDestroy, OnInit {
  workspaceDetailsForm: FormGroup;
  workspaceId: string;
  subscriptions: Subscription[] = [];

  get form() {
    return this.workspaceDetailsForm.controls;
  }
  constructor(private fb: FormBuilder, private stateBus: IBus) {
    this.initForm();
  }
  ngOnInit(): void {
    this.getDate();
  }
  ngOnDestroy(): void {
    this.subscriptions.forEach((x) => x.unsubscribe());
  }
  initForm() {
    this.workspaceDetailsForm = this.fb.group({
      title: ['', Validators.compose([Validators.required, Validators.minLength(3), Validators.maxLength(100)])],
      category: ['', Validators.required],
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
    });
  }
  getDate() {
    const data = this.stateBus.getSnapshot(WorkspaceState.workspace);
    this.updateForm(data);
  }
  saveChanges() {
    let model: UpdateWorkspaceModel = {
      id: this.workspaceId,
      category: this.form.category.value,
      title: this.form.title.value,
      firstName: this.form.firstName.value,
      lastName: this.form.lastName.value,
    };

    this.stateBus.excuteAction(new WorkspaceStateActions.Update(model));
  }

  updateForm(data: Workspace) {
    this.workspaceDetailsForm.patchValue(data);

    this.workspaceId = data.id;
  }
}
