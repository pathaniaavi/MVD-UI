import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Asset } from '../Model/asset.model';
import { environment } from '../environment/environment.prod';

@Injectable({
  providedIn: 'root'
})
export class AssetService {

  ROOT_URL: string;
  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json'
    })
  };

  constructor(private http: HttpClient) {
    this.ROOT_URL = `${environment.protocol}://${environment.host}:${environment.port}/${environment.asset}`;
  }

  submitAsset(assetData: any, company: string): Observable<any> {
    const requestBody = {
      "@context": {
        "@vocab": "https://w3id.org/edc/v0.0.1/ns/"
      },
      "@id": assetData.id,
      "properties": {
        "name": assetData.name,
        "contenttype": assetData.contentType
      },
      "dataAddress": {
        "type": "HttpData",
        "name": "Test asset",
        "baseUrl": assetData.baseUrl,
        "proxyPath": "true"
      }
    };

    return this.http.post<any>(`${this.ROOT_URL}/submitAsset/${company}`, requestBody, this.httpOptions);
  }

  fetchAssets(company: string): Observable<Asset[]> {
    return this.http.post<Asset[]>(`${this.ROOT_URL}/fetchAssets/${company}`, {}, this.httpOptions);
  }

  deleteAsset(assetId: string, company: string): Observable<any> {
    return this.http.delete<any>(`${this.ROOT_URL}/deleteAsset/${company}/${assetId}`, this.httpOptions);
  }
}
