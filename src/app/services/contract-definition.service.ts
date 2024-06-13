import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ContractDefinition } from '../Model/contract-definition.model';
import { environment } from '../environment/environment.prod';

@Injectable({
  providedIn: 'root'
})
export class ContractDefinitionService {

  ROOT_URL: string;
  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json'
    })
  };

  private apiUrl = `${environment.protocol}://${environment.host}:${environment.port}/${environment.contract}/submitContract`;
  private fetchUrl = `${environment.protocol}://${environment.host}:${environment.port}/${environment.contract}/fetchContracts`;

  constructor(private http: HttpClient) {
    this.ROOT_URL = `${environment.protocol}://${environment.host}:${environment.port}/${environment.contract}`;
  }

  submitContract(contractData: any): Observable<ContractDefinition> {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json'
    });

    const requestBody = {
      "@context": {
        "edc": "https://w3id.org/edc/v0.0.1/ns/"
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

    return this.http.post<ContractDefinition>(this.apiUrl, requestBody, { headers });
  }


  fetchContracts(): Observable<ContractDefinition[]> {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json'
    });

    return this.http.post<ContractDefinition[]>(this.fetchUrl, {}, { headers });
  }

  deleteContract(contractId: string): Observable<any> {
    return this.http.delete<any>(`${this.ROOT_URL}/deleteContract/${contractId}`, this.httpOptions);
  }
}
