import { Component } from '@angular/core';
import { Category } from '../../enums/category.enum';

@Component({
  selector: 'app-category-sidebar',
  templateUrl: './category-sidebar.component.html',
  styleUrls: ['./category-sidebar.component.css']
})
export class CategorySidebarComponent {
  categories = Object.values(Category);
  selectedCategories: string[] = [];
  isCategoriesVisible: boolean = false; // Initial state of the category list

  toggleCategories() {
    this.isCategoriesVisible = !this.isCategoriesVisible;
  }
}
