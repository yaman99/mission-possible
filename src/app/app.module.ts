import { CoreModule } from './@core/core.module';
import { NgModule, APP_INITIALIZER, Injectable } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule } from '@angular/common/http';
import { HttpClientInMemoryWebApiModule } from 'angular-in-memory-web-api';
import { ClipboardModule } from 'ngx-clipboard';
import { TranslateModule } from '@ngx-translate/core';
import { InlineSVGModule } from 'ng-inline-svg-2';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AuthService } from './@features/auth/services/auth.service';
import { environment } from 'src/environments/environment';
// #fake-start#
import { NgxsLoggerPluginModule } from '@ngxs/logger-plugin';
import { NgxsStoragePluginModule } from '@ngxs/storage-plugin';
import { NgxsModule } from '@ngxs/store';
import { AuthBaseState } from './@features/auth/states/auth.state';
import { JwtModule } from '@auth0/angular-jwt';
import { NgxsRouterPluginModule } from '@ngxs/router-plugin';
import { NgxsResetPluginModule } from 'ngxs-reset-plugin';
import * as CryptoJS from 'crypto-js';
import * as _ from 'lodash';

function des(data: string) {
  return CryptoJS.AES.decrypt(data, environment.stateMangementSecretKey).toString(
    CryptoJS.enc.Utf8
  );
}

function enc(data: string) {
  return CryptoJS.AES.encrypt(data, environment.stateMangementSecretKey).toString();
}
@NgModule({
  declarations: [AppComponent],
  imports: [
    CoreModule,
    BrowserModule,
    BrowserAnimationsModule,
    JwtModule.forRoot({
      config: {
        tokenGetter: () => {
          const auth = localStorage.getItem('auth');
          if (_.isEmpty(des(auth!)) || _.isNull(des(auth!))) {
            return JSON.parse('{}');
          } else {
            return JSON.parse(des(auth!)).accessToken;
          }
        },
      },
    }),
    AppRoutingModule,
    NgbModule,
    TranslateModule.forRoot(),
    NgxsModule.forRoot([AuthBaseState]),
    NgxsResetPluginModule.forRoot(),
    NgxsStoragePluginModule.forRoot({
      key: [
        'auth',
      ],
      deserialize: (state: string) => JSON.parse(des(state)),
      serialize: (state: any) => enc(JSON.stringify(state)),
      //   serialize: (state: any) =>
      //   CryptoJS.AES.encrypt(JSON.stringify(state), environment.stateMangementSecretKey).toString(),
      // deserialize: (state: string) =>
      //   JSON.parse(
      //     CryptoJS.AES.decrypt(state, environment.stateMangementSecretKey).toString(
      //       CryptoJS.enc.Utf8
      //     )
      //   ),
    }),
    NgxsLoggerPluginModule.forRoot({
      disabled: environment.production,
    }),
    NgxsRouterPluginModule.forRoot(),
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
