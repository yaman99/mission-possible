import { UpdateWorkspaceModel } from './../_models/updateWorkspace';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { Observable } from 'rxjs';
import { GetWorkspaceModel } from '../_models/getWorkspace';
import { CreateIntegrationRequest } from '../_models/requests/CreateIntegrationRequest';
import { CreateIntegrationResponse } from '../_models/response/CreateIntegrationResponse';

const WORKSPACE_ENDPOINT = `${environment.workspaceApiUrl}`;
const INTEGRATION_ENDPOINT = `${environment.integrationApiUrl}`;

@Injectable({
  providedIn: 'root'
})
export class WorkspaceHttpService {

  constructor(private http:HttpClient) {

  }

  getByOwner(workspaceId: string): Observable<GetWorkspaceModel> {
    return this.http.get<GetWorkspaceModel>(`${WORKSPACE_ENDPOINT}/GetWorkspaceByOwner/${workspaceId}`);
  }
  update(workspace: UpdateWorkspaceModel): Observable<any> {
    return this.http.post<any>(`${WORKSPACE_ENDPOINT}/UpdateWorkspace` , workspace);
  }
  updateLogo(logo: FormData): Observable<any> {
    return this.http.post<any>(`${WORKSPACE_ENDPOINT}/UpdateWorkspaceLogo` , logo);
  }
  createIntegration(request: CreateIntegrationRequest): Observable<any> {
    return this.http.post<any>(`${INTEGRATION_ENDPOINT}/SetupSallaIntegrationForRegisteredUsers/${request.authCode}/${request.workspaceId}` , null);
  }
}
