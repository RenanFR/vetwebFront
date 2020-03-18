import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { AuthBaseComponent } from './layout/auth.base.component';
import { LoginComponent } from './main/login.component';
import { LoginRoutingModule } from './login-routing.module';
import { UserService } from './services/user.service';
import { SharedModule } from '../shared/shared.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { EnableToLogin } from './utilities/enable.to.login';
import { HttpClientModule } from '@angular/common/http';
import { AuthServiceConfig, SocialLoginModule } from 'angularx-social-login';
import { getGoogleClientCredentials } from './utilities/google.configuration';
import { UserExistsValidator } from './validation/user.exists.validator';
import { UserRegistrationComponent } from './registration/user.registration.component';
import { isLoggedGuard } from './utilities/is.logged.guard';
import { TranslateModule } from '@ngx-translate/core';
import { ForgetPasswordComponent } from './forget/forget.password.component';
import { ResetPasswordComponent } from './forget/reset.password.component';
import { AuthenticationService } from './services/authentication.service';
import { LayoutModule } from '../layout/layout.module';
import { AccountConfirmationComponent } from './confirmation/account.confirmation.component';
import { EnableToConfirm } from './utilities/enable.to.confirm';

@NgModule({
  imports: [
    CommonModule,
    RouterModule,
    SharedModule,
    FormsModule,
    ReactiveFormsModule,
    LoginRoutingModule,
    HttpClientModule,
    SocialLoginModule,
    TranslateModule,
    LayoutModule
  ],
  declarations: [
    AuthBaseComponent,
    LoginComponent,
    UserRegistrationComponent,
    ForgetPasswordComponent,
    ResetPasswordComponent,
    AccountConfirmationComponent
  ],
  exports: [
    AuthBaseComponent,
    LoginComponent,
    UserRegistrationComponent,
    ForgetPasswordComponent,
    ResetPasswordComponent
  ],
  providers: [
    AuthenticationService,
    UserService,
    EnableToLogin,
    {
      provide: AuthServiceConfig,
      useFactory: getGoogleClientCredentials
    },
    UserExistsValidator,
    isLoggedGuard,
    EnableToConfirm
  ]
})
export class LoginModule { }
