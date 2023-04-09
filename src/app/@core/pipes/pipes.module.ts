import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CountriesFilterPipe } from './countries-filter.pipe';

@NgModule({
  declarations: [CountriesFilterPipe],
  imports: [CommonModule],
  exports: [CountriesFilterPipe],
})
export class PipesModule {}
