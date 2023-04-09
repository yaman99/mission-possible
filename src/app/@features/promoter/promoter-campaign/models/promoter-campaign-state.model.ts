import { PagedResultBase } from '@shared/models/pagination';
import { ILoadingHandler } from '@shared/state-helpers';
import { PromoterCampaign } from './promoter-campaign.model';
export class PromoterCampaignStateModel implements ILoadingHandler {
  campaigns: PromoterCampaign[];
  isLoading: boolean;
  pagination: PagedResultBase | null;

}
