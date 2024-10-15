import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ProductService } from '../../services/product.service';
import { Product } from '../../models/product.model';
import { BasketService } from '../../services/basket.service';
import { AuthService } from '../../services/auth.service';
import { MenuItem } from 'primeng/api';

@Component({
  selector: 'app-product-details',
  templateUrl: './product-details.component.html',
  styleUrls: ['./product-details.component.css']
})
export class ProductDetailsComponent implements OnInit {
  product!: Product;
  quantity: number = 1;
  customerId!: number;
  breadcrumbItems: MenuItem[] = [];
  home: MenuItem = { icon: 'pi pi-home', routerLink: '/' };
  deliveryOptions: any[];
  selectedDeliveryOption: any;

  constructor(
    private route: ActivatedRoute,
    private productService: ProductService,
    private basketService: BasketService,
    private authService: AuthService
  ) {
    this.deliveryOptions = [
      { label: 'Deliver every 4 Weeks', value: 4 },
      { label: 'Deliver every 6 Weeks', value: 6 },
      { label: 'Deliver every 8 Weeks', value: 8 }
    ];
    this.selectedDeliveryOption = this.deliveryOptions[0];
  }

  ngOnInit(): void {
    const productId = Number(this.route.snapshot.paramMap.get('id'));
    this.loadProductDetails(productId);
    this.authService.currentUser$.subscribe(user => {
      if (user) {
        this.customerId = user.userId;
      }
    });
  }

  loadProductDetails(id: number): void {
    this.productService.getProductById(id).subscribe({
      next: (product) => {
        this.product = product;
        this.updateBreadcrumb();
      },
      error: (error) => {
        console.error('Error loading product details:', error);
      }
    });
  }

  updateBreadcrumb(): void {
    this.breadcrumbItems = [
      { label: this.product.category.name, routerLink: `/category/${this.product.category.id}` },
      { label: this.product.name }
    ];
  }

  addToCart(customerId: number, productId: number): void {
    console.log('Customer ID:', customerId);
    console.log('Product ID:', productId);
    if (customerId !== undefined && productId !== undefined) {
      this.basketService.addToBasket(customerId, productId).subscribe(
        response => {
          console.log("Product added to basket", response);
        },
        error => {
          console.error("Error adding product to basket", error);
        }
      );
    } else {
      console.error("Customer ID or Product ID is undefined");
    }
  }

  increaseQuantity(): void {
    this.quantity++;
  }

  decreaseQuantity(): void {
    if (this.quantity > 1) {
      this.quantity--;
    }
  }
}
