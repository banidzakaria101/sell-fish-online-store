import { Component, OnInit } from '@angular/core';
import { DepartmentService } from '../../services/department.service';
import { CategoryService } from '../../services/category.service';
import { Department } from '../../models/department.model';
import { Category } from '../../models/category.model';

@Component({
  selector: 'app-department',
  templateUrl: './department.component.html',
  styleUrls: ['./department.component.css']
})
export class DepartmentComponent implements OnInit {
  departments: Department[] = [];
  categories: Category[] = [];
  selectedDepartmentId: number | null = null;
  loading: boolean = true;
  loadingCategories: boolean = false;
  error: string | null = null;
  isDepartmentsVisible: boolean = true;
  selectedCategoryId: number | null = null; 

  constructor(
    private departmentService: DepartmentService,
    private categoryService: CategoryService
  ) {}

  ngOnInit(): void {
    this.loadDepartments();
  }

  loadDepartments(): void {
    this.loading = true;
    this.departmentService.getDepartments().subscribe(
      (data) => {
        this.departments = data;
        this.loading = false;
      },
      (error) => {
        console.error('Error fetching departments:', error);
        this.loading = false;
      }
    );
  }

  toggleDepartments(): void {
    this.isDepartmentsVisible = !this.isDepartmentsVisible;
  }

  onToggleDepartment(departmentId: number): void {
    this.selectedDepartmentId = this.selectedDepartmentId === departmentId ? null : departmentId;
    this.loadCategories(this.selectedDepartmentId);
  }

  onSelectCategory(categoryId: number): void {
    this.selectedCategoryId = this.selectedCategoryId === categoryId ? null : categoryId;
  }

  loadCategories(departmentId: number | null): void {
    if (departmentId) {
      this.loadingCategories = true;
      this.categoryService.getCategoriesByDepartment(departmentId).subscribe(
        (data) => {
          this.categories = data;
          this.loadingCategories = false;
        },
        (error) => {
          console.error('Error fetching categories:', error);
          this.loadingCategories = false;
        }
      );
    } else {
      this.categories = [];
    }
  }
}
