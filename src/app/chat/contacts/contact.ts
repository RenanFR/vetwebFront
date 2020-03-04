import { UserToken } from 'src/app/login/models/user.token';
import { Message } from '../message';

export interface Contact {

    user: UserToken;
    messages: Message[ ];
    mostRecentContact: boolean;

}
