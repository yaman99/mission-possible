import { CreateIntegrationRequest } from '@features/workspace/_models/requests/CreateIntegrationRequest';
import { UpdateWorkspaceModel } from './../../_models/updateWorkspace';
export namespace WorkspaceStateActions {
  export class Get {
    static readonly type = '[Workspace] Get Workspace';
    constructor(public ownerId: string) {}
  }

  export class Update {
    static readonly type = '[Workspace] Update Workspace';
    constructor(public payload:UpdateWorkspaceModel) {}
  }
  export class UpdateLogo {
    static readonly type = '[Workspace] Update Workspace';
    constructor(public payload:FormData) {}
  }

  export class Integrate {
    static readonly type = '[Workspace] Integrate Workspace';
    constructor(public payload:CreateIntegrationRequest) {}
  }

  // event
  export class SetSelectedLogo {
    static readonly type = '[Workspace] Update Workspace Logo';
    constructor(public payload:any) {}
  }
}
