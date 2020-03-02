import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { isLoggedGuard } from '../login/utilities/is.logged.guard';
import { PetOwnerBaseComponent } from './pet-owner.base.component';
import { NewPetOwnerComponent } from './new.pet.owner.component';

const routes: Routes = [
  {
      path: 'owners',
      component: PetOwnerBaseComponent,
      canActivate: [ isLoggedGuard ],
      data: {
          title: 'New pet owner'
      },
      children: [
        {
          path: 'new', 
          component: NewPetOwnerComponent
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
export class PetOwnerRoutingModule { }
