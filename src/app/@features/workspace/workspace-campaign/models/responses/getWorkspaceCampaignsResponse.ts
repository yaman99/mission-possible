import { CampaignCommission } from "@shared/features/campaign/models/campaignCommission";

export class GetWorkspaceCampaignsResponse {
  id: string;
  name: string;
  item: string;
  status: number;
  isApplicable: boolean;
  type: string;
  createdDate: string;
  description: string;
  coupon: string;
  targetCountries: string[];
  targetCategories: string[];
  commission: CampaignCommission;
}

