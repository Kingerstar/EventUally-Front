import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, map, switchMap, tap } from 'rxjs';
import { User } from '../models/user.model';
import { UtilsService } from './utils.service';
import { TokenService } from './token.service';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  private _sqlTableName: string = "users";

  constructor(
    private http: HttpClient,
    private utils: UtilsService,
    private tokenService: TokenService
    ) { }
  
  getById(id: number): Observable<User> {
    return this.http.get<User>(this.utils.baseUrl() + this._sqlTableName + "/id/" + id);
  }
    
  getPropertyByJwt(property: string): Observable<any>{
    const email = this.tokenService.getTokenFromLocalStorageAndDecode().sub;
    return this.getIdByEmail(email)
      .pipe(
        //tap((res) => console.log(res)),
        switchMap((id: number) => { 
          return this.http.get<any>(this.utils.baseUrl() + this._sqlTableName + '/' + property + '/' + id);

        })
      );
  }

  getIdByEmail(email: string): Observable<number> {
    return this.http.get<User>(this.utils.baseUrl() + this._sqlTableName + '/email/' + email).pipe(
      map(user => user.id)
    );
  }

  getAll(): Observable<User[]> {
    return this.http.get<User[]>(this.utils.baseUrl() + this._sqlTableName+'/all');
  }

  putById(id: number, user: User): Observable<string[]> {
    return this.http.put<string[]>(this.utils.baseUrl() + this._sqlTableName + '/update/' + id, User);
  }

  updateIntro(newIntro: string): void {
    this.getIdByEmail(this.tokenService.getTokenFromLocalStorageAndDecode().sub).subscribe((id: number) => {
      this.http.put(this.utils.baseUrl() + this._sqlTableName + '/update/introduction/' + id, newIntro).subscribe();
    });
  }

  deleteById(id: number): Observable<string[]> {
    return this.http.delete<string[]>(this.utils.baseUrl() + this._sqlTableName + '/delete/' + id);
  }

  getQuantity(): Observable<number> {
    return this.http.get<number>(this.utils.baseUrl() + this._sqlTableName + '/quantity');
  }
}   