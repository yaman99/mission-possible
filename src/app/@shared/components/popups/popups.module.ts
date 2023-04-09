import { PipesModule } from '@core/pipes/pipes.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SelectCategoriesPopupComponent } from './select-categories-popup/select-categories-popup.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SelectCountriesPopupComponent } from './select-countries-popup/select-countries-popup.component';

@NgModule({
  declarations: [SelectCategoriesPopupComponent, SelectCountriesPopupComponent],
  imports: [CommonModule, PipesModule, NgbModule, FormsModule, ReactiveFormsModule],
  exports:[
    SelectCategoriesPopupComponent,
    SelectCountriesPopupComponent
  ]
})
export class PopupsModule {}
