import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { Product } from '../models/product.model';  // Assuming you have a Product model

@Injectable({
  providedIn: 'root'
})
export class CartService {
  // BehaviorSubject to keep track of cart items
  private cartItemsSubject: BehaviorSubject<Product[]> = new BehaviorSubject<Product[]>([]);
  private cartItems: Product[] = [];

  constructor() {}

  // Get observable for cart items (so components can subscribe to it)
  getCartItems(): Observable<Product[]> {
    return this.cartItemsSubject.asObservable();
  }

  // Add a product to the cart
  addToCart(product: Product): void {
    this.cartItems.push(product);
    this.cartItemsSubject.next(this.cartItems); // Update the cart observable
  }

  // Remove a product from the cart
  removeFromCart(product: Product): void {
    this.cartItems = this.cartItems.filter(item => item.id !== product.id);
    this.cartItemsSubject.next(this.cartItems); // Update the cart observable
  }

  // Clear the entire cart
  clearCart(): void {
    this.cartItems = [];
    this.cartItemsSubject.next(this.cartItems); // Update the cart observable
  }

  // Get the total number of items in the cart
  getCartItemCount(): number {
    return this.cartItems.length;
  }

  // Get the total cost of items in the cart
  getTotalPrice(): number {
    return this.cartItems.reduce((total, product) => total + product.price, 0);
  }
}
