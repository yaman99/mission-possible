import { WorkspaceIntegration } from "./WorkspaceIntegration";

export class Workspace {
  id: string;
  firstName: string;
  lastName: string;
  title: string;
  category: string;
  logo: string;
  setupCompleted: boolean;
  subscriptionCode: string;
  integration: WorkspaceIntegration;
}
