import { Routes } from '@angular/router';
import { UserTypes } from '@shared/constants';
import { UserTypeGuard } from './auth';

const Routing: Routes = [
  {
    canActivate: [UserTypeGuard],
    data: { guardUserType: [UserTypes.Advertiser] },
    path: 'w',
    loadChildren: () => import('./workspace/workspace.module').then((m) => m.WorkspaceModule),
  },
  {
    canActivate: [UserTypeGuard],
    data: { guardUserType: [UserTypes.Promoter] },
    path: 'p',
    loadChildren: () => import('./promoter/promoter.module').then((m) => m.PromoterModule),
  },
  {
    canActivate: [UserTypeGuard],
    data: { guardUserType: [UserTypes.Admin] },
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
