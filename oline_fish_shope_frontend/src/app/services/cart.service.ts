import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { Product } from '../models/product.model';

@Injectable({
  providedIn: 'root'
})
export class CartService {
  private cartItemsSubject: BehaviorSubject<Product[]> = new BehaviorSubject<Product[]>([]);
  private cartItems: Product[] = [];

  constructor() {}

  getCartItems(): Observable<Product[]> {
    return this.cartItemsSubject.asObservable();
  }

  addToCart(product: Product): void {
    const existingProduct = this.cartItems.find(item => item.id === product.id);
    if (existingProduct) {
      existingProduct.quantity! += 1; // Increment quantity
    } else {
      product.quantity = 1; // Initialize quantity for new product
      this.cartItems.push(product);
    }
    this.cartItemsSubject.next(this.cartItems);
  }

  removeFromCart(product: Product): void {
    const existingProduct = this.cartItems.find(item => item.id === product.id);
    if (existingProduct && existingProduct.quantity! > 1) {
      existingProduct.quantity! -= 1; // Decrement quantity
    } else {
      this.cartItems = this.cartItems.filter(item => item.id !== product.id);
    }
    this.cartItemsSubject.next(this.cartItems);
  }

  clearCart(): void {
    this.cartItems = [];
    this.cartItemsSubject.next(this.cartItems);
  }

  getCartItemCount(): number {
    return this.cartItems.length;
  }

  getTotalPrice(): number {
    return this.cartItems.reduce((total, product) => total + (product.price * (product.quantity || 1)), 0);
  }

  isProductInCart(productId: number): boolean {
    return this.cartItems.some(item => item.id === productId);
  }
}
