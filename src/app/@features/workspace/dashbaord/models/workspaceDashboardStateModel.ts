import { ILoadingHandler } from '@shared/state-helpers';

export class WorkspaceDashboardStateModel implements ILoadingHandler {
  isLoading: boolean;
  totalActiveAffiliates: number;
  totalCanceledAffiliates: number;
  totalConversions: number;
}
