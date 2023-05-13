export const BasePath = 'internship-applications';
export const StudentPathActions = {
  list: 'list',
  internshipApplicationList:'list',
  notifications: 'notifications',
  announcements : 'announcements',
  messages : 'messages',
  officialLetter :'official-letter',
  addApplication :'add'
};
let studentPaths: IStudentPaths = {
  basePath: BasePath,
  list: `${StudentPathActions.list}`,
  internshipApplicationList : `${StudentPathActions.internshipApplicationList}`,
  notifications : `${StudentPathActions.notifications}`,
  notificationsComponents :[],
  listComponents: [],
  internshipApplicationListComponents:[],
  announcements : `${StudentPathActions.announcements}`,
  announcementsComponents : [],
  messages : `${StudentPathActions.messages}`,
  messagesComponents : [],
  officialLetter : `${StudentPathActions.officialLetter}`,
  officialLetterComponents : [],
  addApplication : `${StudentPathActions.addApplication}`,
  addApplicationComponents : []

};
studentPaths = {
  ...studentPaths,
  internshipApplicationListComponents: ['/st/',BasePath ,studentPaths.internshipApplicationList],
  addApplicationComponents: ['/st/',BasePath ,studentPaths.addApplication],
  notificationsComponents: ['/st/',studentPaths.notifications],
  announcementsComponents: ['/st/', studentPaths.announcements],
  messagesComponents: ['/st/',studentPaths.messages],
  officialLetterComponents: ['/st/',studentPaths.officialLetter],

};

interface IStudentPaths {
  readonly basePath: string;
  readonly list: string;
  readonly internshipApplicationList: string;
  readonly notifications: string;
  readonly announcements : string;
  readonly messages : string;
  readonly officialLetter : string;
  readonly addApplication : string;
  readonly internshipApplicationListComponents: string[];
  readonly notificationsComponents :string[],
  readonly announcementsComponents : string[],
  readonly messagesComponents : string[],
  readonly officialLetterComponents : string[];
  readonly addApplicationComponents : string[];
  readonly listComponents: string[];
}
export const StudentPaths: IStudentPaths = studentPaths;
