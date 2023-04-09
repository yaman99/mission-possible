import { PagedQuery } from "@shared/models/pagination";

export class GetCampaignAffiliatesRequest{
  campaign: string;
  pagination: PagedQuery;
}
