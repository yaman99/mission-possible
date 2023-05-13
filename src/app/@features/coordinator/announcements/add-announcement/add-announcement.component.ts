import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';


@Component({
  selector: 'app-add-announcement',
  templateUrl: './add-announcement.component.html',
  styleUrls: ['./add-announcement.component.scss']
})
export class AddAnnouncementComponent implements OnInit {
  get form() {
    return this.usersForm.controls;
  }

  usersForm: FormGroup;
  updateMode = false;

  constructor(private fb: FormBuilder,private router : Router) {}

  ngOnInit(): void {
    this.initForm();
  }

  initForm() {
    this.usersForm = this.fb.group({
      title: ['', Validators.compose([Validators.required,Validators.minLength(5)])],
      content: ['', Validators.compose([Validators.required,Validators.minLength(20)])],
    });
  }

  // prepareUpdateForm() {
  //   const userId = this.route.snapshot.paramMap.get('id')!;
  //   console.log(userId);

  //   this.currentUser = this.stateBus.getSnapshot(UsersManagementState.getUserById(userId))!;
  //   console.log(this.currentUser);

  //   this.usersForm.patchValue({
  //     email: this.currentUser.email,
  //     phone: this.currentUser.phone,
  //     isActive: this.currentUser.isActive,
  //     id: this.currentUser.id,
  //   });
  // }

  checkifformValid() {
    return this.usersForm.valid;
  }
  saveChanges() {
    // console.log(this.form.isActive.value);
    let model = {
      title: this.form.title.value,
      content: this.form.content.value,
    };

    console.log(model);
    this.router.navigate(['/co/announcements/announcementsList']);

    // this.userServ.AddNewUser(model);
    // this.router.navigate(['/a/users-management/list']);
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
