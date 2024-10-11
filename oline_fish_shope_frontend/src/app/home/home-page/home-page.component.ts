import { Component, OnInit } from '@angular/core';
import { ProductService } from '../../services/product.service';
import { Product } from '../../models/product.model';
import { Category } from '../../models/category.model';

@Component({
  selector: 'app-home',
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.css']
})
export class HomePageComponent implements OnInit {
  products: Product[] = [];
  filteredProducts: Product[] = [];
  currentCategory: Category | null = null;
  searchTerm: string = '';

  constructor(private productService: ProductService) {}

  ngOnInit(): void {
    this.productService.listProducts().subscribe({
      next: (data: Product[]) => {
        this.products = data;
        this.filteredProducts = data;
      },
      error: (error) => {
        console.error('Error fetching products:', error);
      }
    });
  }

  onCategorySelected(category: Category): void {
    this.currentCategory = category;
    this.applyFilters();
  }

  onSearch(searchTerm: string): void {
    this.searchTerm = searchTerm;
    this.applyFilters();
  }

  private applyFilters(): void {
    let filtered = [...this.products];

    if (this.currentCategory) {
      filtered = filtered.filter(product =>
        product.category?.id === this.currentCategory?.id
      );
    }

    if (this.searchTerm.trim()) {
      const searchLower = this.searchTerm.toLowerCase();
      filtered = filtered.filter(product =>
        product.name.toLowerCase().includes(searchLower));
    }

    this.filteredProducts = filtered;
  }

  clearFilters(): void {
    this.currentCategory = null;
    this.searchTerm = '';
    this.filteredProducts = [...this.products];
  }
}
