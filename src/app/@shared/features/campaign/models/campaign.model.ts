import { Overview } from '@shared/features/campaign/models/overview';
import { CampaignCommission } from './campaignCommission';

export class Campaign {
  id: string;
  name: string;
  status: number;
  isApplicable: boolean;
  type: string;
  createdDate: string;
  description: string;
  coupon: string;
  targetCountries: string[];
  targetCategories: string[];
  commission: CampaignCommission;
  overview?: Overview;
  item: string;
  productName?: string;
  productUrl?: string;
  productStore?: string;
  productPrice?: string;
}
