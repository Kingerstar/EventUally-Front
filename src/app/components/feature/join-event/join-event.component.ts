import { Component, Input } from '@angular/core';
import { PopUp } from 'src/app/models/pop-up.model';
import { PopUpService } from 'src/app/shared/pop-up.service';
import { User } from 'src/app/models/user.model';
import { SubscribeService } from 'src/app/shared/subscribe.service';
import { TokenService } from 'src/app/shared/token.service';
import { UserService } from 'src/app/shared/user.service';

@Component({
  selector: 'app-join-event',
  templateUrl: './join-event.component.html',
  styleUrls: ['./join-event.component.scss']
})
export class JoinEventComponent {

  @Input()
  receivedId!: number;

  isConnected: boolean = false;

  isEventFollowed: boolean = false;


  constructor(
    private subscribeService: SubscribeService,
    private popup: PopUpService,
    private tokenService: TokenService,
    private userService: UserService
  ) { }

  ngOnInit(): void {
    this.checkConnection();
    this.checkIfEventIsStillFollowed();
  }

  checkConnection(): void {
    if (this.tokenService.getTokenFromLocalStorageAndDecode()) {
      this.isConnected = true;
    }
  }

  checkIfEventIsStillFollowed(): void {
    if (this.tokenService.getTokenFromLocalStorageAndDecode()) {
      this.userService.getIdByEmail(this.tokenService.getTokenFromLocalStorageAndDecode().sub)
        .subscribe((id: number) => {
          this.userService.getById(id).subscribe((user: User) => {
            this.isEventFollowed = false;
            for (let i = 0; i < user.eventJoined.length; i++) {
              if (user.eventJoined[i].id === this.receivedId) {
                this.isEventFollowed = true;
                break;
              }
            }
          });
        });
    }
  }

  joinEvent(): void {
    if (this.isConnected && this.tokenService.getTokenFromLocalStorageAndDecode()) {
      this.userService.getIdByEmail(this.tokenService.getTokenFromLocalStorageAndDecode().sub).subscribe((id: number) => {
        this.subscribeService.bindEventWithUser(this.receivedId, id).subscribe((response: any) => {
          this.popup.addToList(new PopUp(response.message, response.type));
          this.checkIfEventIsStillFollowed();
        });
      });
    } else {
      this.popup.addToList(new PopUp("Tu dois être connecté·e pour rejoindre un évènement 🔐", "error"));
    }
  }
}