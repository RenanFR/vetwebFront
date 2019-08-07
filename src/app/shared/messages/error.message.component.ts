import { Component, Input } from "@angular/core";

@Component({
    selector: 'vetweb-error',
    templateUrl: './error.message.component.html',
})
export class ErrorMessageComponent {

    @Input() errorMessage = '';

}