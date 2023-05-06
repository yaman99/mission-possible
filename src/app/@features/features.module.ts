import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CareerCenterComponent } from './career-center/career-center.component';
import { StudentComponent } from './student/student.component';

@NgModule({
  declarations: [
    CareerCenterComponent,
    StudentComponent
  ],
  imports: [CommonModule],
})
export class FeaturesModule {}
