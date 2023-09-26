import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Category } from 'src/app/models/category.model';

@Component({
  selector: 'app-categories-form',
  templateUrl: './categories-form.component.html',
  styleUrls: ['./categories-form.component.scss']
})
export class CategoriesFormComponent {

  @Input() categoryList!: Category[];

  @Output() emitChoosedCategoryList: EventEmitter<string[]> = new EventEmitter<string[]>();

  categorySelectedList: boolean[][] = [];

  choosedCategoryList: string[] = [];

  firstCategoryPicked: number[] = [-1,-1];

  ngOnInit(): void {
    for(let i = 0; i < this.categoryList.length; i++){
      this.categorySelectedList.push([]);
      for(let j = 0; j < this.categoryList[i].subcategoryList.length+1; j++){
        this.categorySelectedList[i].push(false);
      }
    }
  }

  checkboxPrimaryCategoryClicked(index: number): void {
    this.categorySelectedList[index][0] = !this.categorySelectedList[index][0];
    if(this.choosedCategoryList.includes(this.categoryList[index].category)){
      this.choosedCategoryList.splice(this.choosedCategoryList.indexOf(this.categoryList[index].category), 1);
    }else{
      this.choosedCategoryList.push(this.categoryList[index].category);
    }

    if(this.firstCategoryPicked[0] === -1 && this.firstCategoryPicked[1] === -1){
      this.firstCategoryPicked[0] = index;
      this.firstCategoryPicked[1] = 0;
    }
    if(this.categorySelectedList[this.firstCategoryPicked[0]][this.firstCategoryPicked[1]] === false){
      this.firstCategoryPicked[0] = -1;
      this.firstCategoryPicked[1] = -1;
    }
  }

  checkboxClicked(indexCat: number, indexSubCat: number): void {
    this.categorySelectedList[indexCat][indexSubCat+1] = !this.categorySelectedList[indexCat][indexSubCat+1];
    if(this.categorySelectedList[indexCat][indexSubCat+1]){//it become true/choosed
      if(this.firstCategoryPicked[0] === -1 && this.firstCategoryPicked[1] === -1){
        this.choosedCategoryList.unshift(this.categoryList[indexCat].subcategoryList[indexSubCat]);
      }else{
        this.choosedCategoryList.push(this.categoryList[indexCat].subcategoryList[indexSubCat]);
      }
    }else{
      this.choosedCategoryList = this.choosedCategoryList.filter(e => e !== this.categoryList[indexCat].subcategoryList[indexSubCat]);
    }

    if(this.firstCategoryPicked[0] === -1 && this.firstCategoryPicked[1] === -1){
      this.firstCategoryPicked[0] = indexCat;
      this.firstCategoryPicked[1] = indexSubCat+1;
    }
    if(this.categorySelectedList[this.firstCategoryPicked[0]][this.firstCategoryPicked[1]] === false){
      this.firstCategoryPicked[0] = -1;
      this.firstCategoryPicked[1] = -1;
    }
  }

  onCheckboxChange(): void {
    this.emitChoosedCategoryList.emit(this.choosedCategoryList);
  }
}
