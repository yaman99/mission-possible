import { NgModule } from '@angular/core';
import { AuthRoutingModule } from './auth-routing.module';
import { LoginComponent } from './components/login/login.component';
import { RegistrationComponent } from './components/registration/registration.component';
import { ForgotPasswordComponent } from './components/forgot-password/forgot-password.component';
import { LogoutComponent } from './components/logout/logout.component';
import { AuthComponent } from './auth.component';
import { SharedModule } from '@shared/shared.module';
import { AuthBaseState } from './states/auth.state';
import { NgxsModule } from '@ngxs/store';
import { QuickIntegrationComponent } from './components/quick-integration/quick-integration.component';

@NgModule({
  declarations: [
    LoginComponent,
    RegistrationComponent,
    ForgotPasswordComponent,
    LogoutComponent,
    AuthComponent,
    QuickIntegrationComponent,
  ],
  imports: [
    SharedModule,
    AuthRoutingModule,
    NgxsModule.forFeature([AuthBaseState]),
  ],
})
export class AuthModule {}
