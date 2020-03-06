import { Component, OnInit, ViewChild, ElementRef, ChangeDetectorRef, OnDestroy, AfterViewInit } from '@angular/core';
import { Message } from './message';
import { ChatService } from './chat.service';
import { WebSocketAPI } from './websocket-api';
import { TokenService } from '../shared/services/token.service';
import { UserToken } from '../login/models/user.token';
import { Contact } from './contacts/contact';
import { UserService } from '../login/services/user.service';
import { ContactsComponent } from './contacts/contacts.component';

@Component({
    templateUrl: './chat.component.html',
    styleUrls: ['./chat.component.css']
})
export class ChatComponent implements OnInit, OnDestroy {

    messages: Message[ ] = [];
    webSocketAPI: WebSocketAPI;
    user: UserToken;
    contacts: Contact[ ];
    selectedContact: Contact;

    @ViewChild('msgInput') msgInput: ElementRef<HTMLInputElement>;
    @ViewChild(ContactsComponent) contactsComponent: ContactsComponent;

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
                this.filterMyMessages();
                this.connect(this.user.id);
            });
        });
    }

    ngOnDestroy(): void {
        this.disconnect();
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
        this.messages.push(msg);
        this.msgInput.nativeElement.value = '';
        this.chatService.send(msg).subscribe((r) => {
            msg.sentAt = r.sentAt;
            this.updateContactsView(r);
        });
    }

    private updateContactsView(msg: Message): void {
        this.contacts.forEach(c => {
            if (c.user.id === msg.idSender || c.user.id === msg.idReceiver) {
                c.messages.push(msg);
                if (c.user.id !== this.user.id) {
                    c.mostRecentContact = true;
                }
            } else {
                c.mostRecentContact = false;
            }
        });
    }
    
    receive(message: Message): void {
        let msg: Message = message as Message;
        this.setType(msg);
        this.messages.push(msg);
        this.updateContactsView(msg);
        if (msg.idSender !== this.selectedContact.user.id) {
            this.messages = this.messages.filter(m => m.idSender === msg.idSender && m.idReceiver === this.user.id);
            this.selectedContact = this.contacts.find(c => c.user.id === msg.idSender);
        }
        this.changeDetectorRef.detectChanges();
    }

    private setType(msg: Message): void {
        msg.type = msg.sender === this.user.userEmail? 'SENT' : 'RECEIVED';
    }

    public handleNewConversation(contactSelected: Contact): void {
        this.selectedContact = contactSelected;
        this.contacts.forEach((c) => c.mostRecentContact = false);
        this.selectedContact.mostRecentContact = true;
        this.messages = this.selectedContact.messages;
        this.messages.forEach((msg) => this.setType(msg));
        this.filterMyMessages();
    }

    private filterMyMessages(): void {
        this.messages = this.messages.filter((m) => m.idSender === this.user.id || m.idReceiver === this.user.id);
        this.contacts.forEach(c => {
            c.messages = c.messages.filter(m => m.idSender === this.user.id || m.idReceiver === this.user.id);
        });
    }

}