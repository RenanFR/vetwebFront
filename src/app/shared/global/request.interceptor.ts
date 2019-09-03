import { Injectable } from "@angular/core";
import { HttpInterceptor, HttpEvent, HttpHandler, HttpRequest, HttpEventType, HttpHeaders } from "@angular/common/http";
import { Observable } from "rxjs";
import { TokenService } from '../services/token.service';

@Injectable()
export class RequestInterceptor implements HttpInterceptor {

    headers: HttpHeaders = new HttpHeaders();;

    constructor(
        private tokenService: TokenService
    ){}

    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        if (this.tokenService.isTokenSet()) {
            const token = this.tokenService.getToken();
            this.headers = this.headers.set('Authorization', token);
            req = req.clone({
                headers: this.headers
            });
        }
        return next
            .handle(req);
    }

}