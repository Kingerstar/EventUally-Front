import { Component, EventEmitter, Output } from '@angular/core';
import { UserAuth } from 'src/app/models/user-auth.model';

@Component({
  selector: 'app-login-form',
  templateUrl: './login-form.component.html',
  styleUrls: ['./login-form.component.scss']
})
export class LoginFormComponent {

  user: UserAuth = new UserAuth("","");

  @Output() emitForm: EventEmitter<UserAuth> = new EventEmitter;

  onInputReceive(inputText: string, where: string){
    if(where === 'email'){
      this.user.email = inputText;
    }else if(where === 'password'){
      this.user.password = inputText;
    }
  }
  
  onSubmit(): void{
    this.emitForm.emit(this.user);
  }
}
