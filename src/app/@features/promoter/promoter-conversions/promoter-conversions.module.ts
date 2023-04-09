import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PromoterConversionsRoutingModule } from './promoter-conversions-routing.module';
import { PromoterConversionsComponent } from './promoter-conversions.component';


@NgModule({
  declarations: [
    PromoterConversionsComponent
  ],
  imports: [
    CommonModule,
    PromoterConversionsRoutingModule
  ]
})
export class PromoterConversionsModule { }
