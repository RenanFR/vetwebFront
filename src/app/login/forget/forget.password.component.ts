import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';
import { UserExistsValidator } from '../validation/user.exists.validator';
import { UserService } from '../services/user.service';
import { Router } from '@angular/router';
import { UserInfo } from '../models/user.info';

@Component({
    templateUrl: './forget.password.component.html'
})
export class ForgetPasswordComponent implements OnInit {
    
    forgetPassForm: FormGroup;
    forgotUser: string;
    alreadySent: boolean;
    @ViewChild('modalSuccess') modalButton: ElementRef<HTMLButtonElement>;
    
    constructor(
        private router: Router,
        private forgetPassFormBuilder: FormBuilder,
        private userExistsValidator: UserExistsValidator,
        private service: UserService
    ) { }

    ngOnInit(): void {
        document.body.classList.add('bg-dark');
        this.alreadySent = false;
        this.forgetPassForm = this.forgetPassFormBuilder.group({
            userMail: [ '', [ Validators.required ], [ this.userExistsValidator.checkEmailIsTaken(), this.userExistsValidator.preventRepeatedRequest() ] ]
        });
    }

    private onSendEmail(): void {
        this.forgotUser = this.forgetPassForm.get('userMail').value;
        this.service.sendForgetEmail(this.forgotUser).subscribe((responseText) => {
            this.alreadySent = true;
            this.modalButton.nativeElement.click();
        },
        (shitHappened) => {
            this.alreadySent = false;
            console.log(shitHappened);
        });
    }
    
}