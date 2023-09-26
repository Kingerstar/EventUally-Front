import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Category } from 'src/app/models/category.model';
import { Localization } from 'src/app/models/localization.model';
import { Organization } from 'src/app/models/organization.model';

@Component({
  selector: 'app-organization-register-form',
  templateUrl: './organization-register-form.component.html',
  styleUrls: ['./organization-register-form.component.scss']
})
export class OrganizationRegisterFormComponent {

  @Input() organization!: Organization;

  @Input() districtList!: string[];

  @Input() categoryList!: Category[];

  categorySelectedList: boolean[][] = [];

  inputPasswordEyeStatus: "open" | "close" = "close";

  @Output() formEmitted: EventEmitter<Organization> = new EventEmitter<Organization>();

  ngOnInit(): void{
    for(let i = 0; i < this.categoryList.length; i++){
      this.categorySelectedList.push([]);
      for(let j = 0; j < this.categoryList[i].subcategoryList.length; j++){
        this.categorySelectedList[i].push(false);
      }
    }
  }

  onSubmit(): void{
    this.formEmitted.emit(this.organization);
  }

  onReceiveLocalization(spot: Localization): void{
    this.organization.localization = spot;
  }

  onReceiveChoosedCategoryList(list: string[]): void{
    this.organization.categoryList = list;
  }

  checkboxClicked(indexCat: number, indexSubCat: number): void{
    this.categorySelectedList[indexCat][indexSubCat] = !this.categorySelectedList[indexCat][indexSubCat];
  }

  passwordEyeClicked(): void{
    let div = document.getElementsByClassName("input-password")[0];
    if(div.className.includes("close")){
      div.className = div.className.replace("close", "open");
      this.inputPasswordEyeStatus = "open";
    }else{
      div.className = div.className.replace("open", "close");
      this.inputPasswordEyeStatus = "close";
    }
  }
}