import { Injectable } from "@angular/core";
import { AbstractControl } from "@angular/forms";
import { debounceTime, switchMap, map, first } from "rxjs/operators";
import { AuthenticationService } from '../services/authentication.service';

@Injectable()
export class UserExistsValidator {

    constructor(
        private authService: AuthenticationService 
    ) {}

    public checkEmailIsTaken(): Function {
        return (control: AbstractControl) => {
            return control
                .valueChanges
                .pipe(debounceTime(300))
                .pipe(switchMap(userInput => this.authService.checkNameIsTaken(userInput)))
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

}