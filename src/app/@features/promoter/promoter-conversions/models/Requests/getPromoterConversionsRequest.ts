import { PagedQuery } from '@shared/models/pagination';

export class GetPromoterConversionsRequest {
  promoterId: string;
  pagination: PagedQuery;
}
