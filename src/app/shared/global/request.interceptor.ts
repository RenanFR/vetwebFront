import { Injectable } from "@angular/core";
import { HttpInterceptor, HttpEvent, HttpHandler, HttpRequest, HttpEventType, HttpHeaders } from "@angular/common/http";
import { Observable } from "rxjs";
import { TokenService } from '../services/token.service';

export const INTERCEPTOR_SKIP_HEADER = 'X-Skip-Interceptor';

@Injectable()
export class RequestInterceptor implements HttpInterceptor {

    headers: HttpHeaders = new HttpHeaders();

    constructor(
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
            .handle(req);
    }

}