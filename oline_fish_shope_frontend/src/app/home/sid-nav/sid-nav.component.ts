import { Component, OnInit } from '@angular/core';
import { Category } from '../../models/category.model';
import { Department } from '../../models/department.model';
import { CategoryService } from '../../services/category.service';
import { DepartmentService } from '../../services/department.service';
import { ProductService } from '../../services/product.service';


@Component({
  selector: 'app-sid-nav',
  templateUrl: './sid-nav.component.html',
  styleUrls: ['./sid-nav.component.css']
})
export class SidNavComponent implements OnInit {

  salaryRange: number[] = [20, 600];
  departments: Department[] = [];
  categories: Category[] = [];
  selectedDepartments: string[] = [];
  selectedCategories: string[] = [];
  selectedRating: number | null = null;

  // Use a specific type instead of index signature
  isExpanded: {
    salaryRange: boolean;
    department: boolean;
    category: boolean;
  } = {
    salaryRange: true,
    department: true,
    category: true
  };

  constructor(
    private departmentService: DepartmentService,
    private categoryService: CategoryService,
    private productService: ProductService
  ) {}

  ngOnInit(): void {
    this.loadDepartments();
    this.loadCategories();
  }

  loadDepartments(): void {
    this.departmentService.getDepartments().subscribe(departments => {
      this.departments = departments;
    });
  }

  loadCategories(): void {
    this.categoryService.getCategories().subscribe(categories => {
      this.categories = categories;
    });
  }

  clearAllFilters(): void {
    this.salaryRange = [20, 600];
    this.selectedDepartments = [];
    this.selectedCategories = [];
    this.selectedRating = null;
  }

  toggleSection(section: 'salaryRange' | 'department' | 'category'): void {
    this.isExpanded[section] = !this.isExpanded[section]; // No error here
  }

  isSectionExpanded(section: 'salaryRange' | 'department' | 'category'): boolean {
    return this.isExpanded[section]; // No error here
  }


}
