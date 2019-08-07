export class Notification {

    constructor(public readonly alertType: AlertType, public readonly message: string) {
        
    }

}
export enum AlertType {
    SUCCESS,
    INFO,
    ERROR,
    WARNING
}