import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';
import { NewUserModel } from '../models/new.user.model';
import { UserExistsValidator } from '../validation/user.exists.validator';
import { UserService } from '../services/user.service';
import { verifyPasswordConfirmationMatching } from '../validation/password.and.confirmation.dont.match';
import { Router } from '@angular/router';
import Swal from 'sweetalert2'

@Component({
    templateUrl: './user.registration.component.html'
})
export class UserRegistrationComponent implements OnInit {
    
    newUserForm: FormGroup;

    private userToRegister: NewUserModel = new NewUserModel();
    private isFacebookSupported: boolean = false;
    private isTwitterSupported: boolean = false;    
    
    constructor(
        private router: Router,
        private newUserFormBuilder: FormBuilder,
        private userExistsValidator: UserExistsValidator,
        private service: UserService
    ) { }

    ngOnInit(): void {
        document.body.classList.add('bg-dark');
        this.newUserForm = this.newUserFormBuilder.group({
            userMail: [ '', [ Validators.required ], [ this.userExistsValidator.checkEmailAvailability() ] ],
            userName: [ '', [] ],
            password: [ '', [] ],
            passwordConfirmation: [ '', [] ],
            useTwoFactorAuth: [ false, [] ],
            termsAcceptance: [ false, [ Validators.requiredTrue ] ],
            isSocialLogin: [ false, [] ],
        }, {
            validator: verifyPasswordConfirmationMatching
        });
    }

    private onSave(): void {
        this.userToRegister = this.newUserForm.getRawValue() as NewUserModel;
        this.service.signUpUser(this.userToRegister).subscribe((responseText) => {
            Swal.fire(document.getElementById('successMessageLabel').innerText,
            document.getElementById('successMessageText').innerText,
            'success');
        },
        (shitHappened) => {
            Swal.fire(document.getElementById('errorMessageLabel').innerText,
            document.getElementById('errorMessageText').innerText,
            'error');
        });
    }
    
}