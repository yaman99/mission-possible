import { BehaviorSubject, Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { PagedQuery, PagedResult } from '@shared/models/pagination';
import { GetAllUsersResponse } from '../models/response/getAllUsersResponse';
import { UserTypes } from '@shared/constants';
import { GetAllUsersRequest } from '../models/requests/getAllUsersRequest';
import { UpdateUserRequest } from '../models/requests/updateUserRequest';
import { AddNewAdminRequest } from '../models/requests/addNewAdminRequest';

const AUTH_ENDPOINT = `${environment.authApiUrl}/Admin`;

@Injectable({
  providedIn: 'root',
})
export class UsersManagementHttpService {
  insertedUsers : BehaviorSubject<any> = new BehaviorSubject<any>([]);
  constructor(private http: HttpClient) {}

  getAllUsers(model: GetAllUsersRequest): Observable<PagedResult<GetAllUsersResponse>> {
    return this.http.get<PagedResult<GetAllUsersResponse>>(
      `${AUTH_ENDPOINT}/GetAllUsers/${model.type}/${model.pagination.page}/${model.pagination.result}/${model.pagination.orderBy}`
    );
  }
  updateUser(model: UpdateUserRequest): Observable<any> {
    return this.http.post<any>(`${AUTH_ENDPOINT}/update-user`, model);
  }
  deleteUser(userId: string): Observable<any> {
    return this.http.post<any>(`${AUTH_ENDPOINT}/delete-user/${userId}`, null);
  }
  addNewAdmin(payload: AddNewAdminRequest): Observable<any> {
    return this.http.post<any>(`${AUTH_ENDPOINT}/add-admin`, payload);
  }


  AddNewUser(payload:any){
    this.insertedUsers.next([payload]);
  }

}
