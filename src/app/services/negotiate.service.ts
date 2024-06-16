import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { environment } from '../environment/environment.prod';

@Injectable({
  providedIn: 'root'
})
export class NegotiateService {
  private ROOT_URL: string;

  constructor(private http: HttpClient) {
    this.ROOT_URL = `${environment.protocol}://${environment.host}:${environment.port}/${environment.negotiate}`;
  }

  submitNegotiation(company: string, data: any): Observable<any> {
    const url = `${this.ROOT_URL}/contractnegotiations/${company}`;
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'x-api-key': 'ApiKeyDefaultValue'
    });

    // console.log("Service called with data:", JSON.stringify(data, null, 2));
    data = this.transformRequest(data ,company) ;  // i want to send this as a body

    return this.http.post<any>(url, data, { headers });
  }

  private transformRequest(response: any , company :string): any {
    // console.log("Transform Request:", JSON.stringify(response, null, 2));
    const companyName = company=='company1'? 'company2':'company1';
    const body = {
      protocol: 'dataspace-protocol-http',
      '@context': {
        '@vocab': 'https://w3id.org/edc/v0.0.1/ns/'
      },
      connectorAddress: 'http://'+companyName+':8282/api/dsp',
      offer: {
        offerId: response.policyData["@id"],
        assetId: response.assetId,
        policy: {
          '@type': 'set',
          '@context': 'http://www.w3.org/ns/odrl.jsonld',
          uid: response.policyData["@id"],
          obligation: response.policyData["odrl:obligation"] || [],
          permission: (response.policyData["odrl:permission"] || []).map((perm: any) => ({
            'odrl:target': perm['odrl:target'],
            'odrl:action': {
              'odrl:type': perm['odrl:action']['odrl:type']
            },
            'odrl:constraint': {
              'odrl:leftOperand': perm['odrl:constraint']['odrl:leftOperand'],
              'odrl:operator': {
                '@id': perm['odrl:constraint']['odrl:operator']['@id']
              },
              'odrl:rightOperand': perm['odrl:constraint']['odrl:rightOperand']
            }
          })),
          prohibition: response.policyData["odrl:prohibition"] || [],
          target: response.policyData["odrl:target"]
        }
      },
      connectorId: "did:web:did-server:"+ companyName
    };

    // console.log("Request body prepared: ", JSON.stringify(body, null, 2));
    return body;
  }

  fetchContractNegotitations(company: string,id:string): Observable<any> {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json'
    });
    return this.http.get<any>(`${this.ROOT_URL}/contractnegotiations/${company}/${id}`, { headers });
  }



}
