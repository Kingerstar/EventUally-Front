import { Component } from '@angular/core';
import { PopUp } from 'src/app/models/pop-up.model';
import { PopUpService } from 'src/app/shared/pop-up.service';

@Component({
  selector: 'app-pop-up-contents',
  templateUrl: './pop-up-contents.component.html',
  styleUrls: ['./pop-up-contents.component.scss']
})
export class PopUpContentsComponent {

  popUpList: PopUp[] = [];

  constructor(private popUpService: PopUpService){}

  ngOnInit(): void{
    this.popUpList = this.popUpService.getList();
  }
}
