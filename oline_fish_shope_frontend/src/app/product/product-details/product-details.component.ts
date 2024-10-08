import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ProductService } from '../../services/product.service';
import { Product } from '../../models/product.model';
import { BasketService } from '../../services/basket.service';

@Component({
  selector: 'app-product-details',
  templateUrl: './product-details.component.html',
  styleUrls: ['./product-details.component.css']
})
export class ProductDetailsComponent implements OnInit {
  product!: Product;

  constructor(
    private route: ActivatedRoute,
    private productService: ProductService,
    private basketService: BasketService
  ) {}

  ngOnInit(): void {
    const productId = Number(this.route.snapshot.paramMap.get('id'));
    this.loadProductDetails(productId);
  }

  loadProductDetails(id: number): void {
    this.productService.getProductById(id).subscribe({
      next: (product) => {
        this.product = product;
      },
      error: (error) => {
        console.error('Error loading product details:', error);
      }
    });
  }

  addToCart(): void {
    this.basketService.addToBasket(this.product);
    console.log('Product added to basket:', this.product);
  }
}
