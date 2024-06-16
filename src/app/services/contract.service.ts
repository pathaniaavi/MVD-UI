import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ContractDefinition } from '../Model/contract-definition.model';
import { environment } from '../environment/environment.prod';

@Injectable({
  providedIn: 'root'
})
export class ContractService {

  ROOT_URL: string;
  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json'
    })
  };

  constructor(private http: HttpClient) {
    this.ROOT_URL = `${environment.protocol}://${environment.host}:${environment.port}/contract`;
    const headers = new HttpHeaders({
      'Content-Type': 'application/json'
    })
  }

  submitContract(contractData: any, company: string): Observable<ContractDefinition> {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json'
    });

    const requestBody = {
      "@context": {
         "@vocab": "https://w3id.org/edc/v0.0.1/ns/"
      },
      "@id": contractData.id,
      "accessPolicyId": contractData.accessPolicy.id,
      "contractPolicyId": contractData.contractPolicy.id,
      "assetsSelector": [
        {
          "operandLeft": "https://w3id.org/edc/v0.0.1/ns/id",
          "operator": "=",
          "operandRight": contractData.assetId.id
        }
      ]
    };
    console.log(requestBody)

    return this.http.post<ContractDefinition>(`${this.ROOT_URL}/submitContract/${company}`, requestBody, { headers });
  }

  fetchContracts(company: string): Observable<ContractDefinition[]> {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json'
    });

    return this.http.post<ContractDefinition[]>(`${this.ROOT_URL}/fetchContracts/${company}`, {}, { headers });
  }

  deleteContract(contractId: string, company: string): Observable<any> {
    return this.http.delete<any>(`${this.ROOT_URL}/deleteContract/${company}/${contractId}`, this.httpOptions);
  }

  fetchAllContractsAgreements(company:string): Observable<any[]> {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json'
    });

    return this.http.post<ContractDefinition[]>(`${this.ROOT_URL}/contractagreements/${company}`, {}, { headers });
  }

  
}
