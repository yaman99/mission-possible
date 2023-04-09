import { AuthStateActions } from '@features//auth/actions/auth.action';
import { state } from '@angular/animations';
import { ActivatedRoute } from '@angular/router';
import { BehaviorSubject, Observable, Subscription } from 'rxjs';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { AuthBaseState, MatchPassword } from '@features/auth';
import { IBus } from '@shared/state-bus/IBus';
import { Select } from '@ngxs/store';
import { SetPasswordRequest } from '@features/auth/models/SetPasswordRequest';

@Component({
  selector: 'app-quick-integration',
  templateUrl: './quick-integration.component.html',
  styleUrls: ['./quick-integration.component.scss'],
})
export class QuickIntegrationComponent implements OnInit, OnDestroy {
  quickIntegrationForm: FormGroup;
  authCode: string;
  email: string;
  caretingAccount = new BehaviorSubject(true);
  subscription: Subscription[] = [];
  RedirectedFromEmail = true;
  @Select(AuthBaseState.isLoading) isLoading$: Observable<boolean>;
  get f() {
    return this.quickIntegrationForm.controls;
  }
  constructor(private fb: FormBuilder, private route: ActivatedRoute, private stateBus: IBus) {}

  ngOnInit(): void {
    this.initForm();
    const receviedVerficationCode = this.route.snapshot.queryParams.verificationCode;
    if (receviedVerficationCode) {
      this.caretingAccount.next(false);
      this.quickIntegrationForm.patchValue({
        verificationCode: receviedVerficationCode,
      });
    } else {
      this.RedirectedFromEmail = false;
      this.StartSetupQuickAccount();
    }
  }

  initForm() {
    this.quickIntegrationForm = this.fb.group(
      {
        verificationCode: ['', Validators.required],
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
      },
      {
        validators: MatchPassword(),
      }
    );
  }

  StartSetupQuickAccount() {
    // http://localhost:4200/auth/quick-integration?code=Ea6qu9DgT9wvQZK0_1uPcvBrUEvKExYLBGkrYJYFZP4.Uxotq5Z9mCJsG5Mt4H_bQ9gAHh_7FjgoqXtA2E_r7TY&scope=settings.read%20orders.read%20products.read%20webhooks.read_write%20offline_access&state=W02LGR2V7Nzd
    this.authCode = this.route.snapshot.queryParams.code;
    if (this.authCode) {
      const sub = this.stateBus
        .excuteAction(new AuthStateActions.SetupQuickAccount(this.authCode))
        .subscribe((res) => {
          this.email = res.email;
          this.caretingAccount.next(false);
        });

      this.subscription.push(sub);
    }
  }
  SetPassword() {
    let model: SetPasswordRequest = {
      password: this.f.password.value,
      passwordConfirmation: this.f.cPassword.value,
      verificationCode: this.f.verificationCode.value,
    };
    this.stateBus.excuteAction(new AuthStateActions.SetPassword(model));
  }
  resendEmail() {
    if (this.email) {
      this.stateBus.excuteAction(new AuthStateActions.ResendEmail(this.email));
    }
  }
  ngOnDestroy(): void {
    this.subscription.forEach((x) => x.unsubscribe());
  }
}
