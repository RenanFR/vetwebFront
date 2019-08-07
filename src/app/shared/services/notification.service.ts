import { Injectable } from "@angular/core";
import { BehaviorSubject } from "rxjs";
import { Router, NavigationStart } from "@angular/router";
import { AlertType, Notification } from '../models/notification';

@Injectable({ providedIn: 'root'})
export class NotificationService {

    private notifyHub: BehaviorSubject<Notification> = new BehaviorSubject<Notification>(null);
    private persistent: boolean = false;
    
    constructor(
        private router: Router
    ){
        router.events.subscribe((event) => {
            if (event instanceof NavigationStart) {
                console.log('Route changed, is persistent alert: ' + this.persistent);
                if (this.persistent) {
                    console.log('Setting persist message to false');
                    this.persistent = false;
                } else {
                    console.log('Calling reset to notifications');
                    this.reset();
                }
            }
        })
    }

    public success(message: string, isPersistent: boolean = false) {
        console.log('Including success alert');
        console.log(message);
        this.notify(AlertType.SUCCESS, message, isPersistent);
    }

    public warning(message: string, isPersistent: boolean = false) {
        console.log('Including warning alert');
        console.log(message);
        this.notify(AlertType.WARNING, message, isPersistent);
    }
    
    public info(message: string, isPersistent: boolean = false) {
        console.log('Including information alert');
        console.log(message);
        this.notify(AlertType.INFO, message, isPersistent);
    }
    
    public error(message: string, isPersistent: boolean = false) {
        console.log('Including error alert');
        console.log(message);
        this.notify(AlertType.ERROR, message, isPersistent);
    }  
    
    public notify(alertType: AlertType, msg: string, isPersistent: boolean): void {
        this.persistent = isPersistent;
        this.notifyHub.next(new Notification(alertType, msg));
    }

    public reset(): void {
        this.notifyHub.next(null);
    }

    public notifications() {
        return this.notifyHub.asObservable();
    }

}