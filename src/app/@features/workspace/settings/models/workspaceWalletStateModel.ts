import { PagedResultBase } from '@shared/models/pagination';
import { ILoadingHandler } from '@shared/state-helpers';

export class WorkspaceWalletStateModel implements ILoadingHandler {
  isLoading: boolean;
  blanace: string;
  forecast: string;
  debt: string;
  history: PaymentHistoryModel[];
  pagination: PagedResultBase | null;
}
export class PaymentHistoryModel {
  amount: string;
  remainingAmount: string;
  createdDate: string;
  transactionType: number;
}
