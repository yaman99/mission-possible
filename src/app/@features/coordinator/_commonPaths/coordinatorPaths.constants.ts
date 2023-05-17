export const BasePath = 'request-management';
export const CoordinatorPathActions = {
  list: 'list',
  requestManagement:'request-management',
  notifications: 'notifications',
  announcements : 'announcements',
  messages : 'messages',
  officialLetter: 'official-letter-requests'
};
let coordinatorPaths: ICoordinatorPaths = {
  basePath: BasePath,
  list: `${CoordinatorPathActions.list}`,
  requestManagement : `${CoordinatorPathActions.requestManagement}`,
  notifications : `${CoordinatorPathActions.notifications}`,
  notificationsComponents :[],
  listComponents: [],
  requestManagementComponents:[],
  announcements : `${CoordinatorPathActions.announcements}`,
  announcementsComponents : [],
  messages : `${CoordinatorPathActions.messages}`,
  messagesComponents : [],
  officialLetter : `${CoordinatorPathActions.officialLetter}`,
  officialLetterComponents : []

};
coordinatorPaths = {
  ...coordinatorPaths,
  // listComponents: ['/co/', BasePath, coordinatorPaths.list],
  requestManagementComponents: ['/co/',coordinatorPaths.requestManagement],
  notificationsComponents: ['/co/', coordinatorPaths.notifications],
  announcementsComponents: ['/co/', coordinatorPaths.announcements],
  messagesComponents: ['/co/', coordinatorPaths.messages],
  officialLetterComponents: ['/co/', coordinatorPaths.officialLetter],
};

interface ICoordinatorPaths {
  readonly basePath: string;
  readonly list: string;
  readonly requestManagement: string;
  readonly notifications: string;
  readonly announcements : string;
  readonly messages : string;
  readonly requestManagementComponents: string[];
  readonly notificationsComponents :string[],
  readonly announcementsComponents : string[],
  readonly messagesComponents : string[],
  readonly listComponents: string[];
  readonly officialLetter:string;
  readonly officialLetterComponents :string[];
}
export const CoordinatorPaths: ICoordinatorPaths = coordinatorPaths;




// export const BasePath = 'campaign-management';
// export const CampaignManagementPathActions = {
//   list: 'list',
// };

// let campaignManagementPaths: ICampaignManagementPaths = {
//   basePath: BasePath,
//   list: `${CampaignManagementPathActions.list}`,
//   listComponents: [],
// };

// campaignManagementPaths = {
//   ...campaignManagementPaths,
//   listComponents: ['/a/', BasePath, campaignManagementPaths.list],
// };

// interface ICampaignManagementPaths {
//   readonly basePath: string;
//   readonly list: string;
//   readonly listComponents: string[];
// }
// export const CampaignManagementPaths: ICampaignManagementPaths = campaignManagementPaths;
