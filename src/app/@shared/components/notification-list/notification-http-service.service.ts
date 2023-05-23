import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { GetAllNotificationsResponse } from './models/responses/getAllNotificationsResponse';
import { CreateNotification } from './models/requests/createNotification';
import { Observable } from 'rxjs';
const Notification_ENDPOINT = `${environment.notificationApiUrl}`;
@Injectable({
  providedIn: 'root'
})
export class NotificationHttpServiceService {

  constructor(private http:HttpClient) { }
  getAllNotificationsRequests(): Observable<GetAllNotificationsResponse> {
    return this.http.get<GetAllNotificationsResponse>(`${Notification_ENDPOINT}/getAllNotifications/`);
  }
  createNotification(payload: CreateNotification): Observable<any> {
    return this.http.post<any>(`${Notification_ENDPOINT}/createNotification/`, payload);
  }
}
