import { NgxsModule } from '@ngxs/store';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CoordinatorRoutingModule } from './coordinator-routing.module';
import { DashbaordComponent } from './dashbaord/dashbaord.component';
import { SharedModule } from '@shared/shared.module';
import { CoordinatorComponent } from './coordinator.component';

@NgModule({
  declarations: [DashbaordComponent , CoordinatorComponent],
  imports: [
    SharedModule,
    CoordinatorRoutingModule,
    // NgxsModule.forFeature([]),
  ],
})
export class CoordinatorModule {}
