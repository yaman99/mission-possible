import { User } from './../../models/user';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from '../../../../../environments/environment';
import { AuthModel } from '../../models/auth.model';
import { ChangePasswordModel } from '../../models/changePassword.model';
import { SignUpModel } from '../../models/signUp.model';
import { UpdatePhoneModel } from '@features/auth/models/updateUser.model';
import { UpdateEmailModel } from '@features/auth/models/updateEmail.model';
import { SetPasswordRequest } from '@features/auth/models/SetPasswordRequest';

const API_AUTH_URL = `${environment.authApiUrl}/Identity`;
const API_INTEGRATION_URL = `${environment.integrationApiUrl}`;

@Injectable({
  providedIn: 'root',
})
export class AuthHTTPService {
  constructor(private http: HttpClient) {}

  // public methods
  login(email: string, password: string): Observable<AuthModel> {
    return this.http.post<AuthModel>(`${API_AUTH_URL}/sign-in`, {
      email,
      password,
    });
  }
  signUp(model: SignUpModel): Observable<any> {
    return this.http.post<any>(`${API_AUTH_URL}/sign-up`, model);
  }
  logout(): Observable<any> {
    return this.http.post<any>(`${API_AUTH_URL}/sign-out`, null);
  }

  forgotPassword(email: string): Observable<boolean> {
    return this.http.post<boolean>(`${API_AUTH_URL}/forgot-password`, {
      email,
    });
  }
  changePassword(payload: ChangePasswordModel): Observable<any> {
    return this.http.post<any>(`${API_AUTH_URL}/change-password`, payload);
  }

  refreshToken(refreshToken: string): Observable<any> {
    return this.http.post<any>(`${API_AUTH_URL}/refresh-token/${refreshToken}`, null);
  }
  updateUser(model: UpdatePhoneModel): Observable<any> {
    return this.http.post<any>(`${API_AUTH_URL}/UpdateUser`, model);
  }
  updateEmail(model: UpdateEmailModel): Observable<any> {
    return this.http.post<any>(`${API_AUTH_URL}/UpdateEmail`, model);
  }
  setupQuickAccount(authCode: string): Observable<any> {
    return this.http.post<any>(`${API_INTEGRATION_URL}/SetupSallaIntegrationForNewUsers/${authCode}`, null);
  }
  setPassword(model: SetPasswordRequest): Observable<any> {
    return this.http.post<any>(`${API_AUTH_URL}/SetPasswrod/`, model);
  }
  resendEmail(email: string): Observable<any> {
    return this.http.post<any>(`${API_AUTH_URL}/ResendEmail/`, { email: email });
  }

  getUserByToken(): Observable<User> {
    return this.http.get<User>(`${API_AUTH_URL}/GetUser`);
  }
}
