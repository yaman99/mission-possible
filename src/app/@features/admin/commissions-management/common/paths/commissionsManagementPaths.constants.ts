export const BasePath = 'commissions-management';
export const CommissionsManagementPathActions = {
  list: 'list',
};

let commissionsManagementPaths: ICommissionsManagementPaths = {
  basePath: BasePath,
  list: `${CommissionsManagementPathActions.list}`,
  listComponents: [],
};

commissionsManagementPaths = {
  ...commissionsManagementPaths,
  listComponents: ['/a/', BasePath, commissionsManagementPaths.list],
};

interface ICommissionsManagementPaths {
  readonly basePath: string;
  readonly list: string;
  readonly listComponents: string[];
}
export const CommissionsManagementPaths: ICommissionsManagementPaths = commissionsManagementPaths;
