import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { PetOwner } from './model/pet-owner';
import { environment } from 'src/environments/environment';

const base:string = `${environment.WS_ADDRESS}/owners`;

@Injectable({
  providedIn: 'root'
})
export class PetOwnerService {

  constructor(private httpClient: HttpClient) { }

  public save(petOwner: PetOwner): Observable<PetOwner> {
    return this.httpClient.post<PetOwner>(base, petOwner);
  }

}
