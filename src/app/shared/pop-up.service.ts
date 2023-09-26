import { Injectable } from '@angular/core';
import { PopUp } from '../models/pop-up.model';

@Injectable({
  providedIn: 'root'
})
export class PopUpService {

  private _popUpList: PopUp[] = [];

  getList(): PopUp[]{
    return this._popUpList;
  }
  
  addToList(newPopUp: PopUp): void{
    let displayTime = 3000;
    if(newPopUp.type === "error"){
      displayTime = 4000;
    }
    this._popUpList.push(newPopUp);
    setTimeout(() => {
      this.removeFirst();
    }, displayTime);
  }

  private removeFirst(): void{
    this._popUpList.shift();
  }
}
