import { Component, OnInit } from '@angular/core';

import { SpeciesService } from '../services/species.service';
import { Species } from '../models/species';

@Component({
    templateUrl: './species.list.component.html'
})
export class SpeciesListComponent implements OnInit {

    speciesList: Species[] = [];
    
    constructor(
        private service: SpeciesService
    ) { }

    ngOnInit(): void {
        this.service.findAll().subscribe((list) => {
            this.speciesList = list;
        });
    }
    
}