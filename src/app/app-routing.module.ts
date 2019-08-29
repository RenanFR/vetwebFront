import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    redirectTo: 'auth/login',
  },
  { 
    path: 'auth/login',
    loadChildren: './login/login.module#LoginModule'
  },
  { 
    path: 'dashboard',
    loadChildren: './home/home.module#HomeModule'
  },
  { 
    path: 'animals/species/new',
    loadChildren: './animal/animal.module#AnimalModule'
  }
];

@NgModule({
  imports: [
      RouterModule.forRoot(routes, { enableTracing: false })
  ],
  exports: [
      RouterModule
  ]
})
export class AppRoutingModule { }
