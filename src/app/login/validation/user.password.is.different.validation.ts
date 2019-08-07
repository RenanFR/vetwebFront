import { ValidatorFn, FormControl } from "@angular/forms";

export const userPasswordIsDifferent: ValidatorFn = (form: FormControl) => {
    const user: string = form.get('email').value;
    const password: string = form.get('password').value;
    if (user.trim() + password.trim()) {
        return user != password ? 
            null : {
                wrongCredentials: true
            };
    } else {
        return null;
    }
};