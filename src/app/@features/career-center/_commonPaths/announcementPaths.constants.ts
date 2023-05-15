export const BasePath = 'announcements';
export const AnnouncementsPathActions = {
  list: 'list',
  add: 'add',
};

let announcementPaths: IAnnouncementPaths = {
  basePath: BasePath,
  list: `${AnnouncementsPathActions.list}`,
  add: `${AnnouncementsPathActions.add}`,
  listComponents: [],
  addComponents: [],
};

announcementPaths = {
  ...announcementPaths,
  listComponents: ['/cr/', BasePath, announcementPaths.list],
  addComponents: ['/cr/', BasePath, announcementPaths.add],
};




interface IAnnouncementPaths {
  readonly basePath: string;
  readonly list: string;
  readonly add: string;
  readonly listComponents: string[];
  readonly addComponents: string[];
}
export const AnnouncementPaths: IAnnouncementPaths = announcementPaths;
