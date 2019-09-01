import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { SpeciesService } from '../services/species.service';
import { Species } from '../models/species';

@Component({
    templateUrl: './species.details.component.html'
})
export class SpeciesDetailsComponent implements OnInit {

    species: Species = new Species();;
    
    constructor(
        private service: SpeciesService
    ) { }

    ngOnInit(): void {

    }
    
}