import { Injectable } from '@angular/core';
import { Message } from './message';
import { HttpClient, HttpParams } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Observable, Subject } from 'rxjs';

const base:string = `${environment.WS_ADDRESS}/chat`;

@Injectable({
  providedIn: 'root'
})
export class ChatService {

  searchingSubject: Subject<Message[ ]> = new Subject<Message[ ]>();

  constructor(private http: HttpClient) { }

  public send(message: Message): Observable<Message> {
    return this.http.post<Message>(base, message);
  }

  public messagesFromUser(user: string): Observable<Message[ ]> {
    return this.http.get<Message[ ]>(base + '/' + user);
  }
  
  public searchMessages(searchTerm: string): Observable<Message[ ]> {
    let httpParams = new HttpParams().set('searchTerm', searchTerm);
    return this.http.get<Message[ ]>(base + '/search', { params: httpParams});
  }

  public notifySearch(messages: Message[ ]): void {
    this.searchingSubject.next(messages);
  }

  public getSearching(): Observable<Message[ ]> {
    return this.searchingSubject.asObservable();
  }  

}
