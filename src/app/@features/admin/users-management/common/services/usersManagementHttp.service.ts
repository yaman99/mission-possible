import { BehaviorSubject, Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AssignNewUserRequest } from '../models/requests/assignNewUsetRequest';

const AUTH_ENDPOINT = `${environment.authApiUrl}/Users`; // http://localhost:5001/auth/Users

@Injectable({
  providedIn: 'root',
})
export class UsersManagementHttpService {
  insertedUsers: BehaviorSubject<any> = new BehaviorSubject<any>([]);
  constructor(private http: HttpClient) {}

  getAllObsCareerCenter(): Observable<any> {
    return this.http.get<any>(`${AUTH_ENDPOINT}/GetAllObsCareerCenterUsers/`);
  }

  assignNewUser(model: AssignNewUserRequest): Observable<any> {
    return this.http.post<any>(`${AUTH_ENDPOINT}/AssignNewUser/`, model);
  }

  AddNewUser(payload: any) {
    this.insertedUsers.next([payload]);
  }
}
