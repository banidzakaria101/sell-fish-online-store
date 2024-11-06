import { Component, OnInit } from '@angular/core';
import { ProductService } from '../../services/product.service';
import { Product } from '../../models/product.model';

@Component({
  selector: 'app-home',
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.css']
})
export class HomePageComponent implements OnInit {
  products: Product[] = [];
  filteredProducts: Product[] = [];
  currentCategoryId: number | null = null;
  searchTerm: string = '';

  constructor(private productService: ProductService) {}

  ngOnInit(): void {
    this.loadProducts(); // Load all products initially
  }

  loadProducts(): void {
    this.productService.listProducts().subscribe({
      next: (data: Product[]) => {
        this.products = data;
        this.applyFilters(); // Apply initial filters
      },
      error: (error) => {
        console.error('Error fetching products:', error);
      }
    });
  }

  onCategorySelected(categoryId: number | null): void {
    this.currentCategoryId = categoryId;
    this.applyFilters();
  }

  onSearch(searchTerm: string): void {
    this.searchTerm = searchTerm;
    this.applyFilters();
  }

  private applyFilters(): void {
    let filtered = [...this.products];

    if (this.currentCategoryId !== null) {
      filtered = filtered.filter(product => product.category?.id === this.currentCategoryId);
    }

    if (this.searchTerm.trim()) {
      const searchLower = this.searchTerm.toLowerCase();
      filtered = filtered.filter(product =>
        product.name.toLowerCase().includes(searchLower) ||
        product.description.toLowerCase().includes(searchLower)
      );
    }

    this.filteredProducts = filtered;
  }

  clearFilters(): void {
    this.currentCategoryId = null; // Reset category ID
    this.searchTerm = ''; // Reset search term
    this.loadProducts(); // Reload all products
  }
}