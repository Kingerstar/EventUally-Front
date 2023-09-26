import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { Category } from 'src/app/models/category.model';
import { CategoriesService } from 'src/app/shared/categories.service';
import { SvgPathService } from 'src/app/shared/svg-path.service';


@Component({
  selector: 'app-filter',
  templateUrl: './filter.component.html',
  styleUrls: ['./filter.component.scss']
})
export class FilterComponent implements OnInit {

  @Output()
  selectedCategoriesChange: EventEmitter<string[]> = new EventEmitter<string[]>();
  @Output()
  selectedSubCategoriesChange: EventEmitter<string[]> = new EventEmitter<string[]>();

  selectedCategories: string[] = [];
  selectedSubcategories: string[] = [];
  toggleIsClicked = false;
  categories: Category[] = [];

  constructor(private categoriesService: CategoriesService, private svgPathService: SvgPathService) { }

  ngOnInit(): void {
    this.getCategories();
  }
  getCategories(): void {
    this.categories = this.categoriesService.getAll();
  }

  isCategorySelected(category: Category): boolean {
    return this.selectedCategories.includes(category.category);
  }

  isSubcategorySelected(subcategory: string): boolean {
    return this.selectedSubcategories.includes(subcategory);
  }

  toggleCategory(category: Category): void {
    const index = this.selectedCategories.indexOf(category.category);
    if (index === -1) {
      this.selectedCategories.push(category.category);
    } else {
      this.selectedCategories.splice(index, 1);
    }
    this.selectedCategoriesChange.emit(this.selectedCategories);
  }

  toggleSubcategory(subcategory: string): void {
    const index = this.selectedSubcategories.indexOf(subcategory);
    if (index === -1) {
      this.selectedSubcategories.push(subcategory);
    } else {
      this.selectedSubcategories.splice(index, 1);
    }
    this.selectedSubCategoriesChange.emit(this.selectedSubcategories);
  }

  resetSelections(): void {
    this.selectedCategories = [];
    this.selectedSubcategories = [];
    this.selectedCategoriesChange.emit(this.selectedCategories);
    this.selectedSubCategoriesChange.emit(this.selectedSubcategories);
  }

  getCloseSvg(): string[]{
    return this.svgPathService.getTitlePathD("fermer");
  }

  isFiltered(): boolean {
    return this.selectedCategories.length > 0 || this.selectedSubcategories.length > 0;
  }
}
