import { Component } from '@angular/core';
import { Category } from 'src/app/models/category.model';
import { Localization } from 'src/app/models/localization.model';
import { Organization } from 'src/app/models/organization.model';
import { CategoriesService } from 'src/app/shared/categories.service';
import { DistrictsService } from 'src/app/shared/districts.service';
import { OrganizationService } from 'src/app/shared/organization.service';

@Component({
  selector: 'app-organization-register',
  templateUrl: './organization-register.component.html',
  styleUrls: ['./organization-register.component.scss']
})
export class OrganizationRegisterComponent {

  organization: Organization = new Organization(0, "", new Localization(0, "", "Bordeaux", "", [0, 0]), "", "", [], "", "", "", []);

  districtList: string[] = [];

  categoryList: Category[] = [];

  constructor(private districts: DistrictsService, private categories: CategoriesService, private organizationService: OrganizationService) { }

  ngOnInit(): void {
    this.districts.getAll().subscribe(data => {
      this.districtList = data;
    });
    this.categoryList = this.categories.getAll();
  }

  onFormReceive(event: Organization) {
    this.organizationService.post(event).subscribe();
  }
}
