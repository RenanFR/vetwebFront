import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { ModalComponent } from 'src/app/layout/modal/modal.component';
import Swal from 'sweetalert2';
import { NewUserModel } from '../models/new.user.model';
import { UserService } from '../services/user.service';
import { verifyNewPasswordConfirmationMatching } from '../validation/password.and.confirmation.dont.match';

@Component({
    templateUrl: './reset.password.component.html'
})
export class ResetPasswordComponent implements OnInit {
    
    resetPassForm: FormGroup;

    confirmed: boolean;

    recoveryHash: string;

    user: NewUserModel = new NewUserModel();

    expiredOrInvalid: boolean = false;
    
    @ViewChild('vetwebModal') modal: ModalComponent;
    
    constructor(
        private resetPassFormBuilder: FormBuilder,
        private service: UserService,
        private activatedRoute: ActivatedRoute
    ) { }

    ngOnInit(): void {
        document.body.classList.add('bg-dark');
        this.confirmed = false;
        this.recoveryHash = this.activatedRoute.snapshot.params.recoveryHash;
        this.resetPassForm = this.resetPassFormBuilder.group({
            newPassword: [ '', [ Validators.required, Validators.minLength(6), Validators.maxLength(8) ], [ ] ],
            newPasswordConfirm: [ '', [ Validators.required ], [ ] ]
        }, {
            validator: verifyNewPasswordConfirmationMatching
        });
        this.service
            .findUserByRecoveryHash(this.recoveryHash)
            .subscribe((foundedUser) => {
                if (foundedUser !== null) {
                    let converted: any = JSON.parse(foundedUser);
                    this.user.id = converted.id;
                    this.user.userName = converted.username;
                    this.user.userMail = converted.email;
                    this.user.useTwoFactorAuth = converted.using2FA;
                    this.user.isSocialLogin = converted.socialLogin;
                } else {
                    this.expiredOrInvalid = true;
                }
            });
    }

    onConfirm(): void {
        this.service
            .updateUser(this.user)
            .subscribe((responseText) => {
                this.confirmed = true;
                this.modal.open();
            },
            (error) => {
                Swal.fire('Erro na redefinição',
                    'Não foi possível redefinir sua senha',
                    'error');              
            });        
    }
    
}