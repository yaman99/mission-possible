import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { GetAllSgkRequestResponse } from '../models/responses/getAllSgkRequestResponse';
import { Observable } from 'rxjs';
import { UpdateSgkStatusRequest } from '../models/requests/updateSgkStatusRequest';
import { GetAllAnnouncementResponse } from '../models/responses/getAllAnnouncementResponse';
import { DeleteAnnouncementRequest } from '../models/requests/deleteAnnouncementRequest';
const careerCenter_ENDPOINT = `${environment.careerCenterApiUrl}`;
@Injectable({
  providedIn: 'root'
})
export class CareerCenterHttpService {

  constructor(private http: HttpClient) { }

  //sgk Request management
  getAllInternshipApplicationRequests(): Observable<GetAllSgkRequestResponse> {
    return this.http.get<GetAllSgkRequestResponse>(
      `${careerCenter_ENDPOINT}/ getAllInternshipApplicationRequests/`
    );
  }
  updateSgkStatusRequest(payload: UpdateSgkStatusRequest): Observable<any> {
    return this.http.post<any>(`${careerCenter_ENDPOINT}/updateSgkStatusRequest/`, payload);
  }

  //announcement list
  getAllAnnouncementRequests(): Observable<GetAllAnnouncementResponse> {
    return this.http.get<GetAllAnnouncementResponse>(
      `${careerCenter_ENDPOINT}/ getAllAnnouncementRequests/`
    );
  }
  //delete announcement

  deleteAnnouncementRequest(payload: DeleteAnnouncementRequest): Observable<any> {
    return this.http.post<any>(`${careerCenter_ENDPOINT}/deleteAnnouncementRequest/`, payload);

  }
}
