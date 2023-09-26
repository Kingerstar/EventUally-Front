import { Injectable } from '@angular/core';
import { TokenResponse } from '../models/token-response.model';

@Injectable({
  providedIn: 'root'
})
export class LocalStorageService {

  // Je récupère le token stocké en LocalStorage
  getToken(): string | null {
    const tokenId = localStorage.getItem("tokenId");
    if (tokenId) {
      return tokenId;
    } else {
      return null;
    }
  }

  setToken(tokenFromDB: TokenResponse): void {
    localStorage.setItem("tokenId", tokenFromDB.token);
  }

  clearToken(): void {
    localStorage.removeItem("tokenId");
  }

  resetTuto(): void {
    localStorage.removeItem("isFirstMapView");
    localStorage.removeItem("isFirstVisit");
    localStorage.removeItem("needTutoSwipeProfile");
  }

  getItem(name: string): string | null {
    return localStorage.getItem(name);
  }

  setItem(name: string, value: string): void {
    localStorage.setItem(name, value);
  }
}