import { BehaviorSubject, Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AssignNewUserRequest } from '../models/requests/assignNewUsetRequest';
import { GetAllAssignedUsersResponse } from '../models/response/getAllAssignedUsersResponse';

const AUTH_ENDPOINT = `${environment.ApiUrl}/Admin`; // http://localhost:5001/auth/Users

@Injectable({
  providedIn: 'root',
})
export class UsersManagementHttpService {
  constructor(private http: HttpClient) {}

  getAllObsCareerCenter(): Observable<any> {
    return this.http.get<any>(`${AUTH_ENDPOINT}/GetAllObsCareerCenterUsers/`);
  }

  getAssignedUsers(): Observable<GetAllAssignedUsersResponse> {
    return this.http.get<GetAllAssignedUsersResponse>(`${AUTH_ENDPOINT}/get-assigned-users/`);
  }

  assignNewUser(model: AssignNewUserRequest): Observable<any> {
    return this.http.post<any>(`${AUTH_ENDPOINT}/assign-new-user/`, model);
  }

}
