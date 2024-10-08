import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { CategoryService } from '../../services/category.service'; // Ensure correct path
import { Category } from '../../models/category.model'; // Ensure correct path

@Component({
  selector: 'app-category-sidebar',
  templateUrl: './category-sidebar.component.html',
  styleUrls: ['./category-sidebar.component.css']
})
export class CategorySidebarComponent implements OnInit {
  categories: Category[] = [];

  // Emit the selected category to the parent component
  @Output() categorySelected: EventEmitter<Category> = new EventEmitter<Category>();

  constructor(private categoryService: CategoryService) {}

  ngOnInit(): void {
    // Fetch categories when component loads
    this.categoryService.getCategories().subscribe(
      (data: Category[]) => {
        this.categories = data;
      },
      (error) => {
        console.error('Error fetching categories:', error);
      }
    );
  }

  // Emit the selected category to the parent component
  selectCategory(category: Category): void {
    this.categorySelected.emit(category);
  }

  getCategoryIcon(category: Category): string {
    // Map category names to emoji icons
    const iconMap: {[key: string]: string} = {
      'Fresh Fish': '🐟',
      'Shellfish': '🦐',
      'Sushi Grade': '🍣',
      'Cephalopods': '🐙',
      'Crustaceans': '🦀',
      'Canned Fish': '🥫'
    };
    return iconMap[category.name] || '';
  }
}
