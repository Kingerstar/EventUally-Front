import { Component, EventEmitter, Input, Output } from '@angular/core';
import { UserRegister } from 'src/app/models/user-register.model';


@Component({
  selector: 'app-user-register-form',
  templateUrl: './user-register-form.component.html',
  styleUrls: ['./user-register-form.component.scss']
})
export class UserRegisterFormComponent {

  @Output()
  newUser: EventEmitter<UserRegister> = new EventEmitter<UserRegister>();

  usermodel: UserRegister = new UserRegister("","","");
  regexp: RegExp = /(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}/;

  onInputReceive(event: string, type: string): void {
    if(type === "pseudo"){
      this.usermodel.pseudo = event;
    }else if(type === "email"){
      this.usermodel.email = event;
    }else if(type === "password"){
      this.usermodel.password = event;
    }
  }

  onSubmit(): void {
    this.newUser.emit(this.usermodel);
  }

}
