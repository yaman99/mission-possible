import { Routes } from '@angular/router';
import { UserTypeGuard } from './auth';
import { UserTypes } from '@shared/constants/userType.constants';

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
    path: '',
    redirectTo: 'w',
    pathMatch: 'full',
  },
  {
    path: '**',
    redirectTo: 'error/404',
  },
];

export { Routing };
