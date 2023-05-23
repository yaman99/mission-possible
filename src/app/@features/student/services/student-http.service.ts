import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { GetAllInternshipApplicationFormResponse } from '../models/responses/getAllInternshipApplicationFormResponse';
import { Observable } from 'rxjs';
import { UpdateInternshipApplicationRequest } from '../models/requests/updateInternshipApplicationStatusRequest';
const Student_ENDPOINT = `${environment.studentApiUrl}`;
@Injectable({
  providedIn: 'root'
})
export class StudentHttpService {

  constructor(private http : HttpClient) { }
  //application Form
  getAllInternshipApplicationRequests(): Observable<GetAllInternshipApplicationFormResponse> {
    return this.http.get<GetAllInternshipApplicationFormResponse>(`${Student_ENDPOINT}/ getAllInternshipApplicationRequests/`);
  }
  updateInternshipApplicationRequest(payload: UpdateInternshipApplicationRequest): Observable<any> {
    return this.http.post<any>(`${Student_ENDPOINT}/updateInternshipApplicationRequest/`, payload);
  }
}
