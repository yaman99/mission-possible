export namespace WorkspaceDashboardStateActions {
  export class Get {
    static readonly type = '[Workspace] Get Workspace Dashboard';
    constructor(public ownerId: string) {}
  }
}
