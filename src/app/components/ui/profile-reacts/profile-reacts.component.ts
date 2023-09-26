import { Component, Input } from '@angular/core';
import { Reacts } from 'src/app/models/reacts.model';

@Component({
  selector: 'app-profile-reacts',
  templateUrl: './profile-reacts.component.html',
  styleUrls: ['./profile-reacts.component.scss']
})
export class ProfileReactsComponent {

  @Input()
  reacts!: Reacts[];

}
