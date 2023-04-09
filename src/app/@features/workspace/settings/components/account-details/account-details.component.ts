import { map } from 'rxjs/operators';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { User } from './../../../../auth/models/user';
import { IBus } from '@shared/state-bus/IBus';
import { AuthBaseState } from './../../../../auth/states/auth.state';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { Select } from '@ngxs/store';
import { AuthStateActions } from '@features/auth';
import { UpdatePhoneModel } from '@features/auth/models/updateUser.model';
import { Subscription, tap, BehaviorSubject } from 'rxjs';
import { UpdateEmailModel } from '@features/auth/models/updateEmail.model';
import { ChangePasswordModel } from '@features/auth/models/changePassword.model';

@Component({
  selector: 'app-account-details',
  templateUrl: './account-details.component.html',
  styleUrls: ['./account-details.component.scss'],
})
export class AccountDetailsComponent implements OnInit, OnDestroy {
  changeEmail = false;
  changePhone = false;
  resetPassword = false;
  subscriptions: Subscription[] = [];
  accountForm: FormGroup;
  userEmail: string;
  userPhone: string;
  userId: string;
  verifyEmailMessage$ = new BehaviorSubject(false);
  get form() {
    return this.accountForm.controls;
  }
  constructor(private stateBus: IBus, private fb: FormBuilder) {}
  ngOnInit(): void {
    this.userId = this.stateBus.getSnapshot(AuthBaseState.getUser).id!;
    this.initForm();
    this.getUser();
  }

  displayChangeEmail() {
    this.changeEmail = !this.changeEmail;
  }

  displayResetPassword() {
    this.resetPassword = !this.resetPassword;
  }
  displayChangePhone() {
    this.changePhone = !this.changePhone;
  }
  initForm() {
    this.accountForm = this.fb.group({
      phoneGroup: this.fb.group({
        phone: ['', Validators.required],
      }),
      emailGroup: this.fb.group({
        email: ['', Validators.required],
        password: ['', Validators.required],
      }),
      resetPasswordGroup: this.fb.group({
        currentPassword: ['', Validators.required],
        newPassword: ['', Validators.required],
        confirmPassword: ['', Validators.required],
      }),
    });
  }

  getUser() {
    // this.stateBus.excuteAction(new AuthStateActions.GetUser());
    const sub = this.stateBus.getState(AuthBaseState.getUser).subscribe((data) => {
      this.userEmail = data.email!;
      this.userPhone = data.phone!;
    });
    this.subscriptions.push(sub);
  }

  updateForm(data: User, groupName: string) {
    this.accountForm.get(groupName)?.patchValue(data);
  }
  ngOnDestroy(): void {
    this.subscriptions.forEach((x) => x.unsubscribe());
  }
  updateEmail() {
    let model: UpdateEmailModel = {
      email: this.form.emailGroup.get('email')?.value,
      password: this.form.emailGroup.get('password')?.value,
    };
    const sub = this.stateBus.excuteAction(new AuthStateActions.UpdateEmail(model)).subscribe(() => {
      this.verifyEmailMessage$.next(true);
    });
    this.subscriptions.push(sub);
  }
  updatePassword() {
    let model: ChangePasswordModel = {
      currentPassword: this.form.resetPasswordGroup.get('currentPassword')?.value,
      newPassword: this.form.resetPasswordGroup.get('newPassword')?.value,
      confirmPassword: this.form.resetPasswordGroup.get('confirmPassword')?.value,
    };
    this.stateBus.excuteAction(new AuthStateActions.ChangePassword(model));
  }

  updatePhone() {
    let model: UpdatePhoneModel = {
      phone: this.form.phoneGroup.get('phone')?.value,
    };
    this.stateBus.excuteAction(new AuthStateActions.UpdateUser(model));
  }
}
