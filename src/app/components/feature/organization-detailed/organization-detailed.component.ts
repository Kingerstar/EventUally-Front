import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Localization } from 'src/app/models/localization.model';
import { Organization } from 'src/app/models/organization.model';
import { PopUp } from 'src/app/models/pop-up.model';
import { OrganizationService } from 'src/app/shared/organization.service';
import { PopUpService } from 'src/app/shared/pop-up.service';
import { UtilsService } from 'src/app/shared/utils.service';

@Component({
  selector: 'app-organization-detailed',
  templateUrl: './organization-detailed.component.html',
  styleUrls: ['./organization-detailed.component.scss']
})
export class OrganizationDetailedComponent {

  organization: Organization = new Organization(0, "...", new Localization(0, "...", "...", "...", []), "...", "...", [], "...", "...", "...", []);

  constructor(
    private organizationService: OrganizationService,
    private router: Router,
    private popup: PopUpService,
    private utils: UtilsService
  ) { }

  ngOnInit(): void {
    let currentUrl = this.router.url.replace("/organization/", "");
    let id = currentUrl.match(/^\d+/)?.[0] as string;

    this.organizationService.getById(id).subscribe((organizationFounded) => {
      if (organizationFounded && this.utils.convertIdNameToUrl(organizationFounded.id, organizationFounded.name) === currentUrl) {
        this.organization = organizationFounded;
      } else {
        this.popup.addToList(new PopUp("Organisation non trouvée 😥", "error"));
        this.router.navigate(['/error']);
      }
    });
  }
}
