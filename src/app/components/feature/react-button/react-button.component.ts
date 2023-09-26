import { Component } from '@angular/core';
import { PopUp } from 'src/app/models/pop-up.model';
import { PopUpService } from 'src/app/shared/pop-up.service';
import { TokenService } from 'src/app/shared/token.service';


@Component({
  selector: 'app-react-button',
  templateUrl: './react-button.component.html',
  styleUrls: ['./react-button.component.scss']
})
export class ReactButtonComponent {

  isClicked: boolean = false;
  totalReactions = 0;
  reactions: Record<string, number> = {
    '🫶': 0,
    '🥰': 0,
    '🎉': 0,
    '🤗': 0
  };
  isConnected: boolean = false;

  constructor(
    private tokenService: TokenService,
    private popup: PopUpService
  ){}

  ngOnInit(): void {
    if(this.tokenService.getTokenFromLocalStorageAndDecode()){
      this.isConnected = true;
    }
  }

  toggleReactList(): void {
    if(this.isConnected){
      this.isClicked = !this.isClicked;
    }else{
      this.popup.addToList(new PopUp("Tu dois être connecté·e pour réagir à un évènement 🔐", "error"));
    }
  }

  addReaction(reaction: string) {
    this.reactions[reaction]++
    this.totalReactions = this.calculateTotalReactions();

  }

  calculateTotalReactions(): number {
    let total = 0;
    Object.values(this.reactions).forEach(value => {
      total += value;
    });
    return total;
  }
}
