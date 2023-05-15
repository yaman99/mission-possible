export const BasePath = 'career-center';
export const CareerCenterPathActions = {

  notifications: 'notifications',
  announcements: 'announcements',


};
let careerCenterPaths: ICareerCenterPaths = {
  basePath: BasePath,
  notifications: `${CareerCenterPathActions.notifications}`,
  notificationsComponents: [],

  announcements: `${CareerCenterPathActions.announcements}`,
  announcementsComponents: [],



};
careerCenterPaths = {
  ...careerCenterPaths,
  notificationsComponents: ['/cr/', careerCenterPaths.notifications],
  announcementsComponents: ['/cr/', careerCenterPaths.announcements],



};

interface ICareerCenterPaths {
  readonly basePath: string;
  readonly notifications: string;
  readonly notificationsComponents: string[],
  readonly announcements: string;
  readonly announcementsComponents: string[],



}
export const CareerCenterPaths: ICareerCenterPaths = careerCenterPaths;
