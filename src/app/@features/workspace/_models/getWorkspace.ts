import { WorkspaceIntegration } from "./WorkspaceIntegration";

export class GetWorkspaceModel {
  id: string;
  title: string;
  category: string;
  setupCompleted: boolean;
  firsName: string;
  lastName: string;
  subscriptionCode: string;
  integration: WorkspaceIntegration;
}
