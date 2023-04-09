import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { GetPromoterConversionsRequest } from '../models/Requests/getPromoterConversionsRequest';
import { getPromoterConversionsResponse } from '../models/Responses/getPromoterConversionsResponse';

const Conversion_URL = `${environment.conversionApiUrl}`;
@Injectable({
  providedIn: 'root',
})
export class PromoterConversionHttpService {
  constructor(private http: HttpClient) {}
  getConversions(model: GetPromoterConversionsRequest): Observable<getPromoterConversionsResponse> {
    return this.http.get<getPromoterConversionsResponse>(
      `${Conversion_URL}/GetPromoterConversions/${model.promoterId}/${model.pagination.page}/${model.pagination.result}/${model.pagination.orderBy}`
    );
  }
}
