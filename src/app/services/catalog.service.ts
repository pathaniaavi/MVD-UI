import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Catalog } from '../Model/catalog.model';
import { environment } from '../environment/environment.prod';

@Injectable({
  providedIn: 'root'
})
export class CatalogService {

  ROOT_URL: string;
  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json'
    })
  };

  constructor(private http: HttpClient) {
    this.ROOT_URL = `${environment.protocol}://${environment.host}:${environment.port}/catalog`;
  }

  submitCatalog(catalogData: any, company: string): Observable<Catalog> {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json'
    });

    return this.http.post<Catalog>(`${this.ROOT_URL}/submitCatalog/${company}`, catalogData, { headers });
  }

  fetchCatalogs(company: string): Observable<Catalog[]> {
    let requestBody: any;
    if (company === 'company1') {
      requestBody = {
        "@context": {
          "@vocab": "https://w3id.org/edc/v0.0.1/ns/"
        },
        "counterPartyAddress": "http://company2:8282/api/dsp",
        "protocol": "dataspace-protocol-http"
      };
    } else {
      requestBody = {
        "@context": {
          "@vocab": "https://w3id.org/edc/v0.0.1/ns/"
        },
        "counterPartyAddress": "http://company1:8282/api/dsp",
        "protocol": "dataspace-protocol-http"
      };
    }

    const headers = new HttpHeaders({
      'Content-Type': 'application/json'
    });

    return this.http.post<Catalog[]>(`${this.ROOT_URL}/fetchCatalog/${company}`, requestBody, { headers });
  }

  deleteCatalog(catalogId: string, company: string): Observable<any> {
    return this.http.delete<any>(`${this.ROOT_URL}/deleteCatalog/${company}/${catalogId}`, this.httpOptions);
  }
}
