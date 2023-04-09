import { PagedQuery } from '@shared/models/pagination';

export class GetWorkspaceCampaignsRequest {
  workspace: string;
  pagination: PagedQuery;
}
