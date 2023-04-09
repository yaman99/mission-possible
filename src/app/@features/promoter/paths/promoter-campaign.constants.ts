const BasePath = 'campaign';
export const PromoterCampaignActions = {
  browse: 'browse',
  list: 'list',
  details: 'details',
};

let promoterCampaignPaths: IPromoterCampaignPaths = {
  basePath: BasePath,
  list: `${PromoterCampaignActions.list}`,
  details: `${PromoterCampaignActions.details}`,
  browse: `${PromoterCampaignActions.browse}`,
  browseComponents: [],
  listComponents: [],
  detailsComponents: [],
};

promoterCampaignPaths = {
  ...promoterCampaignPaths,
  browseComponents: ['/p/', BasePath, promoterCampaignPaths.browse],
  listComponents :['/p/' , BasePath , promoterCampaignPaths.list],
  detailsComponents: ['/p/' , BasePath , promoterCampaignPaths.details],
};

interface IPromoterCampaignPaths {
  readonly basePath: string;
  readonly list: string;
  readonly details: string;
  readonly browse: string;
  readonly browseComponents: string[];
  readonly listComponents: string[];
  readonly detailsComponents: string[];
}
export const PromoterCampaignPaths: IPromoterCampaignPaths = promoterCampaignPaths;
