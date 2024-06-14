import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Policy } from '../Model/policy.model';
import { environment } from '../environment/environment.prod';

@Injectable({
  providedIn: 'root'
})
export class PolicyService {

  ROOT_URL: string;
  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json'
    })
  };

  constructor(private http: HttpClient) {
    this.ROOT_URL = `${environment.protocol}://${environment.host}:${environment.port}/${environment.policy}`;
  }

  submitPolicy(policyData: any, company: string): Observable<Policy> {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json'
    });

    return this.http.post<Policy>(`${this.ROOT_URL}/submitPolicy/${company}`, policyData, { headers });
  }

  fetchPolicies(company: string): Observable<Policy[]> {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json'
    });

    return this.http.post<Policy[]>(`${this.ROOT_URL}/fetchPolicies/${company}`, {}, { headers });
  }

  deletePolicy(policyId: string, company: string): Observable<any> {
    return this.http.delete<any>(`${this.ROOT_URL}/deletePolicy/${company}/${policyId}`, this.httpOptions);
  }
}
