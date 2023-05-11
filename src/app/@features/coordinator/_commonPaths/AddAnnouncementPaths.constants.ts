export const BasePath = 'announcements';
export const AddAnnouncementPathActions = {
  list: 'list',
  addAnnouncement: 'add-announcement',
};

let addAnnouncementPaths: IAnnouncementPaths = {
  basePath: BasePath,
  list: `${AddAnnouncementPathActions.list}`,
  addAnnouncement: `${AddAnnouncementPathActions.addAnnouncement}`,
  listComponents: [],
  addAnnouncementComponents: [],
};

addAnnouncementPaths = {
  ...addAnnouncementPaths,
  listComponents: ['/co/', BasePath, addAnnouncementPaths.list],
  addAnnouncementComponents: ['/co/', BasePath, addAnnouncementPaths.addAnnouncement],
};




interface IAnnouncementPaths {
  readonly basePath: string;
  readonly list: string;
  readonly addAnnouncement: string;
  readonly listComponents: string[];
  readonly addAnnouncementComponents: string[];
}
export const AddAnnouncementPAths: IAnnouncementPaths = addAnnouncementPaths;
