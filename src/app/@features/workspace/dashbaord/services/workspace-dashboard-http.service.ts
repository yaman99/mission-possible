import { environment } from 'src/environments/environment';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { DashboardViewModel } from '../models/dashboardView';
const Workspace_Dshboard_view = `${environment.workspaceApiUrl}`;
@Injectable({
  providedIn: 'root',
})
export class WorkspaceDashboardHttpService {
  constructor(private http: HttpClient) {}
  getDashboard(workspaceId: string): Observable<DashboardViewModel> {
    return this.http.get<DashboardViewModel>(`${Workspace_Dshboard_view}/GetWorkspaceDashboardView/${workspaceId}`);
  }
}
