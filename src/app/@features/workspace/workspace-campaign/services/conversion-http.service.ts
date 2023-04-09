import { PagedResult } from '@shared/models/pagination';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Observable } from 'rxjs';
import { ApproveConversionRequest } from '../models/requests/changeConversionStatusRequest';
import { GetCampaignConversionsRequest } from '../models/requests/getCampaignConversionsRequest';
import { Conversion } from '@shared/features/conversion/models/conversion.model';
import { Injectable } from '@angular/core';

const Conversion_ENDPOINT = `${environment.conversionApiUrl}`;
const CAMPAIGN_AGGREGATOR_ENDPOINT = `${environment.campaignAggregatorUrl}/campaign`;
@Injectable({
  providedIn: 'root',
})
export class ConversionHttpService {
  constructor(private http: HttpClient) {}

  getConversions(model: GetCampaignConversionsRequest): Observable<PagedResult<Conversion>> {
    return this.http.get<PagedResult<Conversion>>(
      `${CAMPAIGN_AGGREGATOR_ENDPOINT}/GetCampaignConversions/${model.campaign}/${model.pagination.page}`
    );
  }
  approve(model: ApproveConversionRequest): Observable<any> {
    return this.http.put(`${Conversion_ENDPOINT}/Approve`, model);
  }
  reject(conversionId: string): Observable<any> {
    return this.http.put(`${Conversion_ENDPOINT}/Reject`, { conversionId });
  }
}
