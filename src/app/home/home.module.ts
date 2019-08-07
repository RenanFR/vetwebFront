import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LayoutModule } from '../layout/layout.module';
import { HomeComponent } from './components/home.component';
import { HomeRoutingModule } from './home-routing.module';
import { LoginModule } from '../login/login.module';

@NgModule({
  imports: [
    CommonModule,
    LayoutModule,
    LoginModule,
    HomeRoutingModule
  ],
  declarations: [
    HomeComponent,
  ],
  exports: [
    HomeComponent
  ],
  providers: []
})
export class HomeModule { }
