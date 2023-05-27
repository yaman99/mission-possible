import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { GetAllInternshipApplicationFormResponse } from '../models/responses/getAllInternshipApplicationFormResponse';
import { Observable } from 'rxjs';
import { UpdateInternshipApplicationRequest } from '../models/requests/updateInternshipApplicationStatusRequest';
import { DeleteInternshipApplicationRequest } from '../models/requests/deleteInternshipApplicationRequest';
import { GetAllOfficialLetterResponse } from '../models/responses/getAllOfficialLetterResponse';
import { UpdateOfficialLetterRequest } from '../models/requests/updateOfficialLetterRequest';
import { DeleteOfficialLetterRequest } from '../models/requests/deleteOfficialLetterRequest';
const Student_ENDPOINT = `${environment.studentApiUrl}`;
@Injectable({
  providedIn: 'root',
})
export class StudentHttpService {
  constructor(private http: HttpClient) {}
  //application Form
  getAllInternshipApplicationRequests(): Observable<GetAllInternshipApplicationFormResponse> {
    return this.http.get<GetAllInternshipApplicationFormResponse>(
      `${Student_ENDPOINT}/ getAllInternshipApplicationRequests/`
    );
  }
  updateInternshipApplicationRequest(payload: UpdateInternshipApplicationRequest): Observable<any> {
    return this.http.post<any>(`${Student_ENDPOINT}/updateInternshipApplicationRequest/`, payload);
  }
  deleteInternshipApplicationRequest(payload: DeleteInternshipApplicationRequest): Observable<any> {
    return this.http.delete<any>(`${Student_ENDPOINT}/deleteInternshipApplicationRequest/`);
  }

  // official letter request
  getAllOfficialLetterRequests(): Observable<GetAllOfficialLetterResponse> {
    return this.http.get<GetAllOfficialLetterResponse>(
      `${Student_ENDPOINT}/getAllOfficialLetterRequests/`
    );
  }
  updateOfficialLetterRequests(payload: UpdateOfficialLetterRequest): Observable<any> {
    return this.http.post<any>(`${Student_ENDPOINT}/updateOfficialLetterRequests/`, payload);
  }

  deleteOfficialLetterRequest(payload: DeleteOfficialLetterRequest): Observable<any> {
    return this.http.delete<any>(`${Student_ENDPOINT}/deleteOfficialLetterRequest/`);
  }
}
