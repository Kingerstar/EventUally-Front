import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { JwtDecoded } from 'src/app/models/jwt-decoded.model';
import { PopUp } from 'src/app/models/pop-up.model';
import { User } from 'src/app/models/user.model';
import { LocalStorageService } from 'src/app/shared/local-storage.service';
import { PopUpService } from 'src/app/shared/pop-up.service';
import { SubscribeService } from 'src/app/shared/subscribe.service';
import { TokenService } from 'src/app/shared/token.service';
import { UserService } from 'src/app/shared/user.service';
import { UtilsService } from 'src/app/shared/utils.service';

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.scss']
})
export class UserProfileComponent {

  user: User = new User(0, "", "", "", "", "", "", "", [], [], [], [], "", []);

  currentTab = 'events';

  needTutoSwipeTab: boolean = true;

  constructor(
    private userService: UserService,
    private utils: UtilsService,
    private tokenService: TokenService,
    private router: Router,
    private popup: PopUpService,
    private localStorage: LocalStorageService,
    private subscribeService: SubscribeService
    ) {}

  ngOnInit(): void {
    this.getUserById();
    this.isTutoNeeded();
  }

  getUserById(): void {
    this.userService.getIdByEmail(this.tokenService.getTokenFromLocalStorageAndDecode().sub).subscribe((id: number) => {
      this.userService.getById(id).subscribe((returnedUser: User) => {
        this.user = returnedUser;
        this.user.eventJoined.sort((a, b) => {
          return a.startingDate.localeCompare(b.startingDate);
        });
      });
    });
  }

  isTutoNeeded(): void {
    if(this.localStorage.getItem("needTutoSwipeProfile")){
      this.needTutoSwipeTab = false;
    }
  }

  closeTutoSwipeTab(): void {
    this.needTutoSwipeTab = false;
    this.localStorage.setItem("needTutoSwipeProfile", "false");
  }

  changeTabTo(newTab: string): void {
    this.currentTab = newTab;
  }

  onIntroReceive(text: string): void {
    this.userService.updateIntro(text);
  }

  onLeaveEventReceive(eventId: number){
    this.userService.getIdByEmail(this.tokenService.getTokenFromLocalStorageAndDecode().sub).subscribe((userId: number) => {
      this.subscribeService.bindEventWithUser(eventId, userId).subscribe((response: any) => {
        this.popup.addToList(new PopUp(response.message, response.type));
        this.getUserById();
      });
    });
  }

  onLogOut(): void {
    this.tokenService.resetToken();
    this.popup.addToList(new PopUp("Déconnecté·e, au revoir 👋","work"))
    this.router.navigate(['']);
  }

}