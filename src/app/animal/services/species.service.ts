import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { environment } from 'src/environments/environment';
import { Observable } from 'rxjs';
import { Species } from '../models/species';

const base:string = `${environment.WS_ADDRESS}/species`;

@Injectable()
export class SpeciesService {
    
    constructor(private http: HttpClient) {}

    public createSpecies(species: Species): Observable<Species> {
        return this.http.post<Species>(base, species);
    }

}