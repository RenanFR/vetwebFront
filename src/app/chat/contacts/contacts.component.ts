import { Component, OnInit, Input, Output, EventEmitter, OnChanges, SimpleChanges } from '@angular/core';
import { Contact } from './contact';
import { UserToken } from 'src/app/login/models/user.token';
import { ChatService } from '../chat.service';
import { Message } from '../message';
import * as moment from 'moment';
import * as $ from 'jquery';

@Component({
  selector: 'vetweb-contacts',
  templateUrl: './contacts.component.html',
  styleUrls: ['../chat.component.css']
})
export class ContactsComponent implements OnInit, OnChanges {

  @Input() contacts: Contact[ ] = [ ];
  @Input() user: UserToken;
  @Output() changeContactEvent: EventEmitter<Contact> = new EventEmitter<Contact>();
  isSearching: boolean = false;
  searchTerm: string;

  constructor(
    private chatService: ChatService
  ) { }

  ngOnInit() {
    this.chatService.getSearching().subscribe((messages) => {
      this.searchTerm = localStorage.getItem('searchText');
      console.log('Searching for ' + this.searchTerm);
      console.log('Messages found with this term BELOW');
      console.log(messages);
      this.isSearching = true;
      let ids: string[ ] = messages.map(m => m._id);
      this.contacts = this.contacts.filter(c => {
        console.log('Checking for any founded messages in contact ' + c.user.userEmail);
        let hasOneOfTheFindMessages: boolean = false;
        let lastMessageWithSearchTermFromContact: Message = undefined;
        ids.forEach(messageId => {
          let messageWithSearchTerm: Message = c.messages.find(m => m._id === messageId);
          if (messageWithSearchTerm !== undefined) {
            if (lastMessageWithSearchTermFromContact === undefined || moment(messageWithSearchTerm.sentAt, "dd/MM/yyyy").isAfter(moment(lastMessageWithSearchTermFromContact.sentAt, "dd/MM/yyyy"))) {
              lastMessageWithSearchTermFromContact = messageWithSearchTerm;
              c.lastFoundedMessage = lastMessageWithSearchTermFromContact;
            }
            hasOneOfTheFindMessages = true;
          }
        });
        if (lastMessageWithSearchTermFromContact !== undefined) {
          console.log('Last message with term for this contact ' + lastMessageWithSearchTermFromContact._id);
        }
        return hasOneOfTheFindMessages;
      });
      $('.lastMessage').each(function() {
        var paragraph = $(this);
        var words = paragraph.text().split(' ');
        for (var i = 0; i <= words.length; i++) {
            if (words[i] === localStorage.getItem('searchText')) {
              var newWord = '<span style="background-color:yellow">' + words[i] + '</span>';
              paragraph.html(paragraph.text().replace(words[i], newWord));
            }
        }
      });
    });
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
