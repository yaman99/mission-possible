import { UsersManagementHttpService } from './../../common/services/usersManagementHttp.service';
import { BehaviorSubject } from 'rxjs';
import { AddNewAdminRequest } from './../../common/models/requests/addNewAdminRequest';
import { UsersManagementModel } from './../../common/models/usersManagementModel';
import { UsersManagementPathActions } from './../../common/paths/usersManagementPaths.constants';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { IBus } from '@shared/state-bus/IBus';
import { UsersManagementPaths } from '../../common/paths/usersManagementPaths.constants';
import { UsersManagementState } from '../../common/StateStore/usersManagement.state';
import { UsersManagementStateActions } from '../../common/StateStore/usersManagement.action';
import { UpdateUserRequest } from '../../common/models/requests/updateUserRequest';
import { UserTypes } from '@shared/constants';

@Component({
  selector: 'app-users-form',
  templateUrl: './users-form.component.html',
  styleUrls: ['./users-form.component.scss'],
})
export class UsersFormComponent implements OnInit {
  get form() {
    return this.usersForm.controls;
  }
  paths = {
    usersList: UsersManagementPaths.listComponents,
  };
  usersForm: FormGroup;
  updateMode = false;
  currentUser: UsersManagementModel;
  userType = UserTypes;
  fakeUsers = [
    {
      id: '1',
      firstName: 'KRİSTİN',
      lastName: 'SURPUHİ BENLİ',
      email: 'kristin.benli@uskudar.edu.tr',
      userType: this.userType.coordinator,
    },
    {
      id: '2',
      firstName: 'TÜRKER',
      lastName: 'EKİN ERGÜZEL',
      email: 'turker.erguzel@uskudar.edu.tr',
      userType: this.userType.coordinator,
    },
    {
      id: '3',
      firstName: 'KİLİÇ',
      lastName: 'ERGÜN ERİN',
      email: 'kilic.ergun@uskudar.edu.tr',
      userType :this.userType.careerCenter
    }
  ];

  constructor(
    private route: ActivatedRoute,
    private router:Router,
    private fb: FormBuilder,
    private stateBus: IBus,
    private userServ: UsersManagementHttpService
  ) {}

  ngOnInit(): void {
    this.initForm();
    const action = this.route.snapshot.url[0];
    switch (action.path) {
      case UsersManagementPathActions.editUser:
        this.updateMode = true;
        this.prepareUpdateForm();
        break;
      case UsersManagementPathActions.addUser:
        this.updateMode = false;
        break;
    }
  }

  initForm() {
    this.usersForm = this.fb.group({
      email: ['', Validators.compose([Validators.required])],
      userType: ['', Validators.required],
    });
  }

  prepareUpdateForm() {
    const userId = this.route.snapshot.paramMap.get('id')!;
    console.log(userId);

    this.currentUser = this.stateBus.getSnapshot(UsersManagementState.getUserById(userId))!;
    console.log(this.currentUser);

    this.usersForm.patchValue({
      email: this.currentUser.email,
      phone: this.currentUser.phone,
      isActive: this.currentUser.isActive,
      id: this.currentUser.id,
    });
  }

  checkifformValid() {
    return this.usersForm.valid;
  }
  saveChanges() {
    // console.log(this.form.isActive.value);
    let model = {
      email: this.form.email.value,
      userType: this.form.userType.value,
    };
    this.userServ.AddNewUser(model);
    this.router.navigate(['/a/users-management/list']);
    // let insertModel: AddNewAdminRequest = {
    //   email: this.form.email.value,
    //   phone: this.form.phone.value,
    //   isActive: this.form.isActive.value == 'true' ? true : false
    // };
    // if (!this.updateMode) {
    //   this.stateBus.excuteAction(new UsersManagementStateActions.AddNewAdmin(insertModel));
    // } else {
    //   let updateModel: UpdateUserRequest = {
    //     ...insertModel,
    //     id: this.currentUser.id
    //   };
    //   this.stateBus.excuteAction(new UsersManagementStateActions.UpdateUser(updateModel));
    // }
  }
}
