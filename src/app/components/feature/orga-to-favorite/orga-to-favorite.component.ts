import { Component, Input } from '@angular/core';
import { PopUp } from 'src/app/models/pop-up.model';
import { User } from 'src/app/models/user.model';
import { PopUpService } from 'src/app/shared/pop-up.service';
import { SubscribeService } from 'src/app/shared/subscribe.service';
import { TokenService } from 'src/app/shared/token.service';
import { UserService } from 'src/app/shared/user.service';

@Component({
  selector: 'app-orga-to-favorite',
  templateUrl: './orga-to-favorite.component.html',
  styleUrls: ['./orga-to-favorite.component.scss']
})
export class OrgaToFavoriteComponent {

  @Input()
  receivedId!: number;
  isConnected: boolean = false;
  isOrgaFollowed: boolean = false;


  constructor(private userService: UserService,
    private subscribeService: SubscribeService,
    private tokenService: TokenService,
    private popup: PopUpService
  ) { }

  ngOnInit(): void {
    this.checkConnection();
    this.checkIfOrgaIsStillFollowed();
  }

  checkConnection(): void {
    if (this.tokenService.getTokenFromLocalStorageAndDecode()) {
      this.isConnected = true;
    }
  }

  joinOrga(): void {
    if (this.isConnected && this.tokenService.getTokenFromLocalStorageAndDecode()) {
      this.userService.getIdByEmail(this.tokenService.getTokenFromLocalStorageAndDecode().sub).subscribe((id: number) => {
        this.subscribeService.bindOrgaWithUser(this.receivedId, id).subscribe((response: any) => {
          this.popup.addToList(new PopUp(response.message, response.type));
          this.checkIfOrgaIsStillFollowed();
        });
      });
    }
  }

  checkIfOrgaIsStillFollowed(): void {
    if (this.tokenService.getTokenFromLocalStorageAndDecode()) {
      this.userService.getIdByEmail(this.tokenService.getTokenFromLocalStorageAndDecode().sub)
        .subscribe((id: number) => {
          this.userService.getById(id).subscribe((user: User) => {
            this.isOrgaFollowed = false;
            for (let i = 0; i < user.organizationFollowed.length; i++) {
              if (user.organizationFollowed[i].id === this.receivedId) {
                this.isOrgaFollowed = true;
                break;
              }
            }
          });
        });
    } else {
      this.popup.addToList(new PopUp("Tu dois être connecté·e pour une organisation en favori ! 🔐", "error"));
    }
  }
}

