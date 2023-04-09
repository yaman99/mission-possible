import { NgModule, Optional, SkipSelf } from '@angular/core';
import { CommonModule } from '@angular/common';
import { checkIfLoaded } from './guards/loadedModule.guard';
import { HttpClientModule } from '@angular/common/http';
import { ClipboardModule } from 'ngx-clipboard';
import { NgxsBusService } from './bus/NgxsBus.service';
import { IBus } from '../@shared/state-bus/IBus';
import { httpInterceptorProviders } from './interceptors';

@NgModule({
  declarations: [],
  imports: [HttpClientModule, ClipboardModule],
  exports: [HttpClientModule, ClipboardModule],
  providers: [
    {
      provide: IBus,
      useClass: NgxsBusService,
    },
    httpInterceptorProviders
  ],
})
export class CoreModule {
  constructor(@Optional() @SkipSelf() parentModule: CoreModule) {
    checkIfLoaded(parentModule, 'CoreModule');
  }
}
