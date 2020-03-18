export class NewUserModel {

    id: number;

    userMail: string;

    userName: string;

    confirmationCode: string;

    temporaryPassword: string;
    
    password: string;

    passwordConfirmation: string;

    useTwoFactorAuth: boolean;

    isSocialLogin: boolean;

}