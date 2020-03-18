import { Injectable } from "@angular/core";
import { AbstractControl } from "@angular/forms";
import { debounceTime, switchMap, map, first, tap } from "rxjs/operators";
import { AuthenticationService } from '../services/authentication.service';
import { UserService } from '../services/user.service';
import { UserToken } from '../models/user.token';

@Injectable()
export class UserExistsValidator {

    constructor(
        private authService: AuthenticationService,
        private userService: UserService
    ) {}

    public checkEmailIsTaken(): Function {
        return (control: AbstractControl) => {
            return control
                .valueChanges
                .pipe(debounceTime(300))
                .pipe(switchMap(userInput => this.authService.checkNameIsTaken(userInput)))
                .pipe(tap(response => console.log(response? 'Usuário existe' : 'Usuário não existe')))
                .pipe(map(response => !response? {nonExistentUser: true} : null))
                .pipe(first());
        };
    }

    public checkEmailAvailability(): Function {
        return (control: AbstractControl) => {
            return control
                .valueChanges
                .pipe(debounceTime(300))
                .pipe(switchMap(emailToCheck => this.authService.checkNameIsTaken(emailToCheck)))
                .pipe(map(response => response? {emailAlreadyInUse: true} : null))
                .pipe(first());
        };
    }

    public checkTFAIsEnabledForUser(): Function {
        return (control: AbstractControl) => {
            return control
                .valueChanges
                .pipe(debounceTime(300))
                .pipe(switchMap(emailToCheck => this.authService.checkTFAIsEnabledForUser(emailToCheck)))
                .pipe(map(response => response? {usingTFA: true} : null))
                .pipe(first());
        };
    }

    public preventRepeatedRequest(): Function {
        return (control: AbstractControl) => {
            return control
                .valueChanges
                .pipe(debounceTime(300))
                .pipe(switchMap(emailToCheck => this.userService.checkIfUserHasAlreadyRequestedANewPassword(emailToCheck)))
                .pipe(map(response => response? {alreadySent: true} : null))
                .pipe(first());
        };
    }
    
    public checkConfirmationCode(userId: number): Function {
        return (control: AbstractControl) => {
            return control
                .valueChanges
                .pipe(debounceTime(300))
                .pipe(switchMap(typedCode => this.userService.checkConfirmationCode(userId, typedCode)))
                .pipe(map(result => !result? {wrongConfirmationCode: true} : null))
                .pipe(first());
        };
    }   
    
    public checkTemporaryPassword(userId: number): Function {
        return (control: AbstractControl) => {
            return control
                .valueChanges
                .pipe(debounceTime(300))
                .pipe(switchMap(typedPassword => this.userService.checkTemporaryPassword(userId, typedPassword)))
                .pipe(map(result => !result? {wrongTemporaryPassword: true} : null))
                .pipe(first());
        };
    }    

}