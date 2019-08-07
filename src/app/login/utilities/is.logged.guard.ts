import { CanActivate, Router } from "@angular/router";
import { ActivatedRouteSnapshot } from "@angular/router";
import { RouterStateSnapshot } from "@angular/router";
import { Observable } from "rxjs";
import { Injectable } from "@angular/core";
import { TokenService } from '../../shared/services/token.service';

@Injectable()
export class isLoggedGuard implements CanActivate {

    constructor(
        private tokenService: TokenService,
        private router: Router
    ){ }

    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean | Observable<boolean> | Promise<boolean> {
        if (this.tokenService.isTokenSet()) {
            return true;
        } else {
            this.router.navigate(['/auth/login']);
            return false;
        }
    }
}