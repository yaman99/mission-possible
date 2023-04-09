import { Affiliate } from '@shared/features/affiliate/models/affiliate.model';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { Observable } from 'rxjs';
import { GetCampaignAffiliatesRequest } from '../models/requests/getCampaignAffiliatesRequest';
import { PagedResult } from '@shared/models/pagination';


const CAMPAIGN_AGGREGATOR_ENDPOINT = `${environment.campaignAggregatorUrl}/campaign`;
@Injectable({
  providedIn: 'root',
})
export class AffiliateHttpService {
  constructor(private http: HttpClient) {}

  getAffiliates(model: GetCampaignAffiliatesRequest): Observable<PagedResult<Affiliate>> {
    return this.http.get<PagedResult<Affiliate>>(
      `${CAMPAIGN_AGGREGATOR_ENDPOINT}/GetCampaignAffiliates/${model.campaign}/${model.pagination.page}`);
  }

}
