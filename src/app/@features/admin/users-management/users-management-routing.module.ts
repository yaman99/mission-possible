import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashboardComponent } from '../dashboard/dashboard.component';
import { UsersManagementPaths } from './common/paths/usersManagementPaths.constants';
import { UsersFormComponent } from './components/users-form/users-form.component';
import { UsersListComponent } from './components/users-list/users-list.component';
import { UsersManagemenetComponent } from './users-managemenet.component';

const routes: Routes = [
  {
    path: '',
    component: UsersManagemenetComponent,
    children: [
      {
        path: UsersManagementPaths.list,
        component: UsersListComponent,
      },
      {
        path: UsersManagementPaths.addUser,
        component: UsersFormComponent,
      },
      {
        path: UsersManagementPaths.editUser + '/:id',
        component: UsersFormComponent,
      },
      {
        path: '',
        redirectTo: UsersManagementPaths.list,
        pathMatch: 'full',
      },
      {
        path: '**',
        redirectTo: 'error/404',
      },
    ],
  },
  // {
  //   path: UsersManagementPaths.list,
  //   component: UsersListComponent,
  // },
  // {
  //   path: UsersManagementPaths.addUser,
  //   component: UsersFormComponent,
  // },
  // {
  //   path: UsersManagementPaths.editUser + '/:id',
  //   component: UsersFormComponent,
  // },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class UsersManagementRoutingModule {}
