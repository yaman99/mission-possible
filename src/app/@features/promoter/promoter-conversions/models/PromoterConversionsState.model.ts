import { PagedResultBase } from '@shared/models/pagination';
import { ILoadingHandler } from '@shared/state-helpers';
import { PromoterConversion as PromoterConversion } from './promoterConversions';

export class PromoterConversionsStateModel implements ILoadingHandler {
  conversions: PromoterConversion[];
  totalPaid:number;
  totalRejected:number
  totalPending:number
  isLoading: boolean;
  pagination: PagedResultBase | null;
}
