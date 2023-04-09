import { PagedQuery } from "@shared/models/pagination";

export class GetWorkspacePaymentHistoryRequest{
  workspaceId: string;
  pagination: PagedQuery;
}
