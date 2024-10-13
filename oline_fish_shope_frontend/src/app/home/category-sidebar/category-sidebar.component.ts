import { Component, OnInit, Input, OnChanges } from '@angular/core';
import { Category } from '../../models/category.model';
import { CategoryService } from '../../services/category.service';

@Component({
  selector: 'app-category-sidebar',
  templateUrl: './category-sidebar.component.html',
  styleUrls: ['./category-sidebar.component.css']
})
export class CategorySidebarComponent implements OnInit, OnChanges {
  @Input() selectedDepartmentId: number | null = null;
  allCategories: Category[] = [];
  displayedCategories: Category[] = [];
  loading: boolean = true;
  error: string | null = null;
  isCategoriesVisible: boolean = false;
  selectedCategoryId: number | null = null; 

  constructor(private categoryService: CategoryService) {}

  ngOnInit(): void {
    this.loadAllCategories();
  }

  ngOnChanges(): void {
    console.log('Selected Department ID in CategorySidebar:', this.selectedDepartmentId);
    if (this.selectedDepartmentId !== null) {
      this.filterCategoriesByDepartment(this.selectedDepartmentId);
    } else {
      this.displayedCategories = this.allCategories;
    }
  }

  loadAllCategories(): void {
    this.loading = true;
    this.categoryService.getCategories().subscribe(
      (data) => {
        this.allCategories = data;
        this.displayedCategories = data;
        this.loading = false;
      },
      (error) => {
        console.error('Error fetching categories:', error);
        this.error = 'Failed to load categories';
        this.loading = false;
      }
    );
  }

  filterCategoriesByDepartment(departmentId: number): void {
    if (departmentId) {
      this.displayedCategories = this.allCategories.filter(category =>
        category.departmentId === departmentId
      );
    } else {
      this.displayedCategories = this.allCategories;
    }
  }

  toggleCategories(): void {
    this.isCategoriesVisible = !this.isCategoriesVisible;
  }
}
