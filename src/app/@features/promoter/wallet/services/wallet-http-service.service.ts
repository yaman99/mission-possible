import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { PagedResult } from '@shared/models/pagination';
import { Observable } from 'rxjs';
import { GetPromoterPaymentHistoryRequest } from '../models/getPromoterPaymentHistoryRequest';
import { GetPromoterPaymentHistoryResponse } from '../models/getPromoterPaymentHistoryResponse';
const Wallet_ENDPOINT = `${environment.WalletApiUrl}/promoter`;
@Injectable({
  providedIn: 'root',
})
export class PromoterWalletHttpService {
  constructor(private http: HttpClient) {}
  getProfit(promoterId: string): Observable<string> {
    return this.http.get<string>(`${Wallet_ENDPOINT}/GetProfit/${promoterId}`);
  }
  getPaymentHistory(model: GetPromoterPaymentHistoryRequest): Observable<PagedResult<GetPromoterPaymentHistoryResponse>> {
    let pagination = `${model.pagination.page}/${model.pagination.result}`;
    return this.http.get<PagedResult<GetPromoterPaymentHistoryResponse>>(`${Wallet_ENDPOINT}/GetPaymentHistory/${model.promoterId}/${pagination}`);
  }
}
