import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ChatService } from '../chat.service';

@Component({
  selector: 'vetweb-search-message',
  templateUrl: './search-message.component.html',
  styleUrls: ['../chat.component.css']
})
export class SearchMessageComponent implements OnInit {

  @ViewChild('searchInput') searchInput: ElementRef<HTMLInputElement>;
  
  searchForm: FormGroup;

  constructor(
    private builder: FormBuilder,
    private chatService: ChatService
  ) { }
  
  ngOnInit() {
    this.searchForm = this.builder.group({
      searchText: [ '', [ Validators.required ], [ ]]
    });
  }

  onSearch(): void {

    let searchTerm: string = this.searchForm.get('searchText').value;
    localStorage.setItem('searchText', searchTerm);
    this.chatService.searchMessages(searchTerm).subscribe(m => {
      this.chatService.notifySearch(m);
    });

  }

}
