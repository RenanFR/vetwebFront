import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';
import { NewUserModel } from '../models/new.user.model';
import { UserService } from '../services/user.service';
import { UserExistsValidator } from '../validation/user.exists.validator';

@Component({
    templateUrl: './user.registration.component.html'
})
export class UserRegistrationComponent implements OnInit {
    
    newUserForm: FormGroup;

    private userToRegister: NewUserModel = new NewUserModel();
    
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
            useTwoFactorAuth: [ false, [] ],
            termsAcceptance: [ false, [ Validators.requiredTrue ] ],
            isSocialLogin: [ false, [] ],
        }, {
        });
    }

    onSave(): void {
        this.userToRegister = this.newUserForm.getRawValue() as NewUserModel;
        this.service
            .signUpUser(this.userToRegister)
            .subscribe((responseText) => {
                this.router.navigate(['/auth', 'login']);
                Swal.fire(document.getElementById('successMessageLabel').innerText,
                    document.getElementById('successMessageText').innerText,
                    'success');
            },
            (error) => {
                Swal.fire(document.getElementById('errorMessageLabel').innerText,
                    document.getElementById('errorMessageText').innerText,
                    'error');
            });
    }
    
}