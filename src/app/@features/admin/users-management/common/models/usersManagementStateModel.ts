import { PagedResultBase } from '@shared/models/pagination';
import { ILoadingHandler } from '@shared/state-helpers';
import { UsersManagementModel } from './usersManagementModel';

export class UsersManagementStateModel implements ILoadingHandler {
  users: UsersManagementModel[];
  isLoading: boolean;
  pagination: PagedResultBase | null;
}
