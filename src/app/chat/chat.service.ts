import { Injectable } from '@angular/core';
import { Message } from './message';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Observable } from 'rxjs';

const base:string = `${environment.WS_ADDRESS}/chat`;

@Injectable({
  providedIn: 'root'
})
export class ChatService {

  constructor(private http: HttpClient) { }

  public send(message: Message): Observable<Message> {
    return this.http.post<Message>(base, message);
  }

  public messagesFromUser(user: string): Observable<Message[ ]> {
    return this.http.get<Message[ ]>(base + '/' + user);
  }

}
