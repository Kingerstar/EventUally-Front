import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, map } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DistrictsService {

  private _districtListSubject$: BehaviorSubject<string[]> = new BehaviorSubject<string[]>([]);

  constructor(private http: HttpClient){
    this.http.get('../assets/jsons/districts.json').subscribe((result: any) => {
      this._districtListSubject$.next(result.districts);
    });
  }

  getAll(): Observable<string[]>{
    return this._districtListSubject$.asObservable();
  }
}
