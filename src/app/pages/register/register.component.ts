import { Component } from '@angular/core';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent {

  wichForm: "user" | "organization" = "user";

  switchForm():void {
    if(this.wichForm === "user"){
      this.wichForm = "organization";
    }else{
      this.wichForm = "user";
    }
  }

}
