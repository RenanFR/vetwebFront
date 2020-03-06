import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LayoutModule } from '../layout/layout.module';
import { LoginModule } from '../login/login.module';
import { RouterModule } from '@angular/router';
import { SharedModule } from '../shared/shared.module';
import { TranslateModule } from '@ngx-translate/core';
import { HttpClientModule } from '@angular/common/http';
import { ChatComponent } from './chat.component';
import { ChatRoutingModule } from './chat-routing.module';
import { ContactsComponent } from './contacts/contacts.component';
import { SearchMessageComponent } from './search-message/search-message.component';

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
  ],
  declarations: [
    ChatComponent,
    ContactsComponent,
    SearchMessageComponent
  ],
  exports: [
    ChatComponent
  ],
  providers: [
  ]
})
export class ChatModule { }
