import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CareerCenterComponent } from './career-center/career-center.component';
import { StudentComponent } from './student/student.component';
import { DashboardComponent } from './dashboard/dashboard.component';

@NgModule({
  declarations: [
    CareerCenterComponent,
    StudentComponent,
    DashboardComponent
  ],
  imports: [CommonModule],
})
export class FeaturesModule {}
