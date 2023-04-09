import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { AddNewItemRequest } from '../models/requests/addNewItemRequest';
import { UpdateItemRequest } from '../models/requests/updateItemRequest';
import { GetWorkspaceItemsRequest } from '../models/requests/getWorkspaceItemsRequest';
import { GetWorkspaceItemsResponse } from '../models/responses/getWorkspaceItemsResponse';
import { PagedResult } from '@shared/models/pagination';

const ITEM_ENDPOINT = `${environment.itemApiUrl}`;
@Injectable({
  providedIn: 'root',
})
export class WorkspaceItemHttpService {
  constructor(private http: HttpClient) {}

  addItem(item: AddNewItemRequest): Observable<any> {
    return this.http.post(`${ITEM_ENDPOINT}/AddNewItem`, item);
  }
  updateItem(item: UpdateItemRequest): Observable<any> {
    return this.http.put(`${ITEM_ENDPOINT}/UpdateItem`, item);
  }
  deleteItem(itemId: string): Observable<any> {
    return this.http.delete(`${ITEM_ENDPOINT}/DeleteItem/${itemId}`);
  }
  getItems(model: GetWorkspaceItemsRequest): Observable<PagedResult<GetWorkspaceItemsResponse>> {
    return this.http.get<PagedResult<GetWorkspaceItemsResponse>>(
      `${ITEM_ENDPOINT}/GetWorkspaceItems/${model.workspaceId}/${model.pagination.page}/${model.pagination.result}/${model.pagination.orderBy}`
    );
  }
  syncSallaProducts(workspaceId: string): Observable<PagedResult<GetWorkspaceItemsResponse>> {
    return this.http.post<PagedResult<GetWorkspaceItemsResponse>>(
      `${ITEM_ENDPOINT}/SallaItems/SyncProducts/${workspaceId}`,
      null
    );
  }
}
