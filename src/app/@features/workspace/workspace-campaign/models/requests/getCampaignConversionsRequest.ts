import { PagedQuery } from '@shared/models/pagination';

export class GetCampaignConversionsRequest {
  campaign: string;
  pagination: PagedQuery;
}
