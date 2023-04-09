export const BasePath = 'campaigns-management';
export const CampaignsManagementPathActions = {
  list: 'list',
};

let campaignsManagementPaths: ICampaignsManagementPaths = {
  basePath: BasePath,
  list: `${CampaignsManagementPathActions.list}`,
  listComponents: [],
};

campaignsManagementPaths = {
  ...campaignsManagementPaths,
  listComponents: ['/a/', BasePath, campaignsManagementPaths.list],
};

interface ICampaignsManagementPaths {
  readonly basePath: string;
  readonly list: string;
  readonly listComponents: string[];
}
export const CampaignsManagementPaths: ICampaignsManagementPaths = campaignsManagementPaths;
