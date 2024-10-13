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
  selectedDepartmentId: number | null = null; // Track selected department
  loading: boolean = true;
  loadingCategories: boolean = false;
  error: string | null = null;

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

  onHoverDepartment(departmentId: number): void {
    if (this.selectedDepartmentId === null) {
      this.loadingCategories = true;
      this.categoryService.getCategoriesByDepartment(departmentId).subscribe(
        (data) => {
          this.categories = data; // Load categories for the hovered department
          this.loadingCategories = false;
        },
        (error) => {
          console.error('Error fetching categories for department:', error);
          this.error = 'Failed to load categories';
          this.loadingCategories = false;
        }
      );
    }
  }

  onClickDepartment(departmentId: number): void {
    this.selectedDepartmentId = departmentId; // Fix the selected department
    this.loadingCategories = true;
    this.categoryService.getCategoriesByDepartment(departmentId).subscribe(
      (data) => {
        this.categories = data; // Load categories for the selected department
        this.loadingCategories = false;
      },
      (error) => {
        console.error('Error fetching categories for department:', error);
        this.error = 'Failed to load categories';
        this.loadingCategories = false;
      }
    );
  }

  onSelectCategory(categoryId: number): void {
    console.log('Selected Category ID:', categoryId);
    // Handle category selection logic here
  }

  onLeaveDepartment(): void {
    if (this.selectedDepartmentId === null) {
      this.categories = []; 
    }
  }
}
