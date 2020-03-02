import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { tap } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { Observable } from 'rxjs';
import { GoogleLoginProvider, AuthService } from 'angularx-social-login';
import { TokenService } from '../../shared/services/token.service';
import { UserInfo } from '../models/user.info';

const base: string = `${environment.WS_ADDRESS}/account`;
const baseLogin: string = `${environment.WS_ADDRESS}/login`;

@Injectable()
export class AuthenticationService {
    
    constructor(
        private http: HttpClient,
        private tokenService: TokenService,
        private socialAuth: AuthService
    ) {}

    public login(user: UserInfo): Observable<any> {
        let email: string = user.email;
        let password: string = user.password;
        let authCode: string = user.authCode;
        return this
            .http
            .post(baseLogin, { email, password, authCode }, { observe: 'response' })
            .pipe(tap(response => {
                let token: string = response.headers.get('Authorization');
                this.tokenService.storeToken(token);
            }));
    }

    public checkNameIsTaken(name: string): Observable<boolean> {
        return this
            .http
            .get<boolean>(`${base}/exists/${name}`);
    }

    public doLoginWithGoogle(): void {
        let socialMedia = GoogleLoginProvider.PROVIDER_ID;
        this.socialAuth.signIn(socialMedia)
            .then((user) => {
                this.http.post<any>(`${base}/google`, user.idToken)
                    .subscribe((gmailUser) => {
                        let token = gmailUser.token;
                        this.tokenService.storeToken(token);
                        window.location.href = '/dashboard?redirectAfterAuth=true';
                    });
            });
    }

    public checkTFAIsEnabledForUser(user: string): Observable<boolean> {
        console.log(`Checking if user ${user} uses two factor authentication`)
        return this
            .http
            .get<boolean>(`${base}/uses-tfa/${user}`);        
    }    

}