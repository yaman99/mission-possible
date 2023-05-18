import { PagedQuery } from '@shared/models/pagination';
import { AddNewAdminRequest } from '../models/requests/addNewAdminRequest';
import { GetAllUsersRequest } from '../models/requests/getAllUsersRequest';
import { UpdateUserRequest } from '../models/requests/updateUserRequest';
import { AssignNewUserRequest as AssignNewUserRequest } from '../models/requests/assignNewUsetRequest';

export namespace UsersManagementStateActions {
  export class GetObsAllCareerCenter {
    static readonly type = '[UsersManagement] Get All Career Center Users';
    constructor() {}
  }
  export class AssignNewUser {
    static readonly type = '[UsersManagement] adding new user';
    constructor(public payload: AssignNewUserRequest) {}
  }
}
