import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Asset } from '../Model/asset.model';
import { Policy } from '../Model/policy.model';
import { environment } from '../environment/environment.prod';  

@Injectable({
  providedIn: 'root'
})
export class PolicyService {

  ROOT_URL: string;
  httpOptions = {
    headers: new HttpHeaders({
        'Content-Type':  'application/json'
    })
  };

  private apiUrl = `${environment.protocol}://${environment.host}:${environment.port}/${environment.policy}/submitPolicy`;
  private fetchUrl = `${environment.protocol}://${environment.host}:${environment.port}/${environment.policy}/fetchPolicies`;

  constructor(private http: HttpClient) { 
    this.ROOT_URL = `${environment.protocol}://${environment.host}:${environment.port}/${environment.policy}`;
  }

  submitPolicy(policyData: any): Observable<Policy> {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json'
    });

    return this.http.post<Policy>(this.apiUrl, policyData, { headers });
  }

  fetchPolicies(): Observable<Policy[]> {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json'
    });

    return this.http.post<Policy[]>(this.fetchUrl, {}, { headers });
  }

  deletePolicy(policyId: string): Observable<any> {
    return this.http.delete<any>(`${this.ROOT_URL}/deletePolicy/${policyId}`, this.httpOptions);
  }
}
