import { Component } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import { TokenService } from 'src/app/shared/token.service';
import { UserService } from 'src/app/shared/user.service';

@Component({
  selector: 'app-nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.scss']
})
export class NavBarComponent {
  displayNav: boolean = true;
  linkList = [
    {
      router: "/",
      svg: {
        title: "Logo accueil",
        dAttribute: "M12 20C7.6 20 4 16.4 4 12S7.6 4 12 4 20 7.6 20 12 16.4 20 12 20M12 2C6.5 2 2 6.5 2 12S6.5 22 12 22 22 17.5 22 12 17.5 2 12 2M11 14H13V17H16V12H18L12 7L6 12H8V17H11V14"
      }
    },
    {
      router: "login",
      svg: {
        title: "Logo compte",
        dAttribute: "M12,2A10,10 0 0,0 2,12A10,10 0 0,0 12,22A10,10 0 0,0 22,12A10,10 0 0,0 12,2M7.07,18.28C7.5,17.38 10.12,16.5 12,16.5C13.88,16.5 16.5,17.38 16.93,18.28C15.57,19.36 13.86,20 12,20C10.14,20 8.43,19.36 7.07,18.28M18.36,16.83C16.93,15.09 13.46,14.5 12,14.5C10.54,14.5 7.07,15.09 5.64,16.83C4.62,15.5 4,13.82 4,12C4,7.59 7.59,4 12,4C16.41,4 20,7.59 20,12C20,13.82 19.38,15.5 18.36,16.83M12,6C10.06,6 8.5,7.56 8.5,9.5C8.5,11.44 10.06,13 12,13C13.94,13 15.5,11.44 15.5,9.5C15.5,7.56 13.94,6 12,6M12,11A1.5,1.5 0 0,1 10.5,9.5A1.5,1.5 0 0,1 12,8A1.5,1.5 0 0,1 13.5,9.5A1.5,1.5 0 0,1 12,11Z"
      }
    },
    {
      router: "admin",
      svg: {
        title: "Logo gestion",
        dAttribute: "M21.7,13.35L20.7,14.35L18.65,12.3L19.65,11.3C19.86,11.08 20.21,11.08 20.42,11.3L21.7,12.58C21.92,12.79 21.92,13.14 21.7,13.35M12,18.94L18.07,12.88L20.12,14.93L14.06,21H12V18.94M4,2H18A2,2 0 0,1 20,4V8.17L16.17,12H12V16.17L10.17,18H4A2,2 0 0,1 2,16V4A2,2 0 0,1 4,2M4,6V10H10V6H4M12,6V10H18V6H12M4,12V16H10V12H4Z"
      }
    },
    {
      router: "map",
      svg: {
        title: "Logo carte",
        dAttribute: "M12,20A8,8 0 0,1 4,12A8,8 0 0,1 12,4A8,8 0 0,1 20,12A8,8 0 0,1 12,20M12,2A10,10 0 0,0 2,12A10,10 0 0,0 12,22A10,10 0 0,0 22,12A10,10 0 0,0 12,2M12,12.5A1.5,1.5 0 0,1 10.5,11A1.5,1.5 0 0,1 12,9.5A1.5,1.5 0 0,1 13.5,11A1.5,1.5 0 0,1 12,12.5M12,7.2C9.9,7.2 8.2,8.9 8.2,11C8.2,14 12,17.5 12,17.5C12,17.5 15.8,14 15.8,11C15.8,8.9 14.1,7.2 12,7.2Z"
      }
    },
    {
      router: "help",
      svg: {
        title: "Logo aide",
        dAttribute: "M11,18H13V16H11V18M12,2A10,10 0 0,0 2,12A10,10 0 0,0 12,22A10,10 0 0,0 22,12A10,10 0 0,0 12,2M12,20C7.59,20 4,16.41 4,12C4,7.59 7.59,4 12,4C16.41,4 20,7.59 20,12C20,16.41 16.41,20 12,20M12,6A4,4 0 0,0 8,10H10A2,2 0 0,1 12,8A2,2 0 0,1 14,10C14,12 11,11.75 11,15H13C13,12.75 16,12.5 16,10A4,4 0 0,0 12,6Z"
      }
    },
  ];

  role: "ROLE_ADMIN" | "ROLE_USER" | "ROLE_ORGANIZATION" | "" = "";

  profilePicture: string = "assets/images/default-profile.png";

  constructor(
    private router: Router,
    private tokenService: TokenService,
    private userService: UserService
    ) { }


  ngOnInit():void { 
    this.displayNavBar();
    this.checkConnexion();
  }

  displayNavBar():void {
    this.router.events.subscribe((e: any) => {
      if (e instanceof NavigationEnd) {
        if (e.url === '/welcome') {
          this.displayNav = false;
        } else {
          this.displayNav = true;
        }
      }
    })
  }

  checkConnexion(): void{
    this.tokenService._getTokenDetailsSubject$().subscribe((jwtDecoded) => {
      if(jwtDecoded && jwtDecoded.role){
        this.role = jwtDecoded.role;
        this.profilePicture = "assets/images/default-profile.png";
        this.userService.getPropertyByJwt("profilePicture").subscribe((json: any) => {
          this.profilePicture = json.property;
        });
      }else{
        this.role = "";
        this.profilePicture = "";
      }
    });
  }

  hasToDisplaySvg(routerName: string): boolean {
    if(routerName === 'admin' && this.role !== 'ROLE_ADMIN'){
      return false;
    } else if (routerName === 'login' && this.role){
      return false;
    }
    return true;
  }

}