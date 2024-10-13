import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { catchError, Observable, throwError } from 'rxjs';
import { Product } from '../models/product.model';
import { JwtService } from './jwt.service';

@Injectable({
  providedIn: 'root'
})
export class ProductService {
  private apiUrl = 'http://localhost:8088/api/product';

  constructor(private http: HttpClient, private jwtService: JwtService) { }

  private getAuthHeaders(): HttpHeaders {
    const token = this.jwtService.getToken();
    return new HttpHeaders({
      'Authorization': `Bearer ${token}`
    });
  }

  addProduct(product: FormData): Observable<Product> {
    const token = this.jwtService.getToken();
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`
    });

    return this.http.post<Product>(`${this.apiUrl}/add`, product, { headers });
  }

  deleteProduct(id: number): Observable<void> {
    const token = this.jwtService.getToken();
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`
    });

    return this.http.delete<void>(`${this.apiUrl}/delete/${id}`, { headers });
  }

  listProducts(): Observable<Product[]> {
    const headers = new HttpHeaders({
    });

    return this.http.get<Product[]>(`${this.apiUrl}/list`, { headers });
  }

  getProductByName(name: string): Observable<Product[]> {
    const token = this.jwtService.getToken();
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`
    });

    return this.http.get<Product[]>(`${this.apiUrl}/name`, { params: { name }, headers });
  }

  // Get Products by Category Id
  getProductsByCategory(categoryId: number): Observable<Product[]> {
    const token = this.jwtService.getToken();
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`
    });

    return this.http.get<Product[]>(`${this.apiUrl}/category/${categoryId}`, { headers });
  }

  updateProduct(id: number, product: Partial<Product>): Observable<Product> {
    if (id === undefined || id === null) {
      return throwError('Product ID is required for update');
      }
      return this.http.put<Product>(`${this.apiUrl}/update/${id}`, product, {
      headers: this.getAuthHeaders()
      }).pipe(
      catchError(error => {
      console.error('Error updating product:', error);
      return throwError('Error updating product. Please try again later.');
      })
    );
  }

  getProductById(id: number): Observable<Product> {

   const headers = this.getAuthHeaders();
   return this.http.get<Product>(`${this.apiUrl}/details?id=${id}`, { headers });
  }

}
