import { Injectable } from "@angular/core";
import { AbstractControl } from "@angular/forms";
import { debounceTime, switchMap, map, first, tap } from "rxjs/operators";
import { CepService } from 'src/app/shared/services/cep.service';

@Injectable()
export class AddressValidator {

    constructor(
        private cepService: CepService
    ) {}

    public checkCep(): Function {
        return (control: AbstractControl) => {
            return control
                .valueChanges
                .pipe(debounceTime(300))
                .pipe(switchMap(cepInput => this.cepService.isValidCep(cepInput)))
                .pipe(tap(response => console.log(response? 'Cep existe' : 'Cep não existe')))
                .pipe(map(response => !response? {invalidCep: true} : null))
                .pipe(first());
        };
    }

}