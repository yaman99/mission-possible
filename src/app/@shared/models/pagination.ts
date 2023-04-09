export class PagedQuery {
  page: number;
  result: number;
  orderBy?: string;
  sortOrder?: string;
}
export abstract class PagedResultBase {
  currentPage: number;
  resultsPerPage: number;
  totalPages: number;
  totalResults: number;
}
export class PagedResult<T> extends PagedResultBase{
  items: T[];
}
