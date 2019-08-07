import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './components/home.component';
import { isLoggedGuard } from '../login/utilities/is.logged.guard';

const routes: Routes = [
  {
      path: 'dashboard',
      component: HomeComponent,
      canActivate: [ isLoggedGuard ],
      data: {
          title: 'Dashboard'
      }
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
export class HomeRoutingModule { }
