import { Component, OnInit, ElementRef, ViewChild, Input, QueryList, ViewChildren } from '@angular/core';
import { ChatService } from '../chat.service';
import { ChatConfiguration } from './chat.configuration';
import { WeekDay } from './week.day';
import { AvailabilityInputComponent } from './availability.input.component';
import Swal from 'sweetalert2';
import { finalize } from 'rxjs/operators';

@Component({
    selector: 'vetweb-chat-config',
    templateUrl: './chat.config.component.html'
})
export class ChatConfigComponent implements OnInit {

    @ViewChild('btnModal') modalButton: ElementRef<HTMLButtonElement>;
    @ViewChild('btnModalClose') modalButtonClose: ElementRef<HTMLButtonElement>;
    @ViewChildren('availabilityInputs') inputsAvailability: QueryList<AvailabilityInputComponent>;
    @Input() currentUser: string;
    chatConfiguration: ChatConfiguration;
    days: WeekDay[ ];
    daysChanged: WeekDay[ ] = [ ];
    automaticResponse: string;

    constructor(
        private chatService: ChatService
    ) { }
    
    ngOnInit(): void {
        this.chatService
            .getConfig(this.currentUser)
            .subscribe((chatConfiguration) => {
                this.chatConfiguration = chatConfiguration;
                this.days = [
                    this.chatConfiguration.automaticResponse.availability.sunday,
                    this.chatConfiguration.automaticResponse.availability.monday,
                    this.chatConfiguration.automaticResponse.availability.tuesday,
                    this.chatConfiguration.automaticResponse.availability.wednesday,
                    this.chatConfiguration.automaticResponse.availability.thursday,
                    this.chatConfiguration.automaticResponse.availability.friday,
                    this.chatConfiguration.automaticResponse.availability.saturday
                ];
                this.automaticResponse = this.chatConfiguration.automaticResponse.availability.text;
            });
    }

    update(): void {
        this
            .inputsAvailability
            .toArray()
            .forEach(input => {
                this.daysChanged.push(input.weekDay);
            });
        this.chatConfiguration.automaticResponse.availability.sunday = this.daysChanged[0];
        this.chatConfiguration.automaticResponse.availability.monday = this.daysChanged[1];
        this.chatConfiguration.automaticResponse.availability.tuesday = this.daysChanged[2];
        this.chatConfiguration.automaticResponse.availability.wednesday = this.daysChanged[3];
        this.chatConfiguration.automaticResponse.availability.thursday = this.daysChanged[4];
        this.chatConfiguration.automaticResponse.availability.friday = this.daysChanged[5];
        this.chatConfiguration.automaticResponse.availability.saturday = this.daysChanged[6];
        this.chatConfiguration.automaticResponse.availability.text = this.automaticResponse;
        this.chatService
            .saveConfig(this.chatConfiguration)
            .pipe(finalize(() => { this.closeSettings(); }))
            .subscribe(() => {
                Swal.fire('Configurações salvas',
                'Suas configurações foram alteradas e gravadas com sucesso',
                'success');
            });
    }

    public openSettings(): void {
        this.modalButton.nativeElement.click();
    }

    public closeSettings(): void {
        this.modalButtonClose.nativeElement.click();
    }

}