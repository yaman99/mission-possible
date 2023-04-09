import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { Observable } from 'rxjs';
import { GetWorkspacePaymentHistoryResponse } from '../models/getWorkspacePaymentHistoryResponse';
import { PagedResult } from '@shared/models/pagination';
import { GetWorkspaceWalletResponse } from '../models/getWorkspaceWalletResponse';
import { GetWorkspacePaymentHistoryRequest } from '../models/getWorkspacePaymentHistoryRequest';
const Wallet_ENDPOINT = `${environment.WalletApiUrl}/workspace`;

@Injectable({
  providedIn: 'root',
})
export class WorkspaceWalletHttpService {
  constructor(private http: HttpClient) {}
  getBalance(workspaceId: string): Observable<GetWorkspaceWalletResponse> {
    return this.http.get<GetWorkspaceWalletResponse>(`${Wallet_ENDPOINT}/GetBalance/${workspaceId}`);
  }

  getPaymentHistory(
    model: GetWorkspacePaymentHistoryRequest
  ): Observable<PagedResult<GetWorkspacePaymentHistoryResponse>> {
    let pagination = `${model.pagination.page}/${model.pagination.result}`;
    return this.http.get<PagedResult<GetWorkspacePaymentHistoryResponse>>(
      `${Wallet_ENDPOINT}/GetPaymentHistory/${model.workspaceId}/${pagination}`
    );
  }
}
