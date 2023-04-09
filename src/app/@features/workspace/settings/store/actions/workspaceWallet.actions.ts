import { GetWorkspacePaymentHistoryRequest } from "../../models/getWorkspacePaymentHistoryRequest";

export namespace WorkspaceWalletStateActions{
  export class GetBlanace {
    static readonly type = '[WorkspaceWallet] Get Balance';
    constructor(public workspaceId: string) {}
  }
  export class GetPaymentHistory {
    static readonly type = '[WorkspaceWallet] Get Payment History';
    constructor(public payload: GetWorkspacePaymentHistoryRequest) {}
  }
}
