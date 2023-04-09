import { ILoadingHandler } from '@shared/state-helpers';

export class PromoterStateModel implements ILoadingHandler {
  id: string;
  location: string;
  targetCountries: string[];
  targetCategories: string[];
  profilepic: string;
  setupCompleted: false;
  isLoading: boolean;
  firstName: string;
  lastName: string;
}
