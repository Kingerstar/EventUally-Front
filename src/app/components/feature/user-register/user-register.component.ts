import { Component, } from '@angular/core';
import { UserRegister } from 'src/app/models/user-register.model';
import { AuthService } from 'src/app/shared/auth.service';

@Component({
  selector: 'app-user-register',
  templateUrl: './user-register.component.html',
  styleUrls: ['./user-register.component.scss']
})
export class UserRegisterComponent {

  usermodel: UserRegister = new UserRegister("", "", "");

  constructor(
    private authService: AuthService
    ) { }

  userReceiveFromChild(newUser: UserRegister): void {
    this.usermodel = newUser;
    this.authService.signUp(newUser);
  }
}






