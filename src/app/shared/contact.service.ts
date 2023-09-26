import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { UtilsService } from './utils.service';
import { ContactFormEmail } from '../models/contact-form-email.model';
import { PopUp } from '../models/pop-up.model';

@Injectable({
  providedIn: 'root'
})
export class ContactService {

  constructor(private http: HttpClient, private utils: UtilsService) { }

  sendEmail(newMessage: ContactFormEmail): Observable<PopUp> {
    return this.http.post<PopUp>(this.utils.baseUrl() + 'email', newMessage);
  }
}
