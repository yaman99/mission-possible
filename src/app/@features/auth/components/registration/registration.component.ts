import { AuthStateActions } from '@features//auth/actions/auth.action';
import { IBus } from '@shared/state-bus/IBus';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Subscription, Observable, BehaviorSubject } from 'rxjs';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { MatchPassword } from './confirm-password.validator';
import { first } from 'rxjs/operators';
import { AuthBaseState } from '../../states/auth.state';
import { SignUpModel } from '../../models/signUp.model';

@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.scss'],
})
export class RegistrationComponent implements OnInit, OnDestroy {
  registrationForm: FormGroup;
  // hasError: boolean;
  isLoading$: Observable<boolean>;
  preSelectedUserType = '';
  accountCreated = new BehaviorSubject<boolean>(false);

  // private fields
  private unsubscribe: Subscription[] = []; // Read more: => https://brianflove.com/2016/12/11/anguar-2-unsubscribe-observables/

  constructor(private fb: FormBuilder, private stateBus: IBus, private route: ActivatedRoute) {
    // redirect to home if already logged in
    this.preSelectedUserType = this.route.snapshot.queryParams['type'] ?? '';
  }

  ngOnInit(): void {
    this.initForm();
    this.isLoading$ = this.stateBus.getState<boolean>(AuthBaseState.isLoading);
  }

  // convenience getter for easy access to form fields
  get f() {
    return this.registrationForm.controls;
  }

  initForm() {
    this.registrationForm = this.fb.group(
      {
        firstName: [
          '',
          Validators.compose([
            Validators.required,
            Validators.minLength(3),
            Validators.maxLength(100),
          ]),
        ],
        lastName: [
          '',
          Validators.compose([
            Validators.required,
            Validators.minLength(3),
            Validators.maxLength(100),
          ]),
        ],
        email: [
          '',
          Validators.compose([
            Validators.required,
            Validators.email,
            Validators.minLength(3),
            Validators.maxLength(320), // https://stackoverflow.com/questions/386294/what-is-the-maximum-length-of-a-valid-email-address
          ]),
        ],
        password: [
          '',
          Validators.compose([
            Validators.required,
            Validators.minLength(3),
            Validators.maxLength(100),
          ]),
        ],
        cPassword: [
          '',
          Validators.compose([
            Validators.required,
            Validators.minLength(3),
            Validators.maxLength(100),
          ]),
        ],
        userType: [this.preSelectedUserType ?? '', Validators.required],
      },
      {
        validators: MatchPassword(),
      }
    );
  }

  submit() {
    let model: SignUpModel = {
      email: this.f.email.value,
      firstName: this.f.firstName.value,
      lastName: this.f.lastName.value,
      password: this.f.password.value,
      confirmPassword: this.f.cPassword.value,
      userType: this.f.userType.value,
    };

    const sub = this.stateBus.excuteAction(new AuthStateActions.SignUp(model)).subscribe({
      next: () => {
        this.accountCreated.next(true);
      },
    });
    this.unsubscribe.push(sub);
  }
  ngOnDestroy() {
    this.unsubscribe.forEach((sb) => sb.unsubscribe());
  }
}
