import { ILoadingHandler } from "@shared/state-helpers";
import { WorkspaceIntegration } from "./WorkspaceIntegration";

export class WorkspaceStateModel implements ILoadingHandler{
  id:string;
  firstName:string;
  lastName:string;
  title:string;
  category:string;
  logo:string;
  setupCompleted:boolean;
  isLoading: boolean;
  subscriptionCode:string;
  integration: WorkspaceIntegration;
}
