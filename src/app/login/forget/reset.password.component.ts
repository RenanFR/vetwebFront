import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';
import { UserExistsValidator } from '../validation/user.exists.validator';
import { UserService } from '../services/user.service';
import { Router, ActivatedRoute } from '@angular/router';
import { UserInfo } from '../models/user.info';
import { NewUserModel } from '../models/new.user.model';
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
    
    @ViewChild('modalSuccess') modalButton: ElementRef<HTMLButtonElement>;
    
    constructor(
        private resetPassFormBuilder: FormBuilder,
        private service: UserService,
        private activatedRoute: ActivatedRoute,
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
        this.service.findUserByRecoveryHash(this.recoveryHash).subscribe((foundedUser) => {
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

    private onConfirm(): void {
        this.service.updateUser(this.user).subscribe((responseText) => {
            this.confirmed = true;
            console.log(this.user);
            this.modalButton.nativeElement.click();
        },
        (shitHappened) => {
            console.log(shitHappened);
        });        
    }
    
}