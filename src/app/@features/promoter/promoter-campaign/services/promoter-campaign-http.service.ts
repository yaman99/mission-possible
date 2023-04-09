import { BrowseCampaignFilter } from './../models/browse-campaign-filter.model';
import { PagedResult } from '@shared/models/pagination';
import { BrowseCampaignsRequest } from './../models/requests/browseCampaignsRequest';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { BrowseCampaignsResponse } from '../models/response/browseCampaignsResponse';
import { Observable } from 'rxjs';
import { GetPromoterCampaignsRequest } from '../models/requests/getPromoterCampaignsRequest';
import { ApplyOnCampaignRequest } from '../models/requests/applyOnCampaignRequest';
import { CancelCampaignApplicationRequest } from '../models/requests/cancelCampaignApplicationRequest';
import { GetCampaignDetailsResponse } from '../models/response/getCampaignDetailsResponse';
import { GetPromoterCampaignsResponse } from '../models/response/getPromoterCampaignsResponse';
import { GetPromoterCampaignOverviewRequest } from '../models/requests/getPromoterCampaignOverviewRequest';
import { getPromoterCampaignOverviewResponse } from '../models/response/getPromoterCampaignOverviewResponse';
import { CheckIfPromoterAppliedRequest } from '../models/requests/checkIfPromoterAppliedRequest';

const AFFILIATE_ENDPOINT = `${environment.affiliateApiUrl}`;
const PROMOTER_CAMPAIGN_AGGREGATOR_ENDPOINT = `${environment.campaignAggregatorUrl}/promoter`;
@Injectable({
  providedIn: 'root',
})
export class PromoterCampaignHttpService {
  constructor(private http: HttpClient) {}
  browseCampaigns(model: BrowseCampaignsRequest): Observable<PagedResult<BrowseCampaignsResponse>> {
    let query = this.generateStringParams(model.filter);
    let pagination = `${model.pagination.page}/${model.pagination.result}/${model.pagination.orderBy}`;
    return this.http.get<PagedResult<BrowseCampaignsResponse>>(`${PROMOTER_CAMPAIGN_AGGREGATOR_ENDPOINT}/BrowseCampaigns/${pagination}?${query}`);
  }
  getCampaignDetails(campaignId: string): Observable<GetCampaignDetailsResponse> {
    return this.http.get<GetCampaignDetailsResponse>(`${PROMOTER_CAMPAIGN_AGGREGATOR_ENDPOINT}/GetCampaignDetails/${campaignId}`);
  }
  getPromoterCampaigns(model: GetPromoterCampaignsRequest): Observable<PagedResult<GetPromoterCampaignsResponse>> {
    return this.http.get<PagedResult<GetPromoterCampaignsResponse>>(
      `${PROMOTER_CAMPAIGN_AGGREGATOR_ENDPOINT}/GetPromoterCampaigns/${model.promoterId}/${model.pagination.page}/${model.pagination.result}/${model.pagination.orderBy}`
    );
  }
  getCampaignOverview(model: GetPromoterCampaignOverviewRequest): Observable<getPromoterCampaignOverviewResponse> {
    return this.http.get<getPromoterCampaignOverviewResponse>(
      `${PROMOTER_CAMPAIGN_AGGREGATOR_ENDPOINT}/GetPromoterCampaignOverview/${model.campaignId}/${model.promoterId}`
    );
  }
  ApplyOnCampaign(model: ApplyOnCampaignRequest): Observable<any> {
    return this.http.post(`${AFFILIATE_ENDPOINT}/Apply`, model);
  }
  checkIfApplied(model: CheckIfPromoterAppliedRequest): Observable<boolean> {
    return this.http.post<boolean>(`${AFFILIATE_ENDPOINT}/CheckIfApplied`, model);
  }
  CancelCampaignApplication(model: CancelCampaignApplicationRequest): Observable<any> {
    return this.http.put(`${AFFILIATE_ENDPOINT}/Cancel`, model);
  }

  private generateStringParams(filter: BrowseCampaignFilter) {
    let parts = [];
    if (filter.categories.length > 0) {
      let categories = filter.categories.join(',');
      const query = `categories=${categories}`;
      parts.push(query);
    }
    if (filter.commissionType.length > 0) {
      let commission = filter.commissionType.join(',');
      const query = `commission=${commission}`;
      parts.push(query);
    }
    return parts.join('&');
  }
}
