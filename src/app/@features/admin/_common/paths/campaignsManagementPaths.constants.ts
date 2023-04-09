export const BasePath = 'campaign-management';
export const CampaignManagementPathActions = {
  list: 'list',
};

let campaignManagementPaths: ICampaignManagementPaths = {
  basePath: BasePath,
  list: `${CampaignManagementPathActions.list}`,
  listComponents: [],
};

campaignManagementPaths = {
  ...campaignManagementPaths,
  listComponents: ['/a/', BasePath, campaignManagementPaths.list],
};

interface ICampaignManagementPaths {
  readonly basePath: string;
  readonly list: string;
  readonly listComponents: string[];
}
export const CampaignManagementPaths: ICampaignManagementPaths = campaignManagementPaths;
