import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthBaseState, AuthStateActions } from '@features/auth';
import { ChangePasswordModel } from '@features/auth/models/changePassword.model';
import { UpdateEmailModel } from '@features/auth/models/updateEmail.model';
import { UpdatePhoneModel } from '@features/auth/models/updateUser.model';
import { User } from '@features/auth/models/user';
import { Select } from '@ngxs/store';
import { IBus } from '@shared/state-bus/IBus';
import { BehaviorSubject, Observable, Subscription } from 'rxjs';

@Component({
  selector: 'app-account-form',
  templateUrl: './account-form.component.html',
  styleUrls: ['./account-form.component.scss'],
})
export class AccountFormComponent implements OnInit, OnDestroy {
  changeEmail = false;
  resetPassword = false;
  changePhone = false;
  subscriptions: Subscription[] = [];
  accountForm: FormGroup;
  userId: string;
  verifyEmailMessage$ = new BehaviorSubject(false);
  @Select(AuthBaseState.getUser) user$: Observable<User>;

  get form() {
    return this.accountForm.controls;
  }
  constructor(private stateBus: IBus, private fb: FormBuilder) {}
  ngOnInit(): void {
    this.userId = this.stateBus.getSnapshot(AuthBaseState.getUser).id!;
    this.initForm();
    // this.getUser();
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
    this.stateBus.excuteAction(new AuthStateActions.GetUser());
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
