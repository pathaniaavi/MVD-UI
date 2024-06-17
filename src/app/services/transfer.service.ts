import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ContractDefinition } from '../Model/contract-definition.model';
import { environment } from '../environment/environment.prod';

@Injectable({
  providedIn: 'root'
})
export class TransferService {

  ROOT_URL: string;
  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json'
    })
  };

  constructor(private http: HttpClient) {
    this.ROOT_URL = `${environment.protocol}://${environment.host}:${environment.port}/transfer`;
    const headers = new HttpHeaders({
      'Content-Type': 'application/json'
    })
  }


  fetchTransferStatus(company :string , id:string ):Observable<any> {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json'
    });

    return this.http.get<any>(`${this.ROOT_URL}/transferprocesses/${company}/${id}`, { headers});
  }

  createTransferRequest(form:any,company:string): Observable<any> {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json'
    });
    const companyName = company=='company1'? 'company2':'company1';
// console.log("Check Data Form :", form.contractId )
    const transferRequest = {
      "@context": {
        "@vocab": "https://w3id.org/edc/v0.0.1/ns/"
      },
      "@type": "TransferRequestDto",
      "connectorId": "did:web:did-server:"+companyName,
      "connectorAddress": "http://"+companyName+":8282/api/dsp",
      "contractId": form.contractID,
      "assetId": form.assetID,
      "protocol": "dataspace-protocol-http",
      "dataDestination": {
        "type": "HttpData",
        "baseUrl": form.baseUrl
      }
    };

    console.log("transferRequest:", transferRequest )
    return this.http.post<any>(`${this.ROOT_URL}/transferprocesses/${company}`, transferRequest, { headers});;
  }
}
