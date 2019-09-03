import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { SpeciesService } from '../services/species.service';
import { Species } from '../models/species';

@Component({
    templateUrl: './species.details.component.html'
})
export class SpeciesDetailsComponent implements OnInit {

    species: Species = new Species();
    
    constructor(
        private route: ActivatedRoute,
        private service: SpeciesService
    ) { }

    ngOnInit(): void {
        let id = this.route.snapshot.params.speciesId;
        this.service.findById(id).subscribe((spec) => {
            this.species = spec;
        });
    }
    
}