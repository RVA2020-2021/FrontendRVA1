import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ARTIKL_URL } from '../app.constants';
import { Artikl } from '../models/artikl';

@Injectable({
  providedIn: 'root'
})
export class ArtiklService {

  constructor(private httpClient: HttpClient) { }

  public getAllArtikls(): Observable<any> {
    return this.httpClient.get(`${ARTIKL_URL}`);
  }
  public addArtikl(artikl: Artikl): Observable<any> {
    artikl.id= 0;
    return this.httpClient.post(`${ARTIKL_URL}`, artikl);
  }
  public updateArtikl(artikl: Artikl): Observable<any> {
    return this.httpClient.put(`${ARTIKL_URL}`, artikl);
  }
  public deleteArtikl(id: number): Observable<any> {
    return this.httpClient.delete(`${ARTIKL_URL}/${id}`)
  }
}
