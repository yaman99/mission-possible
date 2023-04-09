import { GetWorkspaceItemsRequest } from '../../models/requests/getWorkspaceItemsRequest';
import { UpdateItemRequest } from '../../models/requests/updateItemRequest';
import { AddNewItemRequest } from '../../models/requests/addNewItemRequest';
export namespace WorkspaceItemStateActions {
  export class Add {
    static readonly type = '[Item] Add New Item';
    constructor(public payload: AddNewItemRequest) {}
  }
  export class SyncSallaProducts {
    static readonly type = '[Item] Sync Salla Products';
    constructor(public workspaceId : string) {}
  }
  export class Update {
    static readonly type = '[Item] Update Item';
    constructor(public payload: UpdateItemRequest) {}
  }
  export class Delete {
    static readonly type = '[Item] Delete Item';
    constructor(public itemId: string , public navigate:boolean) {}
  }
  export class GetAll {
    static readonly type = '[Item] Get Workspace Items';
    constructor(public payload: GetWorkspaceItemsRequest) {}
  }
}
