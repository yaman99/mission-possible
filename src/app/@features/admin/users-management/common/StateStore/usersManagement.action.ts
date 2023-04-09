import { PagedQuery } from '@shared/models/pagination';
import { AddNewAdminRequest } from '../models/requests/addNewAdminRequest';
import { GetAllUsersRequest } from '../models/requests/getAllUsersRequest';
import { UpdateUserRequest } from '../models/requests/updateUserRequest';

export namespace UsersManagementStateActions {
  export class GetAllUsersByType {
    static readonly type = '[UsersManagement] Get All Users By Type';
    constructor(public payload: GetAllUsersRequest) {}
  }
  export class UpdateUser {
    static readonly type = '[UsersManagement] Update User';
    constructor(public payload: UpdateUserRequest) {}
  }
  export class AddNewAdmin {
    static readonly type = '[UsersManagement] Add New Admin';
    constructor(public payload: AddNewAdminRequest) {}
  }
  export class DeleteUser {
    static readonly type = '[UsersManagement] Delete User';
    constructor(public userId: string) {}
  }
}
