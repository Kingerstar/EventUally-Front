import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable, map } from 'rxjs';
import { TokenService } from '../shared/token.service';
import { PopUpService } from '../shared/pop-up.service';
import { PopUp } from '../models/pop-up.model';

@Injectable({
  providedIn: 'root'
})
export class ConnectedGuard implements CanActivate {
  role!: "ROLE_ADMIN" | "ROLE_USER" | "ROLE_ORGANIZATION"

  constructor(
    private router: Router,
    private tokenS: TokenService,
    private popup: PopUpService
    ) {
    // Lorsque se construit ma classe (1 seule fois), je récupère mon JWT (opération asynchrone donc je dois la lancer le plus tôt possible)
    // Ma méthode canActivate() se déclenchera plus tard
    this.tokenS._getTokenDetailsSubject$()
      .pipe(
        map((decodedToken: any) => decodedToken.role)
      )
      .subscribe((role: "ROLE_ADMIN" | "ROLE_USER" | "ROLE_ORGANIZATION") => {
        this.role = role;
      });
  }

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {

    if (this.role === "ROLE_ADMIN" || this.role === "ROLE_USER" || this.role === "ROLE_ORGANIZATION") {
      return true;
    } else {
      this.popup.addToList(new PopUp("Tu n'es pas connecté·e 🔒","error"));
      this.router.navigate(['/login']);
      return false;
    }
  }
  
}
