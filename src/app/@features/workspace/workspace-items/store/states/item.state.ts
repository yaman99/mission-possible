import { tap } from 'rxjs';
import { WorkspaceItemHttpService } from './../../services/item-http.service';
import { ILoadingHandler, LoadingHandler } from '@shared/state-helpers';
import { Action, createSelector, Selector, State, StateContext } from '@ngxs/store';
import { Item } from '../../models/item.model';
import { WorkspaceItemStateActions } from '../actions/item.action';
import { patch, append, removeItem, insertItem, updateItem } from '@ngxs/store/operators';
import { Injectable } from '@angular/core';
import { PagedResult, PagedResultBase } from '@shared/models/pagination';
import { NoticeService } from '@core/notification/notice.service';
import { Navigate } from '@ngxs/router-plugin';
import { ItemPaths } from '@shared/paths';

export class ItemStateModel implements ILoadingHandler {
  isLoading: boolean;
  items: Item[];
  pagination: PagedResultBase | null;
}
@State<ItemStateModel>({
  name: 'items',
  defaults: {
    items: [],
    isLoading: false,
    pagination: null,
  },
})
@Injectable()
export class WorkspaceItemState extends LoadingHandler<ItemStateModel> {
  @Selector()
  static isLoading(state: ItemStateModel) {
    return state.isLoading;
  }
  @Selector()
  static pagination(state: ItemStateModel) {
    return state.pagination;
  }
  @Selector()
  static items(state: ItemStateModel) {
    return state.items;
  }
  static getItemById(id: string | undefined) {
    return createSelector([WorkspaceItemState], (state: ItemStateModel) => {
      return state.items.find((x) => x.id === id);
    });
  }
  constructor(private itemHttp: WorkspaceItemHttpService, private notify: NoticeService) {
    super();
  }

  @Action(WorkspaceItemStateActions.Add)
  onAddItem(ctx: StateContext<ItemStateModel>, { payload }: WorkspaceItemStateActions.Add) {
    this.startLoading(ctx);
    return this.itemHttp.addItem(payload).pipe(
      tap({
        next: () => {
          this.notify.successNotice('ITEM.ALERT.ADD_ITEM.SUCCESS');
          ctx.dispatch(new Navigate(ItemPaths.ItemsListComponents));
        },
        finalize: () => this.stopLoading(ctx),
      })
    );
  }
  @Action(WorkspaceItemStateActions.SyncSallaProducts)
  syncSallaProducts(ctx: StateContext<ItemStateModel>, { workspaceId }: WorkspaceItemStateActions.SyncSallaProducts) {
    this.notify.loadingModal('جاري إحضار المنتجات');
    const state = ctx.getState();
    return this.itemHttp.syncSallaProducts(workspaceId).pipe(
      tap({
        next: (res) => {
          this.notify.successNotice('ITEM.INTEGRATION.SUCCESS');
          ctx.patchState({
            ...state,
            items: res.items,
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
  @Action(WorkspaceItemStateActions.Update)
  onUpdateItem(ctx: StateContext<ItemStateModel>, { payload }: WorkspaceItemStateActions.Update) {
    this.startLoading(ctx);
    return this.itemHttp.updateItem(payload).pipe(
      tap({
        next: () => {
          this.notify.successNotice('ITEM.ALERT.UPDATE_ITEM.SUCCESS');
        },
        finalize: () => this.stopLoading(ctx),
      })
    );
  }

  @Action(WorkspaceItemStateActions.Delete)
  onDeleteItem(ctx: StateContext<ItemStateModel>, { itemId, navigate }: WorkspaceItemStateActions.Delete) {
    this.startLoading(ctx);
    return this.itemHttp.deleteItem(itemId).pipe(
      tap({
        next: () => {
          this.notify.successNotice('ITEM.ALERT.DELETE_ITEM.SUCCESS');
          ctx.setState(
            patch({
              items: removeItem<Item>((item) => item?.id === itemId),
            })
          );
          if (navigate) {
            ctx.dispatch(new Navigate(ItemPaths.ItemsListComponents));
          }
        },
        finalize: () => this.stopLoading(ctx),
      })
    );
  }

  @Action(WorkspaceItemStateActions.GetAll)
  onGetItems(ctx: StateContext<ItemStateModel>, { payload }: WorkspaceItemStateActions.GetAll) {
    this.startLoading(ctx);
    const state = ctx.getState();
    return this.itemHttp.getItems(payload).pipe(
      tap({
        next: (res) => {
          ctx.patchState({
            ...state,
            items: res.items,
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
}
