import { Component } from '@angular/core';
import { PopUp } from 'src/app/models/pop-up.model';
import { LocalStorageService } from 'src/app/shared/local-storage.service';
import { PopUpService } from 'src/app/shared/pop-up.service';

@Component({
  selector: 'app-help-advice',
  templateUrl: './help-advice.component.html',
  styleUrls: ['./help-advice.component.scss']
})
export class HelpAdviceComponent {

  constructor(private popup: PopUpService, private localStorage: LocalStorageService){}

  resetLocalStorageTuto(): void{
    this.localStorage.resetTuto();
    this.popup.addToList(new PopUp("Tutoriel accessible 🎓", "work"));
  }
}
