import { Injectable } from '@angular/core';
import { Product } from '../models/product.model';
import { Basket } from '../models/basket.model';

@Injectable({
  providedIn: 'root'
})
export class BasketService {
  private basket: Basket = {
    id: 0,
    totalPrice: 0,
    totalQuantity: 0,
    products: [],
    customerId: 0
  };

  constructor() {}

  // Get current basket
  getBasket(): Basket {
    return this.basket;
  }

  // Add product to the basket
  addToBasket(customerId: number, productId: number, product: Product): void {
    const existingProduct = this.basket.products.find(p => p.id === product.id);

    if (existingProduct) {
      existingProduct.weight += product.weight;
    } else {
      this.basket.products.push(product);
    }

    // Update total price and quantity
    this.basket.totalPrice += product.price;
    this.basket.totalQuantity += 1;

    // Set the customer ID
    this.basket.customerId = customerId;
  }

  // Remove product from the basket
  removeFromBasket(productId: number): void {
    const productIndex = this.basket.products.findIndex(p => p.id === productId);

    if (productIndex > -1) {
      const product = this.basket.products[productIndex];
      this.basket.totalPrice -= product.price;
      this.basket.totalQuantity -= 1;
      this.basket.products.splice(productIndex, 1);
    }
  }

  // Clear the basket
  clearBasket(): void {
    this.basket = {
      id: 0,
      totalPrice: 0,
      totalQuantity: 0,
      products: [],
      customerId: 0
    };  
  }
}
