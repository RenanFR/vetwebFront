import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from "@angular/router";
import { Observable } from "rxjs";
import { Injectable } from "@angular/core";
import { TokenService } from '../../shared/services/token.service';
import { UserToken } from '../models/user.token';

@Injectable()
export class EnableToConfirm implements CanActivate {

    constructor(
        private router: Router,
        private tokenService: TokenService 
    ){}

    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): 
        boolean | Observable<boolean> | Promise<boolean> {
            let user: UserToken = JSON.parse(localStorage.getItem('currentUser')) as UserToken;
        if (this.tokenService.isTokenSet()) {
            if (user.usingTempPassword) {
                return true;
            } else {
                this.router.navigate(['dashboard']);
                return false;                
            }
        } else {
            this.router.navigate(['/auth', 'login']);
        }
    }

}