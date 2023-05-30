import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { UpdateApplicationStatusRequest } from '../../../@shared/models/requests/updateApplicationStatusRequest';
import { GetAllApplicationRequestResponse } from '../models/responses/getAllApplicationRequestResponse';
import { GetAllOfficialLetterRequestResponse } from '../models/responses/getAllOfficialLetterRequestResponse';
import { UpdateOfficialLetterStatusRequest } from '../models/requests/updateOfficialLetterStatusRequest';

const Coordinator_ENDPOINT = `${environment.coordinatorApiUrl}`;
@Injectable({
  providedIn: 'root'
})
export class CoordinatorHttpService {

  constructor(private http: HttpClient) { }
  //application forms request service
  getAllApplicationRequests(): Observable<GetAllApplicationRequestResponse> {
    return this.http.get<GetAllApplicationRequestResponse>(`${Coordinator_ENDPOINT}/getAllApplicationRequests/`);
  }
  updateApplicationRequestStatus(payload: UpdateApplicationStatusRequest): Observable<any> {
    return this.http.post<any>(`${Coordinator_ENDPOINT}/updateApplicationRequestStatus/`, payload);
  }
  //official letter requests services
  getAllOfficialLetterRequests(): Observable<GetAllOfficialLetterRequestResponse> {
    return this.http.get<GetAllOfficialLetterRequestResponse>(`${Coordinator_ENDPOINT}/getAllOfficialLetterRequests/`);

  }
  updateOfficialLetterRequestStatus(payload: UpdateOfficialLetterStatusRequest): Observable<any> {
    return this.http.post<any>(`${Coordinator_ENDPOINT}/updateOfficialLetterRequestStatus/`, payload);
  }
}
