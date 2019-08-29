import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LayoutModule } from '../layout/layout.module';
import { LoginModule } from '../login/login.module';
import { SpeciesRegistrationComponent } from './species/species.registration.component';
import { AnimalRoutingModule } from './animal-routing.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AnimalBaseComponent } from './animal.base.component';
import { RouterModule } from '@angular/router';
import { SharedModule } from '../shared/shared.module';
import { TranslateModule } from '@ngx-translate/core';
import { HttpClientModule } from '@angular/common/http';
import { SpeciesService } from './services/species.service';

@NgModule({
  imports: [
    CommonModule,
    RouterModule,
    LayoutModule,
    SharedModule,
    LoginModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    AnimalRoutingModule,
    TranslateModule
  ],
  declarations: [
    AnimalBaseComponent,
    SpeciesRegistrationComponent
  ],
  exports: [
    AnimalBaseComponent,
    SpeciesRegistrationComponent
  ],
  providers: [
    SpeciesService
  ]
})
export class AnimalModule { }
