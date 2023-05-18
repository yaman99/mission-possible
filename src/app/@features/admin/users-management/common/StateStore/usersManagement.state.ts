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

  @Action(UsersManagementStateActions.AssignNewUser)
  onAssingNewUser(
    ctx: StateContext<UsersManagementStateModel>,
    { payload }: UsersManagementStateActions.AssignNewUser
  ) {

    return this.usersManagementHttp.assignNewUser(payload).pipe(
      tap({
        next: () => {
          console.log("inserted");
        },
        error: () => {
          console.log('error');
        },
      })
    );
  }
}
