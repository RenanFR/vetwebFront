import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { CepData } from '../models/cep-data';
import { INTERCEPTOR_SKIP_HEADER } from '../global/request.interceptor';
import { environment } from 'src/environments/environment';

const base: string = `${environment.WS_ADDRESS}/validation`;

@Injectable({
  providedIn: 'root'
})
export class CepService {

  constructor(private http: HttpClient) { }

  public loadAddress(cep: string): Observable<CepData> {
    const headers = new HttpHeaders().set(INTERCEPTOR_SKIP_HEADER, 'true');
    return this.http.get<CepData>(`http://viacep.com.br/ws/${cep}/json`, { headers });
  }

  public isValidCep(cep: string): Observable<boolean> {
    return this.http.get<boolean>(`${base}/cep/${cep}`);
  }

}
