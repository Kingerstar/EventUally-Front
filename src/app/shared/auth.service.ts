import { HttpClient, HttpErrorResponse, HttpHeaders, HttpParams, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, tap } from 'rxjs';
import { UserAuth } from '../models/user-auth.model';
import { TokenService } from './token.service';
import { TokenResponse } from '../models/token-response.model';
import { UserRegister } from '../models/user-register.model';
import { UtilsService } from './utils.service';
import { PopUpService } from './pop-up.service';
import { PopUp } from '../models/pop-up.model';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private _httpErrorSubject$: BehaviorSubject<HttpErrorResponse> = new BehaviorSubject(new HttpErrorResponse({}));
  private _httpSuccessSubject$: BehaviorSubject<HttpResponse<any>> = new BehaviorSubject(new HttpResponse({}));


  constructor(
    private http: HttpClient,
    private tokenService: TokenService,
    private utils: UtilsService,
    private popup: PopUpService,
    private router: Router
  ) { }

  // Je m'inscris : j'envoie mon objet UserRegister et je m'abonne à la réponse de mon serveur
  signUp(userRegister: UserRegister): void {
    this.http.post<any>(this.utils.baseUrl()+'auth/register', userRegister)
    .pipe(tap(res => {
      this.popup.addToList(new PopUp(res.message, res.type));
      this.router.navigate(["/login"]);
    }))
      .subscribe();
  }

  // Je me connecte : j'envoie mon objet UserAuth et je m'abonne à la réponse de mon serveur. Lorsque je la reçois, je reçois le token que je stock en localStorage.
  signIn(userAuth: UserAuth): void {
    this.tokenService.resetToken();
    this.http.post<any>(this.utils.baseUrl()+'auth/authenticate', userAuth)
      .subscribe((tokenFromDB: TokenResponse) => {
        this.popup.addToList(new PopUp(tokenFromDB.message as string, "work"));
        this.tokenService.updateToken(tokenFromDB);
        this.router.navigate(['']);
      })
  }

  getHttpErrorSubject$(): Observable<HttpErrorResponse> {
    return this._httpErrorSubject$.asObservable();
  }
  setHttpErrorSubject$(error: HttpErrorResponse): void {
    // On retire l'erreur stockée dans le SuccessSubject
    this._httpSuccessSubject$.next(new HttpResponse({}))
    // On ajoute l'erreur au ErrorSubject
    this._httpErrorSubject$.next(error);
  }

  getHttpSuccessSubject$(): Observable<HttpResponse<any>> {
    return this._httpSuccessSubject$.asObservable();
  }
  setHttpSuccessSubject$(success: HttpResponse<any>): void {
    // On retire l'erreur stockée dans le ErrorSubject
    this._httpErrorSubject$.next(new HttpErrorResponse({}))
    // On ajoute l'erreur au SuccessSubject
    this._httpSuccessSubject$.next(success);
  }

}
