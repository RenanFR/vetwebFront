import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { environment } from 'src/environments/environment';
import { Observable } from 'rxjs';
import { NewUserModel } from '../models/new.user.model';

const base:string = `${environment.WS_ADDRESS}/account`;

@Injectable()
export class UserService {
    
    constructor(private http: HttpClient) {}

    public signUpUser(account: NewUserModel): Observable<string> {
        return this.http.post(`${base}/signup`, account, { responseType: 'text' });
    }
    
}