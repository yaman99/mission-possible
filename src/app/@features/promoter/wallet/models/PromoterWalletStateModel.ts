import { PagedResultBase } from '@shared/models/pagination';
import { ILoadingHandler } from '@shared/state-helpers';

export class PromoterWalletStateModel implements ILoadingHandler {
  isLoading: boolean;
  profit: string;
  history: PaymentHistoryModel[];
  pagination: PagedResultBase | null;
}
export class PaymentHistoryModel {
  amount: string;
  remainingAmount: string;
  createdDate: string;
  transactionType: number;
}
