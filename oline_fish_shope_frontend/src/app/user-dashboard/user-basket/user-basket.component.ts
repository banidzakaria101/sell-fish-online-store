import { OrderService } from './../../services/order.service';
import { Component, OnInit } from '@angular/core';
import { BasketService } from '../../services/basket.service';
import { JwtService } from '../../services/jwt.service';
import { ProductService } from '../../services/product.service'; // Import the ProductService
import { Basket } from '../../models/basket.model';
import { Product } from '../../models/product.model';

@Component({
  selector: 'app-user-basket',
  templateUrl: './user-basket.component.html',
  styleUrls: ['./user-basket.component.css']
})
export class UserBasketComponent implements OnInit {
  basket: Basket | null = null;
  products: Product[] = [];  // Holds full product details for each item in the basket
  customerId: number | null = null;

  constructor(
    private basketService: BasketService,
    private jwtService: JwtService,
    private productService: ProductService, 
    private orderService: OrderService
  ) {}

  ngOnInit() {
    this.loadCustomerId();
  }

  loadCustomerId() {
    const token = this.jwtService.getToken();
    this.customerId = this.jwtService.getUserId(token);

    if (this.customerId) {
      this.loadBasket();
      console.log('customer id : ', this.customerId)
    } else {
      console.error('User ID not found in token');
    }
  }

  loadBasket() {
    if (this.customerId !== null) {
      this.basketService.getBasket(this.customerId).subscribe(
        basket => {
          this.basket = basket;
          this.loadProductDetails();
        },
        error => {
          console.error('Error fetching basket:', error);
        }
      );
    }
  }

  // Fetches full details for each product in the basket
  loadProductDetails() {
    if (this.basket) {
      this.products = []; // Reset products list
      this.basket.products.forEach(basketProduct => {
        this.productService.getProductById(basketProduct.productId).subscribe(
          product => this.products.push(product),
          error => console.error('Error fetching product details:', error)
        );
      });
    }
  }

  removeFromBasket(productId: number) {
    if (this.customerId !== null) {
      this.basketService.removeFromBasket(this.customerId, productId).subscribe(
        updatedBasket => {
          this.basket = updatedBasket;
          this.products = this.products.filter(p => p.id !== productId); // Update displayed products
        },
        error => {
          console.error('Error removing product from basket:', error);
        }
      );
    }
  }

  clearBasket() {
    if (this.customerId !== null) {
      this.basketService.clearBasket(this.customerId).subscribe(
        updatedBasket => {
          this.basket = updatedBasket;
          this.products = []; // Clear displayed products
        },
        error => {
          console.error('Error clearing basket:', error);
        }
      );
    }
  }

  makeOrder(productId: number) {
    if (this.customerId) {
      this.orderService.createOrder(this.customerId, productId).subscribe(
        order => {
          console.log('Order created:', order);
          this.removeFromBasket(productId); 
        },
        error => {
          console.error('Error creating order:', error);
        }
      );
    }
  }
}
