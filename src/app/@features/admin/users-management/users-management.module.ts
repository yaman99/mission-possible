import { NgxsModule } from '@ngxs/store';
import { UsersManagementState } from './common/StateStore/usersManagement.state';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { UsersManagementRoutingModule } from './users-management-routing.module';
import { UsersListComponent } from './components/users-list/users-list.component';
import { UsersFormComponent } from './components/users-form/users-form.component';
import { SharedModule } from '@shared/shared.module';
import { UsersManagemenetComponent } from './users-managemenet.component';

@NgModule({
  declarations: [UsersListComponent, UsersFormComponent, UsersManagemenetComponent],
  imports: [
    CommonModule,
    SharedModule,
    UsersManagementRoutingModule,
    NgxsModule.forFeature([UsersManagementState]),
  ],
})
export class UsersManagementModule {}
