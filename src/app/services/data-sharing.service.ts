import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DataSharingService {
  private dataSource = new BehaviorSubject<string>('company1');
  currentData = this.dataSource.asObservable();

  constructor() { }

  changeData(data: string) {
    this.dataSource.next(data);
    
  }
}
