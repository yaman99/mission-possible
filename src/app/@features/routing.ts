import { Routes } from '@angular/router';
import { UserTypeGuard } from './auth';
import { UserTypes } from '@shared/constants/userType.constants';
import { CareerCenterComponent } from './career-center/career-center.component';
import { StudentComponent } from './student/student.component';
import { RequestManagementComponent } from './coordinator/request-management/request-management.component';
import { CoordinatorComponent } from './coordinator/coordinator.component';

const Routing: Routes = [
  {
    // canActivate: [UserTypeGuard],
    // data: { guardUserType: [UserTypes.Advertiser] },
    path: 'co',


    loadChildren: () => import('./coordinator/coordinator.module').then((m) => m.CoordinatorModule),
  },

  {
    // canActivate: [UserTypeGuard],
    // data: { guardUserType: [UserTypes.Admin] },
    path: 'a',
    loadChildren: () => import('./admin/admin.module').then((m) => m.AdminModule),
  },
  {
    path:'cr',
    component:CareerCenterComponent,
    children:[
      // {
      //   path: 'dashbaord'
      //   component:
      // }
    ]
  },
  {
    path:'st',
        loadChildren: () => import('./student/student.module').then((m) => m.StudentModule),


  },
  // {
  //   path: '',
  //   redirectTo: 'w',
  //   pathMatch: 'full',
  // },
  // {
  //   path: '**',
  //   redirectTo: 'error/404',
  // },
];

export { Routing };
