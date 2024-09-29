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

  constructor(private productService: ProductService) {}

  ngOnInit(): void {
    // Fetch all products initially
    this.productService.listProducts().subscribe(
      (data: Product[]) => {
        this.products = data;
        this.filteredProducts = data; // Show all products initially
      },
      (error) => {
        console.error('Error fetching products:', error);
      }
    );
  }

  // Handle category selection from sidebar
  onCategorySelected(category: Category): void {
    this.filteredProducts = this.products.filter(product => product.category?.id === category.id);
  }
}
