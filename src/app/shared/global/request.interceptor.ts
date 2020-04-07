import { HttpEvent, HttpHandler, HttpHeaders, HttpInterceptor, HttpRequest } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Router } from '@angular/router';
import { Observable, throwError } from "rxjs";
import { catchError } from 'rxjs/operators';
import { TokenService } from '../services/token.service';

export const INTERCEPTOR_SKIP_HEADER = 'X-Skip-Interceptor';

@Injectable()
export class RequestInterceptor implements HttpInterceptor {

    headers: HttpHeaders = new HttpHeaders();

    constructor(
        private router: Router,
        private tokenService: TokenService
    ){}

    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        let hasSkipHeader: boolean = req.headers.has(INTERCEPTOR_SKIP_HEADER);
        if (this.tokenService.isTokenSet() && !hasSkipHeader) {
            const token = this.tokenService.getToken();
            this.headers = this.headers.set('Authorization', token);
            req = req.clone({
                headers: this.headers
            });
        } else if (hasSkipHeader) {
            this.headers = req.headers.delete(INTERCEPTOR_SKIP_HEADER);
            req = req.clone({
                headers: this.headers
            });
        }
        return next
            .handle(req)
            .pipe(catchError(e => {
                if (e.error.status === 401 && e.error.errorMessage === 'Your Token has expired') {
                    this.tokenService.removeToken();
                    this.router.navigate(['/']);
                }
                throw e;
            }));
    }

}