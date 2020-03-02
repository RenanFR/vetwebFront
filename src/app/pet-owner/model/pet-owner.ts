import { Address } from './address';
import { ContactInfo } from './contact-info';

export class PetOwner {

    id: number;
    cpf: string;
    firstName: string;
    lastName: string;
    address: Address;
    gender: string;
    dateBorn: string;
    contactInfo: ContactInfo;
    

}
