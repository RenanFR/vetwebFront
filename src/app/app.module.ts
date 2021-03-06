import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { CommonModule } from '@angular/common';
import { HomeModule } from './home/home.module';
import { LoginModule } from './login/login.module';
import { HttpClient } from '@angular/common/http';
import { TranslateModule, TranslateLoader } from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import { AnimalModule } from './animal/animal.module';
import { PetOwnerModule } from './pet-owner/pet-owner.module';
import { ChatModule } from './chat/chat.module';

export function HttpLoaderFactory(http: HttpClient) {

  return new TranslateHttpLoader(http, "./assets/i18n/", ".json");

}

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    HomeModule,
    LoginModule,
    AnimalModule,
    ChatModule,
    PetOwnerModule,
    AppRoutingModule,
    TranslateModule.forRoot({
        loader: {
            provide: TranslateLoader,
            useFactory: HttpLoaderFactory,
            deps: [ HttpClient ]
        }
    })
  ],
  providers: [ ],
  bootstrap: [AppComponent]
})
export class AppModule { }
