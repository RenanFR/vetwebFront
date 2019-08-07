import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthBaseComponent } from './layout/auth.base.component';
import { LoginComponent } from './main/login.component';
import { EnableToLogin } from './utilities/enable.to.login';
import { UserRegistrationComponent } from './registration/user.registration.component';

const routes: Routes = [
  {
    path: 'auth',
    component: AuthBaseComponent,
    canActivate: [ EnableToLogin ],
    data: {
      title: 'Authentication'
    },
    children: [
      {
        path: 'login', 
        component: LoginComponent
      },
      {
        path: 'register-user', 
        component: UserRegistrationComponent
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
