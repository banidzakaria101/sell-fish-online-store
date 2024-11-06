import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { Category } from '../../models/category.model';
import { CategoryService } from '../../services/category.service';

@Component({
  selector: 'app-category-sidebar',
  templateUrl: './category-sidebar.component.html',
  styleUrls: ['./category-sidebar.component.css']
})
export class CategorySidebarComponent implements OnInit {
  categories: Category[] = [];
  selectedCategory: Category | null = null;

  constructor(private categoryService: CategoryService) {}

  @Output() categorySelected = new EventEmitter<number | null>();

  

  ngOnInit(): void {
    this.loadCategories();
  }

  loadCategories(): void {
    this.categoryService.getCategories().subscribe(
      (data: Category[]) => {
        this.categories = data;
      },
      (error) => {
        console.error('Error fetching categories', error);
      }
    );
  }

  selectCategory(category: Category): void {
    this.selectedCategory = category;
    this.categorySelected.emit(category.id);
    console.log(category)
  }

  clearCategorySelection(): void {
    this.selectedCategory = null;
    this.categorySelected.emit(null);
  }
}
