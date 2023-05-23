import { PaginationModule } from './partials/content/pagination/pagination.module';
import { InlineSVGModule } from 'ng-inline-svg-2';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TranslationModule } from './i18n';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { PipesModule } from '@core/pipes/pipes.module';
import { NotificationListComponent } from './components/notification-list/notification-list.component';


@NgModule({
  declarations: [

    NotificationListComponent
  ],
  imports: [
    CommonModule,
    TranslationModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    InlineSVGModule,
    PaginationModule,
    NgbModule,
    PipesModule
  ],
  exports:[
    CommonModule,
    TranslationModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    InlineSVGModule,
    PaginationModule,
    NgbModule,
    PipesModule,
    NotificationListComponent

  ]
})
export class SharedModule { }
