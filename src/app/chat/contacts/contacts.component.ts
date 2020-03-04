import { Component, OnInit, Input } from '@angular/core';
import { Contact } from './contact';

@Component({
  selector: 'vetweb-contacts',
  templateUrl: './contacts.component.html',
  styleUrls: ['../chat.component.css']
})
export class ContactsComponent implements OnInit {

  @Input() contacts: Contact[ ] = [];

  constructor() { }

  ngOnInit() {
  }

}
