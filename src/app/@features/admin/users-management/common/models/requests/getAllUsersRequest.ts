import { PagedQuery } from "@shared/models/pagination";

export class GetAllUsersRequest {
  type: string;
  pagination: PagedQuery;
}
