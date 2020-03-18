import { HttpClient, HttpParams } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from 'rxjs';
import { Contact } from 'src/app/chat/contacts/contact';
import { environment } from 'src/environments/environment';
import { NewUserModel } from '../models/new.user.model';
import { User } from '../models/user';

const base:string = `${environment.WS_ADDRESS}/account`;

@Injectable()
export class UserService {
    
    constructor(private http: HttpClient) {}

    public signUpUser(account: NewUserModel): Observable<string> {
        return this.http.post(`${base}/signup`, account, { responseType: 'text' });
    }

    public sendForgetEmail(email: string): Observable<string> {
        return this.http.post<string>(`${base}/forget`, email);
    }

    public checkIfUserHasAlreadyRequestedANewPassword(email: string): Observable<Boolean> {
        return this.http.get<Boolean>(`${base}/has-valid-hash/${email}`);
    }

    public updateUser(account: NewUserModel): Observable<string> {
        return this.http.put(`${base}/update`, account, { responseType: 'text' });
    }

    public findUserByRecoveryHash(email: string): Observable<string> {
        return this.http.get(`${base}/using-hash/${email}`, { responseType: 'text' });
    }
    
    public allContacts(currentUser: string): Observable<Contact[ ]> {
        let httpParams = new HttpParams().set('currentUser', currentUser);
        return this.http.get<Contact[ ]>(`${base}/contacts`, { params: httpParams});
    }

    public findUser(userId: number): Observable<User> {
        return this.http.get<User>(`${base}/${userId}`);
    }

    public confirmAccount(account: NewUserModel): Observable<boolean> {
        return this.http.put<boolean>(`${base}/confirm`, account);
    }

    public checkConfirmationCode(userId: number, confirmationCode: string): Observable<Boolean> {
        let httpParams = new HttpParams().set('userId', userId.toString());
        return this.http.post<Boolean>(`${base}/check-code`, confirmationCode, { params: httpParams});
    }

    public checkTemporaryPassword(userId: number, tempPassword: string): Observable<Boolean> {
        let httpParams = new HttpParams().set('userId', userId.toString());
        return this.http.post<Boolean>(`${base}/check-temp`, tempPassword, { params: httpParams});
    }

}