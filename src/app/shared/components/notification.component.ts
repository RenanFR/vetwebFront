import { Component, Input, ChangeDetectorRef, NgZone, OnDestroy, OnInit, ChangeDetectionStrategy, ApplicationRef } from "@angular/core";
import { Notification, AlertType } from "../models/notification";
import { NotificationService } from "../services/notification.service";

@Component({
    selector: 'opinionated-notification',
    templateUrl: '../templates/notification.component.html',
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class NotificationComponent implements OnInit {
    
    @Input() timeToEase: number = 6000;
    
    public notifications: Notification[ ] = [ ];

    public testMessage: string = 'Default text';
    
    constructor(
        private notificationService: NotificationService,
        private changeDetector: ChangeDetectorRef
    ){  }
        
    ngOnInit(): void {
        this.notificationService
        .notifications()
        .subscribe((alert) => {
            this.testMessage = 'Service updated the text';
            if (!alert) {
                console.log('Null alert arrived to reset notifications');
                this.notifications = [ ];
                return;
            }
            console.log('Including new alert');
            this.notifications = this.notifications.concat(alert);
            console.log('Number of notifications ' + (this.notifications.length));
            setTimeout(() => this.cancelAlert(alert), this.timeToEase);
        }, (e) => {
            console.log(e);
            this.testMessage = 'Error on subscribe';
        });
    }

    private cancelAlert(notification: Notification): void {
        console.log('Current number of notifications ' + (this.notifications.length));
        this.updateNotifications(notification);
        console.log('Removing alerts, notification is now with length ' + this.notifications.length);
    }

    public getNotificationStyle(alert: Notification): string {
        if (!alert) return "";
        switch(alert.alertType) {
            case AlertType.ERROR:
                return "alert alert-danger";
            case AlertType.INFO:
                return "alert alert-info";
            case AlertType.SUCCESS:
                return "alert alert-success";
            case AlertType.WARNING:
                return "alert alert-warning";

        }
    }

    public updateNotifications(notif: Notification): void {
        this.notifications = this.notifications.filter((not) => not != notif);
        console.log(`Forcing update of the notifications list, is empty? ${this.isEmptyAlerts()}`);
        this.changeDetector.markForCheck();
    }

    public updateView(): void {
        this.testMessage = 'Text updated by function';
    }

    public isEmptyAlerts(): boolean {
        console.log('Checking number of notifications');
        return this.notifications.length === 0;
    }

}