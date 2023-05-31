import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { DeleteAnnouncementRequest } from '@features/career-center/models/requests/deleteAnnouncementRequest';
import { AddNewAnnouncementRequest } from '@shared/models/announcements/requests/addNewAnnouncementRequest';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
const API_URL = `${environment.ApiUrl}/Notification`;
@Injectable({
  providedIn: 'root',
})
export class NotificationManagementService {
  constructor(private http: HttpClient) {}
  getAllNotifications(type: string): Observable<any> {
    return this.http.get<any>(`${API_URL}/get-notifications/${type}`);
  }
}
