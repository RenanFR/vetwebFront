import { UserToken } from 'src/app/login/models/user.token';
import { AutomaticResponse } from './automatic.response';

export class ChatConfiguration {

    _id: string;
    user: UserToken;
    automaticResponse: AutomaticResponse;
    changedAt: Date;
    
}
