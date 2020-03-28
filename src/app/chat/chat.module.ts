import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { TranslateModule } from '@ngx-translate/core';
import { LayoutModule } from '../layout/layout.module';
import { LoginModule } from '../login/login.module';
import { SharedModule } from '../shared/shared.module';
import { ChatRoutingModule } from './chat-routing.module';
import { ChatComponent } from './chat.component';
import { AvailabilityInputComponent } from './config/availability.input.component';
import { ContactsComponent } from './contacts/contacts.component';
import { SearchMessageComponent } from './search-message/search-message.component';
import { ChatConfigComponent } from './config/chat.config.component';

@NgModule({
  imports: [
    CommonModule,
    RouterModule,
    LayoutModule,
    SharedModule,
    LoginModule,
    ChatRoutingModule,
    HttpClientModule,
    TranslateModule,
    ReactiveFormsModule,
    FormsModule
  ],
  declarations: [
    ChatComponent,
    ContactsComponent,
    SearchMessageComponent,
    ChatConfigComponent,
    AvailabilityInputComponent
  ],
  exports: [
    ChatComponent
  ],
  providers: [
  ]
})
export class ChatModule { }
