import { HttpErrorResponse } from '@angular/common/http';
import { ErrorHandler, Injectable, Injector } from '@angular/core';
import { Router } from '@angular/router';
import { TokenService } from '../services/token.service';

@Injectable()
export class GlobalErrorHandler implements ErrorHandler {

    private router: Router;
    private tokenService: TokenService;

    constructor(private injector: Injector){ }

    handleError(errorResponse: Error | HttpErrorResponse) {
        console.log('Tratamento global de erros da aplicação invocado');
        if (errorResponse instanceof HttpErrorResponse) {
            if (errorResponse.error.status === 401 && errorResponse.error.errorMessage === 'Your Token has expired') {
                this.router = this.injector.get(Router);
                this.tokenService = this.injector.get(TokenService);
                this.tokenService.removeToken();
                this.router
                    .navigate(['/auth', 'login'])
                    .then(() => {
                        location.reload();
                    });
            }
        }
    }

}