import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { User } from '../models/user.model';
import { UtilsService } from './utils.service';

@Injectable({
  providedIn: 'root'
})
export class SubscribeService {

  private _sqlTable = 'bind';

  constructor(private http: HttpClient, private utils: UtilsService) { }

  bindEventWithUser(eventId: number, userId: number): Observable<string> {
    const url = this.utils.baseUrl() + this._sqlTable + '/userId=' + userId + '/eventId=' + eventId;
    return this.http.get<string>(url);
  }

  bindOrgaWithUser(orgaId: number, userId: number): Observable<string> {
    const url = this.utils.baseUrl() + this._sqlTable + '/userId=' + userId + '/organizationId=' + orgaId;
    console.log(url)
    return this.http.get<string>(url);
  }
}
