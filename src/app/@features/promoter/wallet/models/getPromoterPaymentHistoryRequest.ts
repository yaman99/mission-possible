import { PagedQuery } from "@shared/models/pagination";

export class GetPromoterPaymentHistoryRequest{
  promoterId: string;
  pagination: PagedQuery;
}
