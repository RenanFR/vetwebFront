import { Injectable } from "@angular/core";
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot } from "@angular/router";
import { Observable } from "rxjs";
import { TokenService } from '../../shared/services/token.service';
import { UserToken } from '../models/user.token';

@Injectable()
export class isLoggedGuard implements CanActivate {

    constructor(
        private tokenService: TokenService,
        private router: Router
    ){ }

    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean | Observable<boolean> | Promise<boolean> {
        if (this.tokenService.isTokenSet()) {
            let user: UserToken = JSON.parse(localStorage.getItem('currentUser')) as UserToken;
            if (user.usingTempPassword) {
                this.router.navigate(['/auth', 'confirm-account', user.id]);        
                return false;
            } else {
                return true;
            }
        } else {
            this.router.navigate(['/auth', 'login']);
            return false;
        }
    }
}