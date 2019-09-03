import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { isLoggedGuard } from '../login/utilities/is.logged.guard';
import { SpeciesRegistrationComponent } from './species/species.registration.component';
import { AnimalBaseComponent } from './animal.base.component';
import { SpeciesDetailsComponent } from './species/species.details.component';
import { SpeciesListComponent } from './species/species.list.component';

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
        },
        {
          path: 'species/:speciesId', 
          component: SpeciesDetailsComponent
        },
        {
          path: 'species', 
          component: SpeciesListComponent
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
