import { AuthModel } from '../models/auth.model';
import { ChangePasswordModel } from '../models/changePassword.model';
import { SetPasswordRequest } from '../models/SetPasswordRequest';
import { SignUpModel } from '../models/signUp.model';
import { UpdateEmailModel } from '../models/updateEmail.model';
import { UpdatePhoneModel } from '../models/updateUser.model';

export namespace AuthStateActions {
  export class Login {
    static readonly type = '[Auth] Login';
    constructor(public payload: { email: string; password: string }) {}
  }

  export class Logout {
    static readonly type = '[Auth] Logout';
  }

  export class GetUser {
    static type = '[Auth] Get User';
  }
  export class LogoutSuccess {
    static type = '[Auth] LogoutSuccess';
  }
  export class LoginSuccess {
    static type = '[Auth] LoginSuccess';
    constructor(public result: AuthModel) {}
  }
  export class LoginRedirect {
    static type = '[Auth] LoginRedirect';
  }
  export class LogoutRedirect {
    static type = '[Auth] LogoutRedirect';
    constructor() {}
  }
  export class LoginFailed {
    static type = '[Auth] LoginFailed';
    constructor(public error: any) {}
  }
  export class RefreshToken {
    static type = '[Auth] RefreshToken';
  }

  export class ChangePassword {
    static type = '[Auth] Change Password';
    constructor(public payload: ChangePasswordModel) {}
  }

  export class SignUp {
    static type = '[Auth] Sign Up';
    constructor(public payload: SignUpModel) {}
  }
  export class UpdateUser {
    static type = '[Auth] Update User';
    constructor(public payload: UpdatePhoneModel) {}
  }
  export class UpdateEmail {
    static type = '[Auth] Update User Email';
    constructor(public payload: UpdateEmailModel) {}
  }

  export class SetupQuickAccount {
    static type = '[Auth] Setup Quick Account';
    constructor(public authCode: string) {}
  }

  export class SetPassword {
    static type = '[Auth] Set Password';
    constructor(public payload: SetPasswordRequest) {}
  }
  export class ResendEmail {
    static type = '[Auth] Resend Email';
    constructor(public email: string) {}
  }
}
