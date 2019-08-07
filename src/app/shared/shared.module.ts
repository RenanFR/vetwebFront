import { NgModule, ErrorHandler } from "@angular/core";
import { MessageCardsModule } from "./messages/message.cards.module";
import { CommonModule } from "@angular/common";
import { KeysPipe } from "./pipes/keys.pipe";
import { HTTP_INTERCEPTORS } from "@angular/common/http";
import { ProgressLoaderService } from './services/progress.loader.service';
import { LoaderComponent } from './components/loader.component';
import { GlobalErrorHandler } from './global/global.error.handler';
import { NotificationComponent } from './components/notification.component';
import { TokenService } from './services/token.service';
import { RequestInterceptor } from './global/request.interceptor';
import { SettingsService } from './services/settings.service';

@NgModule({
    imports: [
        CommonModule,
        MessageCardsModule
    ],
    declarations:[
        KeysPipe,
        NotificationComponent,
        LoaderComponent
    ],
    exports:[
        MessageCardsModule,
        NotificationComponent,
        LoaderComponent,
        KeysPipe
    ],
    providers: [
        ProgressLoaderService,
        TokenService,
        SettingsService,
        {
            provide: ErrorHandler,
            useClass: GlobalErrorHandler
        },
        {
            provide: HTTP_INTERCEPTORS,
            useClass: RequestInterceptor,
            multi: true
        }
    ]
})
export class SharedModule {}