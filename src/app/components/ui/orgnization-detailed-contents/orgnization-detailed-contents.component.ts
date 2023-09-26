import { Component, Input } from '@angular/core';
import { Organization } from 'src/app/models/organization.model';

@Component({
  selector: 'app-orgnization-detailed-contents',
  templateUrl: './orgnization-detailed-contents.component.html',
  styleUrls: ['./orgnization-detailed-contents.component.scss']
})
export class OrgnizationDetailedContentsComponent {

  @Input() organization!: Organization;


  ngAfterViewInit() { console.log(this.organization) }

}

