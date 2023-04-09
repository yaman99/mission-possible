import { Promoter } from './../_models/promoter.model';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { UpdatePromoterRequest } from '../_models/requests/updatePromoterLocationRequest';
import { UpdatePromoterTargetCategoriesRequest } from '../_models/requests/updatePromoterTargetCategoriesRequest';
import { UpdatePromoterTargetCountriesRequest } from '../_models/requests/updatePromoterTargetCountriesRequest';
import { environment } from 'src/environments/environment';
const PROMOTER_ENDPOINT = `${environment.promoterApiUrl}`;
@Injectable({
  providedIn: 'root',
})
export class PromoterHttpService {
  constructor(private http: HttpClient) {}

  getPromoter(promoterId: string): Observable<Promoter> {
    return this.http.get<Promoter>(`${PROMOTER_ENDPOINT}/GetPromoter/${promoterId}`);
  }

  update(model: UpdatePromoterRequest): Observable<any> {
    return this.http.put(`${PROMOTER_ENDPOINT}/Update`, model);
  }
  updateTargetCategories(model: UpdatePromoterTargetCategoriesRequest): Observable<any> {
    return this.http.put(`${PROMOTER_ENDPOINT}/UpdateTargetCategories`, model);
  }
  updateTargetCountries(model: UpdatePromoterTargetCountriesRequest): Observable<any> {
    return this.http.put(`${PROMOTER_ENDPOINT}/UpdateTargetCountries`, model);
  }
}
