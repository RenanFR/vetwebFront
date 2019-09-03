import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { SpeciesService } from '../services/species.service';
import { Species } from '../models/species';

@Component({
    templateUrl: './species.registration.component.html'
})
export class SpeciesRegistrationComponent implements OnInit {
    
    speciesForm: FormGroup;
    species: Species = new Species();
    
    constructor(
        private router: Router,
        private service: SpeciesService,
        private speciesFormBuilder: FormBuilder
    ) { }

    ngOnInit(): void {
        this.speciesForm = this.speciesFormBuilder.group({
            speciesDescription: [ '', [ Validators.required ], [ ] ]
        });
    }

    private onCreate(): void {
        this.species.description = this.speciesForm.get('speciesDescription').value;
        this.service.createSpecies(this.species)   
        .subscribe((responseSpecies) => {
            this.router.navigate(['/animals/species', responseSpecies.id]);
        },
        (shitHappened) => {
            console.log(shitHappened);
        });
    }
    
}