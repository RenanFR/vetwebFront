export interface UserToken {

    id: number;

    sub: string;

    userEmail: string;

    socialUser: boolean;

    inclusionDate: string;

    profiles: any;
    
}