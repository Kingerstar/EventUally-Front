import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { Event } from 'src/app/models/event.model';
import { Organization } from 'src/app/models/organization.model';
import { PopUp } from 'src/app/models/pop-up.model';
import { User } from 'src/app/models/user.model';
import { EventService } from 'src/app/shared/event.service';
import { OrganizationService } from 'src/app/shared/organization.service';
import { PopUpService } from 'src/app/shared/pop-up.service';
import { SvgPathService } from 'src/app/shared/svg-path.service';
import { UserService } from 'src/app/shared/user.service';
import { UtilsService } from 'src/app/shared/utils.service';

@Component({
  selector: 'app-admin-manager',
  templateUrl: './admin-manager.component.html',
  styleUrls: ['./admin-manager.component.scss']
})
export class AdminManagerComponent {

  currentTabName: "" | "users" | "organizations" | "events" = "";

  serverReturn: any;

  typeOfInteraction: string = "";
  
  objectSelected!: User | Organization | Event;

  constructor(
    private utils: UtilsService,
    private svgPathService: SvgPathService,
    private popup: PopUpService,
    private userService: UserService,
    private organizationService: OrganizationService,
    private eventService: EventService
    ){}

  switchTabTo(newTabName: "" | "users" | "organizations" | "events"){
    this.currentTabName = newTabName;
    if(this.currentTabName === "users"){
      this.userService.getAll().subscribe(json => this.serverReturn = json);
    }else if(this.currentTabName === "organizations"){
      this.organizationService.getAll().subscribe(json => this.serverReturn = json);
    }else if(this.currentTabName === "events"){
      this.eventService.getAll().subscribe(json => this.serverReturn = json);
    }else{
      this.serverReturn = "";
    }
  }

  shortDate(date: string): string{
    if(date === undefined){return "";}
    return this.utils.convertDateTo(date, 'd/M/yy H:m');
  }

  getSvg(name: string, type: 'title' | 'attr.d'): string{
    if(type === 'title'){
      return this.svgPathService.getTitlePathD(name)[0];
    }
    return this.svgPathService.getTitlePathD(name)[1];
  }

  updateById(element: User | Organization | Event){
    this.typeOfInteraction = "update";
    this.objectSelected = element;
  }

  deleteById(element: User | Organization | Event){
    this.typeOfInteraction = "delete";
    this.objectSelected = element;
  }

  onPopupReceive(value: string | User | Organization | Event){
    this.typeOfInteraction = ""; // close popup

    if(value === "delete"){

      if(this.currentTabName === "users"){
        this.userService.deleteById(this.objectSelected.id).subscribe((serverVerbose: string[]) => {
              this.popup.addToList(new PopUp(serverVerbose[0], (serverVerbose[1] as "work" | "error" )));
              this.userService.getAll().subscribe(json => this.serverReturn = json);
            });
      }else if(this.currentTabName === "organizations"){
        this.organizationService.deleteById(this.objectSelected.id).subscribe((serverVerbose: string[]) => {
          this.popup.addToList(new PopUp(serverVerbose[0], (serverVerbose[1] as "work" | "error" )));
          this.organizationService.getAll().subscribe(json => this.serverReturn = json);
        });
      }else if(this.currentTabName === "events"){
        this.eventService.deleteById(this.objectSelected.id).subscribe((serverVerbose: string[]) => {
          this.popup.addToList(new PopUp(serverVerbose[0], (serverVerbose[1] as "work" | "error" )));
          this.eventService.getAll().subscribe(json => this.serverReturn = json);
        });
      }
    }else if(value !== "close popup"){
      if(this.currentTabName === "users"){
        this.userService.putById((value as any).id, (value as User)).subscribe((serverVerbose: string[]) => {
            this.popup.addToList(new PopUp(serverVerbose[0], (serverVerbose[1] as "work" | "error")));
            this.userService.getAll().subscribe(json => this.serverReturn = json);
          });
      }else if(this.currentTabName === "organizations"){
        this.organizationService.putById((value as any).id, (value as Organization)).subscribe((serverVerbose: string[]) => {
          this.popup.addToList(new PopUp(serverVerbose[0], (serverVerbose[1] as "work" | "error")));
          this.organizationService.getAll().subscribe(json => this.serverReturn = json);
        });
      }else if(this.currentTabName === "events"){
        this.eventService.putById((value as any).id, (value as Event)).subscribe((serverVerbose: string[]) => {
          this.popup.addToList(new PopUp(serverVerbose[0], (serverVerbose[1] as "work" | "error")));
          this.eventService.getAll().subscribe(json => this.serverReturn = json);
        });
      }      
    }
  }
}
