// basket.service.ts
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { Basket } from '../models/basket.model';

@Injectable({
  providedIn: 'root'
})
export class BasketService {
  private basketSubject = new BehaviorSubject<Basket | null>(null);
  private apiUrl = 'http://localhost:8088/api/basket';

  constructor(private http: HttpClient) {}

  // Get the basket for the logged-in customer
  getBasket(customerId: number): Observable<Basket> {
    return this.http.get<Basket>(`${this.apiUrl}/${customerId}`);
  }

  // Add product to the basket
  addToBasket(customerId: number, productId: number): Observable<Basket> {
    return this.http.post<Basket>(`${this.apiUrl}/add/${customerId}/${productId}`, {});
  }

  // Remove product from the basket
  removeFromBasket(customerId: number, productId: number): Observable<Basket> {
    return this.http.delete<Basket>(`${this.apiUrl}/remove/${customerId}/${productId}`);
  }

  // Clear the basket
  clearBasket(customerId: number): Observable<Basket> {
    return this.http.delete<Basket>(`${this.apiUrl}/${customerId}/clear`);
  }
}
