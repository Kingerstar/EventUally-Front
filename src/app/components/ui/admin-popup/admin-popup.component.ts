import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Event } from 'src/app/models/event.model';
import { Organization } from 'src/app/models/organization.model';
import { User } from 'src/app/models/user.model';

@Component({
  selector: 'app-admin-popup',
  templateUrl: './admin-popup.component.html',
  styleUrls: ['./admin-popup.component.scss']
})
export class AdminPopupComponent {

  @Input() objectSelected!: User | Organization | Event;
  @Input() tab!: string;
  @Input() interaction!: string;

  @Output() dataSended: EventEmitter<string | User | Organization | Event> = new EventEmitter();

  closePopup(event: any){// HTML
    if(event.target.className === "admin-popup-all" || event.target.className.includes("cancel")){
      this.dataSended.emit("close popup");
    }
  }

  performAction(): void{
    if(this.interaction === "delete"){
      this.dataSended.emit("delete");
    }else{
      this.dataSended.emit(this.objectSelected);
    }
  }
}
