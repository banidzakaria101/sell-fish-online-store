import { OrderService } from './../../services/order.service';
import { Component, OnInit } from '@angular/core';
import { BasketService } from '../../services/basket.service';
import { JwtService } from '../../services/jwt.service';
import { ProductService } from '../../services/product.service'; // Import the ProductService
import { Basket } from '../../models/basket.model';
import { Product } from '../../models/product.model';
import { ConfirmationService, MessageService } from 'primeng/api';

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
    private orderService: OrderService,
    private confirmationService: ConfirmationService,
    private messageService: MessageService
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

  confirmRemoveFromBasket(productId: number) {
    this.confirmationService.confirm({
      message: 'Are you sure you want to remove this product from your basket?',
      header: 'Confirm Remove',
      icon: 'pi pi-exclamation-triangle',
      accept: () => {
        this.removeFromBasket(productId); // Proceed with removal
        this.messageService.add({
          severity: 'success',
          summary: 'Removed',
          detail: 'Product has been removed from your basket',
        });
      },
      reject: () => {
        this.messageService.add({
          severity: 'info',
          summary: 'Cancelled',
          detail: 'Product was not removed from your basket',
        });
      }
    });
  }

  removeFromBasket(productId: number) {
    if (this.customerId !== null) {
      this.basketService.removeFromBasket(this.customerId, productId).subscribe(
        updatedBasket => {
          this.basket = updatedBasket;
          this.products = this.products.filter(p => p.id !== productId);
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
          this.products = []; 
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
          
          // Display success message
          this.messageService.add({
            severity: 'success',
            summary: 'Order Created',
            detail: 'Your order has been successfully placed!',
          });
        },
        error => {
          console.error('Error creating order:', error);
          
          this.messageService.add({
            severity: 'error',
            summary: 'Order Failed',
            detail: 'There was an issue placing your order. Please try again.',
          });
        }
      );
    }
  }
}
