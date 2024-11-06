import { Component, Input, OnInit, OnChanges, SimpleChanges } from '@angular/core';
import { Router } from '@angular/router';
import { ProductService } from '../../services/product.service';
import { Product } from '../../models/product.model';
import { CartService } from '../../services/cart.service';

@Component({
  selector: 'app-list-product',
  templateUrl: './list-product.component.html',
  styleUrls: ['./list-product.component.scss']
})
export class ListProductComponent implements OnInit, OnChanges {
  @Input() selectedCategoryId: number | null = null;
  @Input() searchTerm: string = '';
  products: Product[] = [];
  filteredProducts: Product[] = [];

  constructor(
    private productService: ProductService,
    public cartService: CartService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.loadProducts();  // Load products initially
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['selectedCategoryId'] || changes['searchTerm']) {
      this.loadProducts();  // Reload products when the selected category or search term changes
    }
  }

  loadProducts(): void {
    if (this.selectedCategoryId !== null) {
      // Load products filtered by category
      this.productService.getProductsByCategory(this.selectedCategoryId).subscribe({
        next: (products) => {
          this.products = products;
          this.applyFilters();  // Apply filters after fetching products
        },
        error: (error) => {
          console.error('Error loading category products:', error);
        }
      });
    } else {
      // Load all products if no category is selected
      this.productService.listProducts().subscribe({
        next: (products) => {
          this.products = products;
          this.applyFilters();  // Apply filters after fetching all products
        },
        error: (error) => {
          console.error('Error loading products:', error);
        }
      });
    }
  }

  private applyFilters(): void {
    let filtered = [...this.products];

    // Apply search term filter
    if (this.searchTerm.trim()) {
      const searchLower = this.searchTerm.toLowerCase();
      filtered = filtered.filter(product =>
        product.name.toLowerCase().includes(searchLower) ||
        product.description.toLowerCase().includes(searchLower)
      );
    }

    this.filteredProducts = filtered;
  }

  viewProduct(id: number | undefined): void {
    if (id) {
      this.router.navigate(['/product', id]);
    }
  }

  toggleFavorite(event: Event, id: number | undefined): void {
    event.stopPropagation();
    if (id) {
      const product = this.products.find(p => p.id === id);
      if (product) {
        product.isFavorite = !product.isFavorite;
      }
    }
  }

  toggleBasket(product: Product): void {
    if (this.cartService.isProductInCart(product.id)) {
      this.cartService.removeFromCart(product);
    } else {
      this.cartService.addToCart(product);
    }
  }
}