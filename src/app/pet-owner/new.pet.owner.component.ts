import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ValidateBrService } from 'angular-validate-br';
import { AddressValidator } from './validation/address.validator';
import { CepService } from '../shared/services/cep.service';
import { PetOwnerService } from './pet-owner.service';
import { PetOwner } from './model/pet-owner';
import { Address } from './model/address';
import { ContactInfo } from './model/contact-info';

@Component({
  templateUrl: './new.pet.owner.component.html'
})
export class NewPetOwnerComponent implements OnInit {
    
    ownersForm: FormGroup;

    constructor(
        private formBuilder: FormBuilder,
        private validateBrService: ValidateBrService,
        private cepService: CepService,
        private petOwnerService: PetOwnerService,
        private addressValidator: AddressValidator
    ) { }    

    ngOnInit(): void {
        this.ownersForm = this.formBuilder.group({
            nome: [ '', [ Validators.required ], [ ] ],
            sobrenome: [ '', [ Validators.required ], [ ] ],
            cpf: [ '', [ Validators.required, this.validateBrService.cpf], [ ] ],
            cep: [ '', [ Validators.required ], [ this.addressValidator.checkCep() ] ],
            numero: [ '', [ Validators.required ], [ ] ],
            logradouro: [ '', [ Validators.required ], [ ] ],
            bairro: [ '', [ Validators.required ], [ ] ],
            cidade: [ '', [ Validators.required ], [ ] ],
            uf: [ '', [ Validators.required ], [ ] ],
            telefone: [ '', [ Validators.required ], [ ] ],
            email: [ '', [ Validators.required ], [ ] ],
            celular: [ '', [ Validators.required ], [ ] ],
            nascimento: [ '', [ Validators.required ], [ ] ],
            genero: [ '', [ Validators.required ], [ ] ],
            profissao: [ '', [ Validators.required ], [ ] ],
            status: [ '', [ Validators.required ], [ ] ]
        });
    }


    private onCreate(): void {
        let petOwner: PetOwner = new PetOwner();
        let address: Address = new Address();
        let contactInfo: ContactInfo = new ContactInfo();
        petOwner.firstName = this.ownersForm.get('nome').value;
        petOwner.lastName = this.ownersForm.get('sobrenome').value;
        petOwner.cpf = this.ownersForm.get('cpf').value;
        petOwner.gender = this.ownersForm.get('genero').value;
        petOwner.dateBorn = this.ownersForm.get('nascimento').value;
        address.street = this.ownersForm.get('logradouro').value;
        address.state = this.ownersForm.get('uf').value;
        address.district = this.ownersForm.get('bairro').value;
        address.city = this.ownersForm.get('cidade').value;
        address.zipCode = this.ownersForm.get('cep').value;
        address.number = this.ownersForm.get('numero').value;
        petOwner.address = address;
        contactInfo.cellPhone = this.ownersForm.get('celular').value;
        contactInfo.phone = this.ownersForm.get('telefone').value;
        contactInfo.email = this.ownersForm.get('email').value;
        petOwner.contactInfo = contactInfo;
        console.log(petOwner);
        this.petOwnerService.save(petOwner).subscribe((record) => {
            console.log(record.id);
        },
        (error) => {
            console.log(error);
        });
    }

    private fillAddress(cep: string): void {
        cep = cep.replace('.', '');
        cep = cep.replace('-', '');
        this.cepService.loadAddress(cep)
            .subscribe((data) => {
                this.ownersForm.get('logradouro').setValue(data.logradouro);
                this.ownersForm.get('bairro').setValue(data.bairro);
                this.ownersForm.get('cidade').setValue(data.localidade);
                this.ownersForm.get('uf').setValue(data.uf);
            },
            (error) => {

            });
    }

}
