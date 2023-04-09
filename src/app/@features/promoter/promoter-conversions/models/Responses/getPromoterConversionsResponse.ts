import { PagedQuery, PagedResult } from '@shared/models/pagination';
import { PromoterConversion } from '../promoterConversions';

export class getPromoterConversionsResponse {
  conversionsList: PagedResult<PromoterConversion>;
  totalPaid:number;
  totalRejected:number
  totalPending:number
}
