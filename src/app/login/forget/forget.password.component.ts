import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';
import { UserExistsValidator } from '../validation/user.exists.validator';
import { UserService } from '../services/user.service';
import { ModalComponent } from 'src/app/layout/modal/modal.component';

@Component({
    templateUrl: './forget.password.component.html'
})
export class ForgetPasswordComponent implements OnInit {
    
    forgetPassForm: FormGroup;
    forgotUser: string;
    alreadySent: boolean;
    error: boolean;
    @ViewChild('vetwebModal') modal: ModalComponent;
    
    constructor(
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
        this.service.sendForgetEmail(this.forgotUser).subscribe((response) => {
            this.alreadySent = true;
            this.error = false;
            this.modal.open();
        },
        (shitHappened) => {
            this.error = true;
            this.alreadySent = false;
            this.modal.open();
        });
    }
    
}