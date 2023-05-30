import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { DeleteAnnouncementRequest } from '@features/career-center/models/requests/deleteAnnouncementRequest';
import { AddNewAnnouncementRequest } from '@shared/models/announcements/requests/addNewAnnouncementRequest';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
const API_URL = `${environment.ApiUrl}/Announcement`;
@Injectable({
  providedIn: 'root',
})
export class AnnouncementManagementService {
  constructor(private http: HttpClient) {}

  addNewAnnouncement(payload: AddNewAnnouncementRequest): Observable<any> {
    return this.http.post<any>(`${API_URL}/add-announcement`, payload);
  }
  deleteAnnouncement(payload: DeleteAnnouncementRequest): Observable<any> {
    return this.http.post<any>(`${API_URL}/delete-announcement`, payload);
  }
  getAllAnnouncements(): Observable<any> {
    return this.http.get<any>(`${API_URL}/get-all-announcements`);
  }
}
