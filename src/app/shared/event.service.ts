import { Injectable } from '@angular/core';
import { Event } from '../models/event.model';
import { Observable, map } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { UtilsService } from './utils.service';

@Injectable({
  providedIn: 'root'
})
export class EventService {

  private _sqlTableName: string = "events";

  constructor(private http: HttpClient, private utils: UtilsService) { }

  getAll(): Observable<Event[]> {
    return this.http.get<Event[]>(this.utils.baseUrl() + this._sqlTableName);
  }

  getById(idName: string): Observable<Event> {
    return this.http.get<Event>(this.utils.baseUrl() + this._sqlTableName + "/" + idName);
  }

  getWeek(): Observable<Event[]> {
    return this.http.get<Event[]>(this.utils.baseUrl() + this._sqlTableName + '/week');
  }

  post(newEvent: Event): Observable<Event> {
    return this.http.post<Event>(this.utils.baseUrl() + this._sqlTableName + '/add', newEvent);
  }

  putById(id: number, event: Event): Observable<string[]> {
    return this.http.put<string[]>(this.utils.baseUrl() + this._sqlTableName + '/update/' + id, event);
  }

  deleteById(id: number): Observable<string[]> {
    return this.http.delete<string[]>(this.utils.baseUrl() + this._sqlTableName + '/delete/' + id);
  }

  getQuantity(): Observable<number> {
    return this.http.get<number>(this.utils.baseUrl() + this._sqlTableName + "/quantity");
  }
}  