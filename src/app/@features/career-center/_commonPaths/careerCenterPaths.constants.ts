export const BasePath = 'career-center';
export const CareerCenterPathActions = {
  notifications: 'notifications',
  announcements: 'announcements',
  sgkRequest: 'sgk-requests',
};
let careerCenterPaths: ICareerCenterPaths = {
  basePath: BasePath,
  notifications: `${CareerCenterPathActions.notifications}`,
  notificationsComponents: [],
  announcements: `${CareerCenterPathActions.announcements}`,
  announcementsComponents: [],
  sgkRequest: `${CareerCenterPathActions.sgkRequest}`,
  sgkRequestComponents: [],
};
careerCenterPaths = {
  ...careerCenterPaths,
  notificationsComponents: ['/cr/', careerCenterPaths.notifications],
  announcementsComponents: ['/cr/', careerCenterPaths.announcements],
  sgkRequestComponents: ['/cr/', careerCenterPaths.sgkRequest],
};

interface ICareerCenterPaths {
  readonly basePath: string;
  readonly notifications: string;
  readonly notificationsComponents: string[];
  readonly announcements: string;
  readonly announcementsComponents: string[];
  readonly sgkRequest: string;
  readonly sgkRequestComponents: string[];
}
export const CareerCenterPaths: ICareerCenterPaths = careerCenterPaths;
