export const BasePath = 'users-management';
export const UsersManagementPathActions = {
  list: 'list',
  addUser: 'add-user',
  editUser: 'edit-user',
};

let usersManagementPaths: IUsersManagementPaths = {
  basePath: BasePath,
  list: `${UsersManagementPathActions.list}`,
  addUser: `${UsersManagementPathActions.addUser}`,
  editUser: `${UsersManagementPathActions.editUser}`,
  listComponents: [],
  addUserComponents: [],
  editUserComponents: [],
};

usersManagementPaths = {
  ...usersManagementPaths,
  listComponents: ['/a/', BasePath, usersManagementPaths.list],
  addUserComponents: ['/a/', BasePath, usersManagementPaths.addUser],
  editUserComponents: ['/a/', BasePath, usersManagementPaths.editUser],
};

interface IUsersManagementPaths {
  readonly basePath: string;
  readonly list: string;
  readonly addUser: string;
  readonly editUser: string;
  readonly listComponents: string[];
  readonly addUserComponents: string[];
  readonly editUserComponents: string[];
}
export const UsersManagementPaths: IUsersManagementPaths = usersManagementPaths;
