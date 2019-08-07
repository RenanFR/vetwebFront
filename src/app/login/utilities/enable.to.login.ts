import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from "@angular/router";
import { Observable } from "rxjs";
import { Injectable } from "@angular/core";
import { TokenService } from '../../shared/services/token.service';

@Injectable()
export class EnableToLogin implements CanActivate{

    constructor(
        private router: Router,
        private tokenService: TokenService 
    ){}

    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): 
        boolean | Observable<boolean> | Promise<boolean> {
        if (this.tokenService.isTokenSet()) {
            this.router.navigate(['dashboard']);
            return false;
        }
        return true;
    }

}