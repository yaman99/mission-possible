import { CampaignsManagementPaths } from '@features/admin/campaigns-management/common/paths/campaignsManagementPaths.constants';
import { Component, OnInit } from '@angular/core';
import { UsersManagementPaths } from '@features/admin/users-management/common/paths/usersManagementPaths.constants';
import { CommissionsManagementPaths } from '@features/admin/commissions-management/common/paths/commissionsManagementPaths.constants';

@Component({
  selector: 'app-admin-aside-menu',
  templateUrl: './admin-aside-menu.component.html',
  styleUrls: ['./admin-aside-menu.component.scss'],
})
export class AdminAsideMenuComponent {
  paths = {
    campaignsManagement: CampaignsManagementPaths.listComponents,
    commissionsManagement: CommissionsManagementPaths.listComponents,
    usersManagement: UsersManagementPaths.listComponents,
  };

  constructor() {}
}
