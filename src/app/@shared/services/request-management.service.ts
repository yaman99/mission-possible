import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { Observable } from 'rxjs';
import { UpdateInternshipApplicationRequest } from '../models/requests/updateInternshipApplicationStatusRequest';
import { DeleteInternshipApplicationRequest as DeleteRequest } from '../models/requests/deleteInternshipApplicationRequest';
import { UpdateOfficialLetterRequest } from '../models/requests/updateOfficialLetterRequest';
import { DeleteOfficialLetterRequest } from '../models/requests/deleteOfficialLetterRequest';
import { GetAllInternshipApplicationFormResponse } from '@shared/models/responses/getAllInternshipApplicationFormResponse';
import { GetAllOfficialLetterResponse } from '@shared/models/responses/getAllOfficialLetterResponse';
import { UpdateApplicationStatusRequest } from '@shared/models/requests/updateApplicationStatusRequest';
const API_URL = `${environment.ApiUrl}`;
@Injectable({
  providedIn: 'root',
})
export class RequestManagementHttpService {
  constructor(private http: HttpClient) {}
  //application Form
  getAllStudentRequests(requestType: string): Observable<any> {
    return this.http.get<any>(
      `${API_URL}/ApplicationFormRequest/get-student-requests/${requestType}`
    );
  }
  getAllRequests(requestType: string, status: string = 'any'): Observable<any> {
    return this.http.get<any>(
      `${API_URL}/ApplicationFormRequest/get-requests/${requestType}/${status}`
    );
  }

  // updateInternshipApplicationRequest(payload: UpdateInternshipApplicationRequest): Observable<any> {
  //   return this.http.post<any>(`${API_URL}/ApplicationFormRequest/`, payload);
  // }
  updateRequestStatus(payload: UpdateApplicationStatusRequest): Observable<any> {
    return this.http.post<any>(`${API_URL}/ApplicationFormRequest/update-request`, payload);
  }
  uploadOfficialLetter(payload: FormData): Observable<any> {
    return this.http.post<any>(`${API_URL}/ApplicationFormRequest/upload-official-letter`, payload);
  }
  deleteInternshipApplicationRequest(payload: DeleteRequest): Observable<any> {
    return this.http.post<any>(`${API_URL}/ApplicationFormRequest/delete-request`, payload);
  }
  addNewApplicationRequest(payload: any): Observable<any> {
    return this.http.post<any>(`${API_URL}/ApplicationFormRequest/addRequest`, payload);
  }
  addOfficialRequest(payload: any): Observable<any> {
    return this.http.post<any>(`${API_URL}/ApplicationFormRequest/addOfficialRequest`, payload);
  }
}
