export class AuthModel {
  accessToken: string | null;
  refreshToken: string| null;
  expires: Date| null;
  claims:any[]

  setAuth(auth: AuthModel) {
    this.accessToken = auth.accessToken;
    this.refreshToken = auth.refreshToken;
    this.expires = auth.expires;
  }
}
