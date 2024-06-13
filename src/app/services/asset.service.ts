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
        'Content-Type':  'application/json'
    })
  };

  private apiUrl = `${environment.protocol}://${environment.host}:${environment.port}/asset/submitAsset`;
  private fetchUrl = `${environment.protocol}://${environment.host}:${environment.port}/asset/fetchAssets`;

  constructor(private http: HttpClient) { 
    this.ROOT_URL = `${environment.protocol}://${environment.host}:${environment.port}/${environment.asset}`;
  }

  submitAsset(assetData: any): Observable<any> {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json'
    });

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

    return this.http.post<any>(this.apiUrl, requestBody, { headers });
  }

  fetchAssets(): Observable<Asset[]> {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json'
    });

    return this.http.post<Asset[]>(this.ROOT_URL+'/fetchAssets', {}, { headers });
  }

  deleteAsset(assetId: string): Observable<any> {
    return this.http.delete<any>(`${this.ROOT_URL}/deleteAsset/${assetId}`, this.httpOptions);
  }
}
