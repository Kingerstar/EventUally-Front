import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ApiExternalService {

  constructor(private http: HttpClient) { }

  ipApiGetLongLat(): Observable<any>{
    return this.http.get<any>('http://ip-api.com/json');
  }
}
