import { PagedQuery } from "@shared/models/pagination";

export class GetWorkspaceItemsRequest{
  workspaceId: string;
  pagination: PagedQuery;
}
