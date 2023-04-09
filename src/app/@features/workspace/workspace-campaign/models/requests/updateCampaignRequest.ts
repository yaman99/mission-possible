export class UpdateCampaignRequest {
  campaignId: string;
  name: string;
  description: string;
  coupon: string;
  targetCountries: string[];
  targetCategories: string[];
}
