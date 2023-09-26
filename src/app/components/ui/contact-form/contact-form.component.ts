import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { ContactFormEmail } from 'src/app/models/contact-form-email.model';
import { PopUp } from 'src/app/models/pop-up.model';
import { ContactService } from 'src/app/shared/contact.service';
import { PopUpService } from 'src/app/shared/pop-up.service';

@Component({
  selector: 'app-contact-form',
  templateUrl: './contact-form.component.html',
  styleUrls: ['./contact-form.component.scss']
})
export class ContactFormComponent {

  pseudo: string = "";
  email: string = "";
  message: string = "";

  constructor(
    private popup: PopUpService,
    private router: Router,
    private contactService: ContactService
    ){}

  onInputReceive(inputText: string, where: string){
    if(where === 'pseudo'){
      this.pseudo = inputText;
    }else if(where === 'email'){
      this.email = inputText;
    }else if(where === 'message'){
      this.message = inputText;
    }
  }

  onSubmit(): void {
    this.contactService.sendEmail(new ContactFormEmail(
      "cultivibes@gmail.com",
      "Contact from eventUally - "+this.pseudo+" - "+this.email, this.message
      )).subscribe((response: PopUp) => {
        this.popup.addToList(new PopUp(response.contents, response.type));
        if(response.type === "work"){
          this.router.navigate(['']);
        }
    });
  }
}