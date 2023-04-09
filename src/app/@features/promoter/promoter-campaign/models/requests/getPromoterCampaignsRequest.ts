import { PagedQuery } from '@shared/models/pagination';

export class GetPromoterCampaignsRequest {
  promoterId: string;
  pagination: PagedQuery;
}
