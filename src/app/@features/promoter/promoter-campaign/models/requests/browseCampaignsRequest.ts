import { PagedQuery } from '@shared/models/pagination';
import { BrowseCampaignFilter } from '../browse-campaign-filter.model';

export class BrowseCampaignsRequest {
  filter: BrowseCampaignFilter;
  pagination: PagedQuery;
}
