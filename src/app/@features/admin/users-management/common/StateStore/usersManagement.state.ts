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
export class UsersManagementState extends LoadingHandler<UsersManagementStateModel> {
  @Selector()
  static isLoading(state: UsersManagementStateModel) {
    return state.isLoading;
  }
  @Selector()
  static pagination(state: UsersManagementStateModel) {
    return state.pagination;
  }
  @Selector()
  static users(state: UsersManagementStateModel) {
    return state.users;
  }

  static getUserById(id: string | undefined) {
    return createSelector([UsersManagementState], (state: UsersManagementStateModel) => {
      return state.users.find((x) => x.id === id);
    });
  }
  constructor(
    private usersManagementHttp: UsersManagementHttpService,
    private notify: NoticeService
  ) {
    super();
  }
  @Action(UsersManagementStateActions.GetAllUsersByType)
  onGetAllUsers(
    ctx: StateContext<UsersManagementStateModel>,
    { payload }: UsersManagementStateActions.GetAllUsersByType
  ) {
    this.startLoading(ctx);
    const state = ctx.getState();
    return this.usersManagementHttp.getAllUsers(payload).pipe(
      tap({
        next: (res) => {
          ctx.patchState({
            ...state,
            users: res.items,
            pagination: {
              currentPage: res.currentPage,
              resultsPerPage: res.resultsPerPage,
              totalPages: res.totalPages,
              totalResults: res.totalResults,
            },
          });
        },
        finalize: () => this.stopLoading(ctx),
      })
    );
  }

  @Action(UsersManagementStateActions.UpdateUser)
  onUpdateUser(
    ctx: StateContext<UsersManagementStateModel>,
    { payload }: UsersManagementStateActions.UpdateUser
  ) {
    this.startLoading(ctx);
    return this.usersManagementHttp.updateUser(payload).pipe(
      tap({
        next: () => {
          this.notify.successNotice('USER_MANAGEMENT.ALERT.UPDATE.SUCCESS');
          ctx.setState(
            patch({
              users: updateItem<UsersManagementModel>(
                (user) => user?.id === payload.id,
                patch<UsersManagementModel>({
                  email: payload.email,
                  phone: payload.phone,
                  isActive: payload.isActive,
                })
              ),
            })
          );
        },
        finalize: () => this.stopLoading(ctx),
      })
    );
  }

  @Action(UsersManagementStateActions.DeleteUser)
  onDeleteUser(
    ctx: StateContext<UsersManagementStateModel>,
    { userId }: UsersManagementStateActions.DeleteUser
  ) {
    this.startLoading(ctx);
    return this.usersManagementHttp.deleteUser(userId).pipe(
      tap({
        next: () => {
          this.notify.successNotice('USER_MANAGEMENT.ALERT.DELETE.SUCCESS');
          ctx.setState(
            patch({
              users: updateItem<UsersManagementModel>(
                (user) => user?.id === userId,
                patch<UsersManagementModel>({ isDeleted: true })
              ),
            })
          );
        },
        finalize: () => this.stopLoading(ctx),
      })
    );
  }

  @Action(UsersManagementStateActions.AddNewAdmin)
  onAddNewUser(
    ctx: StateContext<UsersManagementStateModel>,
    { payload }: UsersManagementStateActions.AddNewAdmin
  ) {
    this.startLoading(ctx);
    return this.usersManagementHttp.addNewAdmin(payload).pipe(
      tap({
        next: () => {
          this.notify.successNotice('USER_MANAGEMENT.ALERT.ADD_ADMIN.SUCCESS');
          ctx.dispatch(new Navigate(UsersManagementPaths.listComponents));
        },
        finalize: () => this.stopLoading(ctx),
      })
    );
  }
}
