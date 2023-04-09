export class AddNewCampaignRequest {
  workspace: string;
  name: string;
  description: string;
  item: string;
  coupon: string;
  targetCountries: string[];
  targetCategories: string[];
  commissionType: string;
  commissionValue: number;
}
