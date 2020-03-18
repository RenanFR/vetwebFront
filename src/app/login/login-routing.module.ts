import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthBaseComponent } from './layout/auth.base.component';
import { LoginComponent } from './main/login.component';
import { EnableToLogin } from './utilities/enable.to.login';
import { UserRegistrationComponent } from './registration/user.registration.component';
import { ForgetPasswordComponent } from './forget/forget.password.component';
import { ResetPasswordComponent } from './forget/reset.password.component';
import { AccountConfirmationComponent } from './confirmation/account.confirmation.component';
import { EnableToConfirm } from './utilities/enable.to.confirm';

const routes: Routes = [
  {
    path: 'auth',
    component: AuthBaseComponent,
    data: {
      title: 'Authentication'
    },
    children: [
      {
        path: 'login', 
        component: LoginComponent,
        canActivate: [ EnableToLogin ]
      },
      {
        path: 'register-user', 
        component: UserRegistrationComponent,
        canActivate: [ EnableToLogin ]
      },
      {
        path: 'forget', 
        component: ForgetPasswordComponent,
        canActivate: [ EnableToLogin ]
      },
      {
        path: 'reset/:recoveryHash', 
        component: ResetPasswordComponent,
        canActivate: [ EnableToLogin ]
      },
      {
        path: 'confirm-account/:userId', 
        component: AccountConfirmationComponent, 
        canActivate: [ EnableToConfirm ]
      }
    ]
  }
];

@NgModule({
  imports: [
      RouterModule.forChild(routes)
  ],
  exports: [
      RouterModule
  ]
})
export class LoginRoutingModule { }
