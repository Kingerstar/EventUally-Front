import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, map, switchMap, tap } from 'rxjs';
import { Event } from '../models/event.model';
import { UtilsService } from './utils.service';

@Injectable({
  providedIn: 'root'
})
export class SearchEventService {

  inputSearch$: BehaviorSubject<string> = new BehaviorSubject<string>("");
  private _eventsSubjectFiltered$: BehaviorSubject<Event[]> = new BehaviorSubject<Event[]>([]);
  private _eventsSubject$: BehaviorSubject<Event[]> = new BehaviorSubject<Event[]>([]);

  private _sqlTableName: string = "events";

  constructor(private http: HttpClient, private utils: UtilsService) {
    this.inputSearch$.subscribe(() => {
      this.getEventsFiltered().subscribe()
    })
  }

  getEvents(): Observable<Event[]> {
    return this.http.get<Event[]>(this.utils.baseUrl()+this._sqlTableName);
  }

  getEventsFiltered(): Observable<Event[]> {
    if (this._eventsSubject$.value.length) {
      return this._eventsSubject$
        .pipe(
          map((events: Event[]) => events.filter((event: Event) => event.name.toLocaleLowerCase().includes(this.inputSearch$.value))),
          tap((eventsFiltered: Event[]) => this._eventsSubjectFiltered$.next(eventsFiltered)),
          switchMap(() => this._eventsSubjectFiltered$.asObservable())
        )
    } else {
      return this.http.get<Event[]>(this.utils.baseUrl()+this._sqlTableName)
        .pipe(
          tap((events: Event[]) => this._eventsSubject$.next(events)),
          map((events: Event[]) => events.filter((event: Event) => event.name.toLowerCase().includes(this.inputSearch$.value.toLowerCase()))),
          tap((eventsFiltered: Event[]) => this._eventsSubjectFiltered$.next(eventsFiltered)),
          switchMap(() => this._eventsSubjectFiltered$.asObservable())
        )

    }
  }
}
