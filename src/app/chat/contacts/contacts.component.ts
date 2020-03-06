import { Component, OnInit, Input, Output, EventEmitter, OnChanges, SimpleChanges } from '@angular/core';
import { Contact } from './contact';
import { UserToken } from 'src/app/login/models/user.token';

@Component({
  selector: 'vetweb-contacts',
  templateUrl: './contacts.component.html',
  styleUrls: ['../chat.component.css']
})
export class ContactsComponent implements OnInit, OnChanges {

  @Input() contacts: Contact[ ] = [ ];
  @Input() user: UserToken;
  @Output() changeContactEvent: EventEmitter<Contact> = new EventEmitter<Contact>();

  constructor() { }

  ngOnInit() {
  }
  
  ngOnChanges(changes: SimpleChanges): void {
    if (changes.contacts) {
      console.log('Contact list changed');
    }
  }  

  public selectUser(contact: Contact): void {
    this.changeContactEvent.emit(contact);
  }

  public hasMessagesForMe(contact: Contact): boolean {
    return contact.messages.find(m => m.idSender === this.user.id || m.idReceiver === this.user.id) !== undefined;
  }

}
