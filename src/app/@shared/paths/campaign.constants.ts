export const CampaignBasePath = 'campaign';
export const CampaignActions = {
  CampaignsList: 'list',
  AddCampaign: 'add',
  EditCampaign: 'edit',
  ViewCampaign: 'view',
};

let campaignPaths: ICampaignPaths = {
  CampaignDefaultPath: CampaignBasePath,
  AddCampaign: `${CampaignActions.AddCampaign}`,
  EditCampaign: `${CampaignActions.EditCampaign}`,
  CampaignsList: `${CampaignActions.CampaignsList}`,
  ViewCampaign: `${CampaignActions.ViewCampaign}`,
  CampaignsListComponents: [],
  AddCampaignComponents: [],
  EditCampaignComponents: [],
  ViewCampaignComponents: [],
};

campaignPaths = {
  ...campaignPaths,
  CampaignsListComponents: ['/w/', CampaignBasePath, campaignPaths.CampaignsList],
  AddCampaignComponents :['/w/' , CampaignBasePath , campaignPaths.AddCampaign],
  EditCampaignComponents: ['/w/' , CampaignBasePath , campaignPaths.EditCampaign],
  ViewCampaignComponents: ['/w/' , CampaignBasePath , campaignPaths.ViewCampaign],
};

interface ICampaignPaths {
  readonly CampaignDefaultPath: string;
  readonly AddCampaign: string;
  readonly EditCampaign: string;
  readonly ViewCampaign: string;
  readonly CampaignsList: string;
  readonly CampaignsListComponents: string[];
  readonly AddCampaignComponents: string[];
  readonly EditCampaignComponents: string[];
  readonly ViewCampaignComponents: string[];
}
export const CampaignPaths: ICampaignPaths = campaignPaths;
