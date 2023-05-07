import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdminComponent } from './admin.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { UsersManagementPaths } from './users-management/common/paths/usersManagementPaths.constants';

const routes: Routes = [
  {
    path:'',
    component:AdminComponent,
    children:[
      {
        path: UsersManagementPaths.basePath,
        loadChildren: () => import('./users-management/users-management.module').then((m) => m.UsersManagementModule),
      },
      {
        path: '',
        redirectTo: UsersManagementPaths.basePath,
        pathMatch: 'full',
      },
      {
        path: '**',
        redirectTo: 'error/404',
      },
    ]
  },

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminRoutingModule { }
