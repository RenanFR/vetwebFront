import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { isLoggedGuard } from '../login/utilities/is.logged.guard';
import { SpeciesRegistrationComponent } from './species/species.registration.component';
import { AnimalBaseComponent } from './animal.base.component';

const routes: Routes = [
  {
      path: 'animals',
      component: AnimalBaseComponent,
      canActivate: [ isLoggedGuard ],
      data: {
          title: 'New animal species'
      },
      children: [
        {
          path: 'species/new', 
          component: SpeciesRegistrationComponent
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
export class AnimalRoutingModule { }
