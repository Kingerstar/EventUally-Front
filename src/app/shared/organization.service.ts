import { Injectable } from '@angular/core';
import { Organization } from '../models/organization.model';
import { HttpClient } from '@angular/common/http';
import { Observable, map } from 'rxjs';
import { UtilsService } from './utils.service';

@Injectable({
  providedIn: 'root'
})
export class OrganizationService {

  private _sqlTableName: string = "organizations";

  constructor(private http: HttpClient, private utils: UtilsService){}

  getAll(): Observable<Organization[]>{
    return this.http.get<Organization[]>(this.utils.baseUrl()+this._sqlTableName+'/all');
  }

  getById(id: string): Observable<Organization>{
    return this.http.get<Organization>(this.utils.baseUrl()+this._sqlTableName+'/'+id);
  }

  post(organization: Organization): Observable<Organization>{
    return this.http.post<Organization>(this.utils.baseUrl()+this._sqlTableName+'/add', organization);
  }

  putById(id: number, organization: Organization): Observable<string[]>{
    return this.http.put<string[]>(this.utils.baseUrl()+this._sqlTableName+'/update/'+id, organization);
  }

  deleteById(id: number): Observable<string[]>{
    return this.http.delete<string[]>(this.utils.baseUrl()+this._sqlTableName+'/delete/'+id);
  }

  getQuantity(): Observable<number>{
    return this.http.get<number>(this.utils.baseUrl()+this._sqlTableName + '/quantity');
  }
}
