import { Component, Input } from '@angular/core';
import { Organization } from 'src/app/models/organization.model';

@Component({
  selector: 'app-profile-orga',
  templateUrl: './profile-orga.component.html',
  styleUrls: ['./profile-orga.component.scss']
})
export class ProfileOrgaComponent {

  @Input()
  organizationFollowed!: Organization[];

}
