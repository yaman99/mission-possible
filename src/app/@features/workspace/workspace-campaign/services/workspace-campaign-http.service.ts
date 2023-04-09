import { changeApplicationStatusRequest } from './../models/requests/changeApplicationStatusRequest';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { PagedResult } from '@shared/models/pagination';
import { Observable } from 'rxjs';
import { AddNewCampaignRequest } from '../models/requests/addNewCampaignRequest';
import { ChangeCampaignStatusRequest } from '../models/requests/changeCampaignStatusRequest';
import { GetWorkspaceCampaignsRequest } from '../models/requests/getWorkspaceCampaignsRequest';
import { UpdateCampaignRequest } from '../models/requests/updateCampaignRequest';
import { GetWorkspaceCampaignsResponse } from '../models/responses/getWorkspaceCampaignsResponse';
import { GetCampaignOverviewResponse } from '../models/responses/getCampaignOverviewResponse';
const CAMPAIGN_ENDPOINT = `${environment.campaignApiUrl}`;
const CAMPAIGN_AGGREGATOR_ENDPOINT = `${environment.campaignAggregatorUrl}/campaign`;
@Injectable({
  providedIn: 'root',
})
export class WorkspaceCampaignHttpService {
  constructor(private http: HttpClient) {}

  createCampaign(campaign: AddNewCampaignRequest): Observable<any> {
    return this.http.post(`${CAMPAIGN_ENDPOINT}/AddNew`, campaign);
  }
  updateCampaign(campaign: UpdateCampaignRequest): Observable<any> {
    return this.http.put(`${CAMPAIGN_ENDPOINT}/Update`, campaign);
  }
  deleteCampaign(campaignId: string): Observable<any> {
    return this.http.delete(`${CAMPAIGN_ENDPOINT}/Delete/${campaignId}`);
  }
  changeStatus(model: ChangeCampaignStatusRequest): Observable<any> {
    return this.http.put(`${CAMPAIGN_ENDPOINT}/ChangeStatus`, model);
  }
  ChangeApplicationStatus(model: changeApplicationStatusRequest): Observable<any> {
    return this.http.put(`${CAMPAIGN_ENDPOINT}/ChangeApplicationStatus`, model);
  }
  getCampaigns(model: GetWorkspaceCampaignsRequest): Observable<PagedResult<GetWorkspaceCampaignsResponse>> {
    return this.http.get<PagedResult<GetWorkspaceCampaignsResponse>>(
      `${CAMPAIGN_ENDPOINT}/GetWorkspaceCampaigns/${model.workspace}/${model.pagination.page}/${model.pagination.result}/${model.pagination.orderBy}`
    );
  }
  getCampaignOverview(cmpaignId: string, itemId: string): Observable<GetCampaignOverviewResponse> {
    return this.http.get<GetCampaignOverviewResponse>(`${CAMPAIGN_AGGREGATOR_ENDPOINT}/GetCampaignOverview/${cmpaignId}/${itemId}`);
  }
}
