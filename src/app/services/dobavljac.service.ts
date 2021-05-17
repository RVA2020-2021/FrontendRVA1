import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { DOBAVLJAC_URL } from '../app.constants';
import { Dobavljac } from '../models/dobavljac';

@Injectable({
  providedIn: 'root'
})
export class DobavljacService {

  constructor(private httpClient: HttpClient) { }

  public getAllDobavljacs() : Observable<any> {
    return this.httpClient.get(`${DOBAVLJAC_URL}`);
  }
  public addDobavljac(dobavljac: Dobavljac) : Observable<any> {
    dobavljac.id = 0;
    return this.httpClient.post(`${DOBAVLJAC_URL}`, dobavljac);
  }
  public updateDobavljac(dobavljac: Dobavljac) : Observable<any> {
    return this.httpClient.put(`${DOBAVLJAC_URL}`, dobavljac);
  }
  public deleteDobavaljac(id: number) : Observable<any> {
    return this.httpClient.delete(`${DOBAVLJAC_URL}/${id}`);
  }
}
