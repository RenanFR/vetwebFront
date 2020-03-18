import { Injectable } from "@angular/core";
import * as jtw_decode from 'jwt-decode';
import { BehaviorSubject } from "rxjs";
import { UserToken } from '../../login/models/user.token';
import { UsefulConstants } from '../utilities/useful.constants';

@Injectable()
export class TokenService {

    constructor(){
        if (this.isTokenSet()) {
            this.decodeNotifyUser();
        }
    }

    private userSubject = new BehaviorSubject<UserToken>(null);

    storeToken(token: string): void {
        window.localStorage.setItem('token', token);
        this.decodeNotifyUser();
    }

    getUser() {
        return this.userSubject.asObservable();
    }

    removeToken(): void {
        window.localStorage.removeItem('token');
        window.localStorage.removeItem('currentUser');
    }

    isTokenSet(): boolean {
        return !!this.getToken();
    }

    getToken(): string {
        return window.localStorage.getItem('token');
    }

    decodeNotifyUser(): void {
        let token = this.getToken();
        let user = jtw_decode(token.replace(UsefulConstants.TOKEN_PREFIX, '')) as UserToken;
        window.localStorage.setItem('currentUser', JSON.stringify(user));
        this.userSubject.next(user);
    }      

}