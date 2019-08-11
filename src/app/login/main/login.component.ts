import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { AuthenticationService } from '../services/authentication.service';
import { PlatformRuntimeDetectorService } from 'src/app/shared/services/platform.runtime.detector.service';
import { UserExistsValidator } from '../validation/user.exists.validator';
import { NotificationService } from 'src/app/shared/services/notification.service';
import { userPasswordIsDifferent } from '../validation/user.password.is.different.validation';
import { UserInfo } from '../models/user.info';


@Component({
  selector: 'vetweb-login',
  templateUrl: './login.component.html'
})
export class LoginComponent implements OnInit {

  authForm: FormGroup;
    
  @ViewChild('nameInput') nameInput: ElementRef<HTMLInputElement>;

  private errorMessage: string = '';
  private isFacebookSupported: boolean = false;
  private isTwitterSupported: boolean = false;

  constructor(
    private authFormBuilder: FormBuilder,
    private authService: AuthenticationService,
    private platformDetector: PlatformRuntimeDetectorService,
    private userExistsValidator: UserExistsValidator,
    private notifier: NotificationService
  ) { }
  
  ngOnInit(): void {
    document.body.classList.add('bg-dark');
    this.authForm = this.authFormBuilder.group({
      email: [ '', [ Validators.required ], [ this.userExistsValidator.checkEmailIsTaken(), this.userExistsValidator.checkTFAIsEnabledForUser() ] ],
      password: [ '', Validators.required ],
      authCode: [ '', [ ], [ ] ]
    }, {
    validator: userPasswordIsDifferent
    });
  }

  private login(): void {
    let user: UserInfo = this.authForm.getRawValue() as UserInfo;
    this.authService
      .login(user)
      .subscribe(
        () => {
          this.notifier.info('User authenticated successfully', true);
          window.location.href = '/dashboard?redirectAfterAuth=true';
        },
        error => {
          console.log(error.status);
          this.errorMessage = 'Não foi possível autenticar, verifique seu usuário, senha ou o código 2FA';
          if (this.platformDetector.checkIfItRunningOnBrowser()) {
              this.nameInput.nativeElement.focus();
          }
        }
      );
  }  

}
