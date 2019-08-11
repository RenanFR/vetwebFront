import { ValidatorFn, FormControl } from "@angular/forms";

export const verifyPasswordConfirmationMatching: ValidatorFn = (form: FormControl) => {
    const password: string = form.get('password').value;
    const passwordConfirmation: string = form.get('passwordConfirmation').value;
    return password != passwordConfirmation ? {passConfDontMatch: true} : null;
};

export const verifyNewPasswordConfirmationMatching: ValidatorFn = (form: FormControl) => {
    const password: string = form.get('newPassword').value;
    const passwordConfirmation: string = form.get('newPasswordConfirm').value;
    return password != passwordConfirmation ? {passConfDontMatch: true} : null;
};