import { Injectable } from '@angular/core';
import { TokenResponse } from '../models/token-response.model';
import jwt_decode from 'jwt-decode';
import { BehaviorSubject, Observable } from 'rxjs';
import { LocalStorageService } from './local-storage.service';

@Injectable({
  providedIn: 'root'
})
export class TokenService {

  // Le BehaviorSubject est initialisé avec une valeur par défaut, ici : this.getTokenFromLocalStorageAndDecode()
  // Cela signifie que la valeur par défaut de _tokenDetailsSubject$ sera celle du Token décodé présent en LocalStorage (s'il y en a un).
  // Sinon ça sera null.

  private readonly _tokenDetailsSubject$: BehaviorSubject<any> = new BehaviorSubject<any>(this.getTokenFromLocalStorageAndDecode());

  constructor(private lsService: LocalStorageService) { }

  // Mise à jour du token
  updateToken(tokenFromDB: TokenResponse): void {
    // Remise à zéro du localStorage puis ajout du nouveau Token reçu du serveur
    this._clearLocalStorageAndThenPutNewToken(tokenFromDB);
    // Décoder le Token pour accéder à son corps (où les Claims sont accessibles, notamment le ROLE du user)
    const decodedToken = this._decodeToken(tokenFromDB);
    // Mise à disposition du corps du token extrait précédemment dans un BehaviorSubject afin de notifier les composants/services qui sont subscribe() lorsque le token change de valeur
    this._setTokenDetailsSubject$(decodedToken);
  }

  getTokenFromLocalStorageAndDecode(): any {
    // On récupère le token stocké en localStorage
    const tokenId = this.lsService.getToken();
    // S'il y en a un
    if(tokenId) {
      // Je retourne la valeur décodée du token (le corps du token)
      return this._decodeToken({token: tokenId});
    } else {
      // Sinon je retourne null
      return null;
    }
  }

  resetToken(): void {
    this._tokenDetailsSubject$.next({});
    this.lsService.clearToken();
  }

  // Je réinitialise mon localStorage puis j'y place mon nouveau Token
  private _clearLocalStorageAndThenPutNewToken(tokenFromDB: TokenResponse): void {
    this.lsService.clearToken();
    this.lsService.setToken(tokenFromDB)
  }

  // Je décode mon token (comme le fait jwt.io) afin d'en extraire le CORPS et y récupérer les CLAIMS (rôle de l'utilisateur, son email, expiration...)
  private _decodeToken(tokenFromDB: TokenResponse): any {
    return this._getDecodedTokenResponse(tokenFromDB.token);
  }

  // Je décode le token
  private _getDecodedTokenResponse(token: string): any {
    // J'utilise une librairie pour décoder le corps du token
    return jwt_decode(token);
  }

  // Je "pousse" une nouvelle valeur dans la propriété _tokenDetailsSubject$ (en l'occurence ici : le corps du token décodé)
  private _setTokenDetailsSubject$(tokenInfos: any): void {
    this._tokenDetailsSubject$.next(tokenInfos);
  }

  // J'expose ma propriété _tokenDetailsSubject$ en tant qu'Observable, afin que chaque composant/service qui y soit .subscribe() soit notifié s'il y a un nouveau token.
  _getTokenDetailsSubject$(): Observable<any> {
    return this._tokenDetailsSubject$.asObservable();
  }
}
