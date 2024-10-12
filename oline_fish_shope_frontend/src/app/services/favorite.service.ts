import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Product } from '../models/product.model';

@Injectable({
  providedIn: 'root'
})
export class FavoritesService {
  private apiUrl = 'http://localhost:8088/api/favorites';
  constructor(private http: HttpClient) {}

  // Fetches the favorite items for the logged-in user
  getFavoriteItems(): Observable<Product[]> {
    return this.http.get<Product[]>(this.apiUrl); 
  }

  // Adds a product to the favorites
  addToFavorites(productId: number): Observable<Product> {
    return this.http.post<Product>(`${this.apiUrl}/add`, { productId });
  }

  // Removes a product from the favorites
  removeFromFavorites(productId: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/remove/${productId}`);
  }
}
