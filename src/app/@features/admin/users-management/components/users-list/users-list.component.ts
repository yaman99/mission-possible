import { AddNewAdminRequest } from './../../common/models/requests/addNewAdminRequest';
import { ActivatedRoute } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { User } from '@features/auth/models/user';
import { Select } from '@ngxs/store';
import { PagedResultBase } from '@shared/models/pagination';
import { Observable } from 'rxjs';
import { UsersManagementPaths } from '../../common/paths/usersManagementPaths.constants';
import { UsersManagementState } from '../../common/StateStore/usersManagement.state';
import { IBus } from '@shared/state-bus/IBus';
import { UsersManagementStateActions } from '../../common/StateStore/usersManagement.action';
import { GetAllUsersRequest } from '../../common/models/requests/getAllUsersRequest';
import { Expansion } from '@angular/compiler';
import { UsersManagementHttpService } from '../../common/services/usersManagementHttp.service';
import { UserTypes } from '@shared/constants';
import { UsersManagementModel } from '../../common/models/usersManagementModel';

@Component({
  selector: 'app-users-list',
  templateUrl: './users-list.component.html',
  styleUrls: ['./users-list.component.scss'],
})
export class UsersListComponent implements OnInit {
  paths = {
    addNewUser: UsersManagementPaths.addUserComponents,
    editUser: UsersManagementPaths.editUserComponents,
  };
  selectedType: string;
  userType = UserTypes;
  // @Select(UsersManagementState.users) users$: Observable<User[]>;
  @Select(UsersManagementState.users) users$: Observable<UsersManagementModel[]>;

  users: any;
  constructor(private stateBus: IBus, private userServ: UsersManagementHttpService) {}

  ngOnInit(): void {
    this.stateBus.excuteAction(new UsersManagementStateActions.GetAssignedUsers());
  }

  deleteUser(id: string) {
    // this.stateBus.excuteAction(new UsersManagementStateActions.DeleteUser(id));
  }

  SelectUserType(userType: string) {
    this.selectedType = userType;
    this.getPage(1);
  }
  getPage(page: number) {
    let payload: GetAllUsersRequest = {
      type: this.selectedType,
      pagination: {
        page: page,
        result: 10,
        orderBy: 'CreatedDate',
      },
    };
    // this.stateBus.excuteAction(new UsersManagementStateActions.GetAllUsersByType(payload));
  }
}
