import { ProductItem } from './../productItem.model';
export class GetWorkspaceItemsResponse {
  id: string;
  name: string;
  description: string;
  url: string;
  type: string;
  category: string;
  inCampaign: boolean;
  isIntegrated: boolean;
  product: ProductItem;
  totalViews: number;
  totalSales: number;
  totalPaiedCommissions: number;
  totalAppliedPromoters: number;
  totalCanceledPromoters: number;
  totalActivePromoters: number;
}
