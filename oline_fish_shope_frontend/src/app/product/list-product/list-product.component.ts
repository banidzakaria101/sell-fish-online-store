import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ProductService } from '../../services/product.service';
import { Product } from '../../models/product.model';
import { CartService } from '../../services/cart.service';

@Component({
  selector: 'app-list-product',
  templateUrl: './list-product.component.html',
  styleUrls: ['./list-product.component.scss']
})
export class ListProductComponent implements OnInit {
  @Input() products: Product[] = [];
  @Input() selectedCategoryId: number | null = null; // Accept selected category ID
  filteredProducts: Product[] = [];

  constructor(
    private productService: ProductService,
    public cartService: CartService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.loadProducts();
  }

  ngOnChanges(): void {
    this.filterProductsByCategory(this.selectedCategoryId); // Filter when category ID changes
  }

  loadProducts(): void {
    this.productService.listProducts().subscribe({
      next: (products) => {
        this.products = products;
        this.filteredProducts = products;
        console.log('Products loaded:', products);
      },
      error: (error) => {
        console.error('Error loading products:', error);
      }
    });
  }

  filterProductsByCategory(selectedCategoryId: number | null): void {
    if (selectedCategoryId) {
      console.log(selectedCategoryId);
      this.filteredProducts = this.products.filter(product => product.category?.id === selectedCategoryId);
    } else {
      this.filteredProducts = this.products; 
    }
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
