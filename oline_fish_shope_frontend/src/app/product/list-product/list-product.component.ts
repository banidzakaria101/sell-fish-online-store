// list-product.component.ts
import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ProductService } from '../../services/product.service';
import { Product } from '../../models/product.model';

@Component({
  selector: 'app-list-product',
  templateUrl: './list-product.component.html',
  styleUrls: ['./list-product.component.scss']
})
export class ListProductComponent implements OnInit {
  @Input() products: Product[] = [];

  constructor(
    private productService: ProductService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.loadProducts();
  }

  loadProducts(): void {
    this.productService.listProducts().subscribe({
      next: (products) => {
        this.products = products;
        console.log('Products loaded:', products);
      },
      error: (error) => {
        console.error('Error loading products:', error);
      }
    });
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

  addToCart(event: Event, product: Product): void {
    event.stopPropagation();
    if (product.id) {
      console.log('Adding to cart:', product);
    }
  }
}
