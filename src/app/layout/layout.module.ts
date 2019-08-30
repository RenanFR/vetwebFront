import { NgModule } from '@angular/core';
import { LeftPanelComponent } from './navigation/left.panel.component';
import { CommonModule } from '@angular/common';
import { FooterComponent } from './footer/footer.component';
import { HeaderComponent } from './header/header.component';
import { WidgetsComponent } from './widgets/widgets.component';
import { TrafficComponent } from './traffic/traffic.component';
import { OrdersComponent } from './orders/orders.component';
import { ToDoListComponent } from './todo/todo.list.component';
import { LiveChatComponent } from './chat/live.chat.component';
import { DeprecatedMarkupComponent } from './others/deprecated.markup.component';
import { LayoutComponent } from './main/layout.component';
import { RouterModule } from '@angular/router';
import { ModalComponent } from './modal/modal.component';
import { TranslateModule } from '@ngx-translate/core';

@NgModule({
  imports: [
    CommonModule,
    RouterModule,
    TranslateModule
  ],
  declarations: [
    LeftPanelComponent,
    FooterComponent,
    HeaderComponent,
    WidgetsComponent,
    TrafficComponent,
    OrdersComponent,
    ToDoListComponent,
    LiveChatComponent,
    DeprecatedMarkupComponent,
    LayoutComponent,
    ModalComponent
  ],
  exports: [
    LeftPanelComponent,
    FooterComponent,
    HeaderComponent,
    WidgetsComponent,
    TrafficComponent,
    OrdersComponent,
    ToDoListComponent,
    LiveChatComponent,
    DeprecatedMarkupComponent,
    LayoutComponent,
    ModalComponent
  ],
  providers: []
})
export class LayoutModule { }
