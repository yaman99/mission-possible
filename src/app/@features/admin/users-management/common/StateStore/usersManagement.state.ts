import { tap } from 'rxjs';
import { Injectable } from '@angular/core';
import { NoticeService } from '@core/notification/notice.service';
import { State, Selector, Action, StateContext, createSelector } from '@ngxs/store';
import { LoadingHandler } from '@shared/state-helpers';
import { UsersManagementStateModel } from '../models/usersManagementStateModel';
import { UsersManagementHttpService } from '../services/usersManagementHttp.service';
import { UsersManagementStateActions } from './usersManagement.action';
import { patch, removeItem, updateItem } from '@ngxs/store/operators';
import { User } from '@features/auth/models/user';
import { UsersManagementModel } from '../models/usersManagementModel';
import { UsersManagementPaths } from '../paths/usersManagementPaths.constants';
import { Navigate } from '@ngxs/router-plugin';

@State<UsersManagementStateModel>({
  name: 'usersManagement',
  defaults: {
    users: [],
    isLoading: false,
    pagination: null,
  },
})
@Injectable()
export class UsersManagementState {
  @Selector()
  static users(state: UsersManagementStateModel) {
    return state.users;
  }

  constructor(
    private usersManagementHttp: UsersManagementHttpService,
    private notify: NoticeService
  ) {}

  @Action(UsersManagementStateActions.GetObsAllCareerCenter)
  onGetAllObsCareerCenter(ctx: StateContext<UsersManagementStateModel>) {
    return this.usersManagementHttp.getAllObsCareerCenter().pipe(
      tap({
        next: (res) => {
          ctx.patchState({
            users: res,
          });
        },
        error: () => {
          console.log(1231243);
        },
      })
    );
  }

  @Action(UsersManagementStateActions.GetAssignedUsers)
  onGetAssignedUsers(ctx: StateContext<UsersManagementStateModel>) {
    return this.usersManagementHttp.getAssignedUsers().pipe(
      tap({
        next: (res) => {
          ctx.patchState({
            users: res.data,
          });
        },
        error: () => {
          console.log(1231243);
        },
      })
    );
  }

  @Action(UsersManagementStateActions.AssignNewUser)
  onAssingNewUser(
    ctx: StateContext<UsersManagementStateModel>,
    { payload }: UsersManagementStateActions.AssignNewUser
  ) {
    return this.usersManagementHttp.assignNewUser(payload).pipe(
      tap({
        next: () => {
          this.notify.successNotice('User Assigned');
          ctx.dispatch(new Navigate(UsersManagementPaths.listComponents));
        },
      })
    );
  }

  @Action(UsersManagementStateActions.DeleteUser)
  onDeleteUser(
    ctx: StateContext<UsersManagementStateModel>,
    { userId }: UsersManagementStateActions.DeleteUser
  ) {
    return this.usersManagementHttp.deleteUser(userId).pipe(
      tap({
        next: () => {
          ctx.setState(
            patch<UsersManagementStateModel>({
              users: removeItem((x) => x?.id === userId),
            })
          );
          this.notify.successNotice('User deleted');
          ctx.dispatch(new Navigate(UsersManagementPaths.listComponents));
        },
      })
    );
  }
}
