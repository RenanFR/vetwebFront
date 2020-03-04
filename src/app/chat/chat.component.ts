import { Component, OnInit, ViewChild, ElementRef, ChangeDetectorRef } from '@angular/core';
import { Message } from './message';
import { ChatService } from './chat.service';
import { WebSocketAPI } from './websocket-api';
import { TokenService } from '../shared/services/token.service';
import { UserToken } from '../login/models/user.token';
import { Contact } from './contacts/contact';
import { UserService } from '../login/services/user.service';

@Component({
    templateUrl: './chat.component.html',
    styleUrls: ['./chat.component.css']
})
export class ChatComponent implements OnInit {
    
    messages: Message[ ] = [];
    webSocketAPI: WebSocketAPI;
    user: UserToken;
    contacts: Contact[ ];
    selectedContact: Contact;

    @ViewChild('msgInput') msgInput: ElementRef<HTMLInputElement>;

    constructor(
        private tokenService: TokenService,
        private changeDetectorRef: ChangeDetectorRef,
        private userService: UserService,
        private chatService: ChatService
    ) { }
    
    ngOnInit(): void {
        this.webSocketAPI = new WebSocketAPI(this);
        this.tokenService.getUser().subscribe((user) => {
            this.user = user;
            this.userService.allContacts(user.userEmail).subscribe((contacts) => {
                this.contacts = contacts;
                this.selectedContact = contacts.filter((contact) => contact.mostRecentContact)[0];
                this.messages = contacts.filter((contact) => contact.mostRecentContact)[0].messages;
                this.messages.forEach((msg) => this.setType(msg));
                this.connect(this.user.id);
            });
        });
    }

    connect(userTopic: number): void {
        this.webSocketAPI.connect(userTopic);
    }

    disconnect(): void {
        this.webSocketAPI.disconnect();
    }

    send(): void {
        let message: string = this.msgInput.nativeElement.value;
        let msg: Message = new Message();
        msg.sender = this.user.userEmail;
        msg.idSender = this.user.id;
        msg.text = message;
        msg.receiver = this.selectedContact.user.userEmail;
        msg.idReceiver = this.selectedContact.user.id;
        this.setType(msg);
        this.chatService.send(msg).subscribe((r) => {
            this.messages.push(r);
            this.msgInput.nativeElement.value = '';
        });
    }
    
    receive(message: Message): void {
        let msg: Message = message as Message;
        this.setType(msg);
        this.messages.push(msg);
        this.changeDetectorRef.detectChanges();
    }

    private setType(msg: Message): void {
        msg.type = msg.sender === this.user.userEmail? 'SENT' : 'RECEIVED';
    }

}