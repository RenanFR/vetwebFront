export interface UserToken {

    id: number;

    sub: string;

    userEmail: string;

    usingTempPassword: boolean;

    enabled: boolean;
    
    socialUser: boolean;

    inclusionDate: string;

    profiles: any;
    
}