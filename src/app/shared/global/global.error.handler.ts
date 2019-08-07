import { Injectable, ErrorHandler } from '@angular/core';
import { HttpErrorResponse } from '@angular/common/http';

@Injectable()
export class GlobalErrorHandler implements ErrorHandler {

    constructor(
        // private tokenService:TokenService,
        // private router:Router
    ){}

    handleError(errorResponse: Error | HttpErrorResponse) {
        // if (errorResponse instanceof HttpErrorResponse) {
        //     console.log(errorResponse.error.message);
        //     if (errorResponse.error.exception === 'io.jsonwebtoken.ExpiredJwtException') {
        //         this.tokenService.removeToken();
        //         this.router.navigate(['']);
        //     }
        // }
        console.log(errorResponse);
    }

}