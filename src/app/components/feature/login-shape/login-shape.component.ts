import { Component } from '@angular/core';
import { UserAuth } from 'src/app/models/user-auth.model';
import { AuthService } from 'src/app/shared/auth.service';

@Component({
  selector: 'app-login-shape',
  templateUrl: './login-shape.component.html',
  styleUrls: ['./login-shape.component.scss']
})
export class LoginShapeComponent {

  constructor(
    private authService: AuthService
    ){}

  onReceiveForm(user: UserAuth): void{
    this.authService.signIn(user);
  }
}
