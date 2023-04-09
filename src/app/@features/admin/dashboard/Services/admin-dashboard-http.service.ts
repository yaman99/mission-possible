import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { AdminDashboardInsights } from '../models/adminDashboardInsights';
const INSIGHTS_ENDPOINT = `${environment.insightsApiUrl}`;
@Injectable({
  providedIn: 'root',
})
export class AdminDashboardHttpService {
  constructor(private http: HttpClient) {}
  getDashboardInsights(): Observable<any> {
    return this.http.get<any>(`${INSIGHTS_ENDPOINT}/GetAdminDashboardInsights/`);
  }
}
