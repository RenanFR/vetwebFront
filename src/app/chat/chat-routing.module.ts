import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { isLoggedGuard } from '../login/utilities/is.logged.guard';
import { ChatComponent } from './chat.component';

const routes: Routes = [
  {
      path: 'chat',
      component: ChatComponent,
      canActivate: [  ],
      data: {
          title: 'Bate-papo'
      }
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
export class ChatRoutingModule { }
