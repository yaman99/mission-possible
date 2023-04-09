export class PromoterCampaign {
  id: string; //
  name?: string; //
  description?: string;
  itemName?: string; //
  itemUrl?: string;
  store?: string;
  commissionType?: string; //
  commissionValue?: number; //
  targetCategories?: string[];
  targetCountries?: string[];;
  price?: number;
  totalCommissions?: number;
  totalViews?: number;
  status?:number;
}
