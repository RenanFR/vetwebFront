import { ValidatorFn, FormControl } from "@angular/forms";

export const verifyPasswordConfirmationMatching: ValidatorFn = (form: FormControl) => {
    const password: string = form.get('password').value;
    const passwordConfirmation: string = form.get('passwordConfirmation').value;
    return password != passwordConfirmation ? {passConfDontMatch: true} : null;
};