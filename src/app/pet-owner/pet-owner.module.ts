import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LayoutModule } from '../layout/layout.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { SharedModule } from '../shared/shared.module';
import { TranslateModule } from '@ngx-translate/core';
import { HttpClientModule } from '@angular/common/http';
import { PetOwnerRoutingModule } from './pet-owner-routing.module';
import { NewPetOwnerComponent } from './new.pet.owner.component';
import { PetOwnerBaseComponent } from './pet-owner.base.component';
import { AngularValidateBrLibModule } from 'angular-validate-br';
import {NgxMaskModule, IConfig} from 'ngx-mask';
import { AddressValidator } from './validation/address.validator';

export const options: Partial<IConfig> | (() => Partial<IConfig>) = {}

@NgModule({
  imports: [
    CommonModule,
    RouterModule,
    LayoutModule,
    SharedModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    TranslateModule,
    AngularValidateBrLibModule,
    NgxMaskModule.forRoot(options),
    PetOwnerRoutingModule
  ],
  declarations: [
    PetOwnerBaseComponent,
    NewPetOwnerComponent
  ],
  exports: [
    PetOwnerBaseComponent,
    NewPetOwnerComponent
  ],
  providers: [
    AddressValidator
  ]
})
export class PetOwnerModule { }
