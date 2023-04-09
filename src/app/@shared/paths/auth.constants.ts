export const AuthBasePath = 'auth';
export const AuthActions = {
  Login: 'login',
  ForgetPassword: 'forget-password'
};

let authPaths: IAuthPaths = {
  DefaultLoginRedirectPath: '/',
  Login: `${AuthActions.Login}`,
  ForgetPassword: `${AuthActions.ForgetPassword}`,
  LoginPathComponents: [],
  ForgetPasswordPathComponents: [],
  WorkspaceLoginRedirectPathComponents: [],
  PromoterLoginRedirectPathComponents:[],
  AdminLoginRedirectPathComponents:[]
};

authPaths = {
  ...authPaths,
  LoginPathComponents: [AuthBasePath, authPaths.Login],
  ForgetPasswordPathComponents: [AuthBasePath, authPaths.ForgetPassword],
  WorkspaceLoginRedirectPathComponents : ['/w/dashboard'],
  PromoterLoginRedirectPathComponents:['/p/dashboard'],
  AdminLoginRedirectPathComponents:['/a/dashboard'],
};

interface IAuthPaths {
  readonly DefaultLoginRedirectPath: string;
  readonly Login: string;
  readonly ForgetPassword: string;

  readonly WorkspaceLoginRedirectPathComponents: string[];
  readonly PromoterLoginRedirectPathComponents: string[];
  readonly AdminLoginRedirectPathComponents: string[];
  readonly LoginPathComponents: string[];
  readonly ForgetPasswordPathComponents: string[];
}
export const AuthPaths: IAuthPaths = authPaths;
