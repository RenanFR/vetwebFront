import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { TokenService } from 'src/app/shared/services/token.service';
import Swal from 'sweetalert2';
import { NewUserModel } from '../models/new.user.model';
import { UserToken } from '../models/user.token';
import { UserService } from '../services/user.service';
import { verifyPasswordConfirmationMatching } from '../validation/password.and.confirmation.dont.match';
import { UserExistsValidator } from '../validation/user.exists.validator';

@Component({
    templateUrl: './account.confirmation.component.html'
})
export class AccountConfirmationComponent implements OnInit {
    
    accountConfirmationForm: FormGroup;

    private userToRegister: NewUserModel = new NewUserModel();

    user: UserToken = JSON.parse(localStorage.getItem('currentUser')) as UserToken;

    constructor(
        private router: Router,
        private accountConfirmationFormBuilder: FormBuilder,
        private userExistsValidator: UserExistsValidator,
        private service: UserService,
        private route: ActivatedRoute,
        private tokenService: TokenService
    ) { }

    ngOnInit(): void {
        document.body.classList.add('bg-dark');
        let userId = this.route.snapshot.params.userId;
        let userEmail = this.user.userEmail;
        this.accountConfirmationForm = this.accountConfirmationFormBuilder.group({
            userMail: [ userEmail, [ Validators.required ] ],
            confirmationCode: [ '', [ Validators.required ], [ this.userExistsValidator.checkConfirmationCode(userId) ]],
            temporaryPassword: [ '', [ Validators.required ], [ this.userExistsValidator.checkTemporaryPassword(userId) ]],
            password: [ '', [ Validators.required ] ],
            passwordConfirmation: [ '', [ Validators.required ] ]
        }, {    
            validator: verifyPasswordConfirmationMatching
        });
    }

    onConfirm(): void {
        this.userToRegister = this.accountConfirmationForm.getRawValue() as NewUserModel;
        this.service
            .confirmAccount(this.userToRegister)
            .subscribe((response) => {
                if (response) {
                this.tokenService.removeToken();
                this.router.navigate(['/auth', 'login']);
                Swal.fire('Conta confirmada',
                    'Sua conta foi confirmada com sucesso, por favor autentique utilizando sua nova senha escolhida',
                    'success');                
            }
        },
        (error) => {
            Swal.fire('Erro na confirmação',
                'Falha na confirmação da conta, verifique se o código de confirmação não expirou',
                'error');            
        });
    }
    
}