import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Product } from '../models/product.model';
import { JwtService } from './jwt.service';

@Injectable({
  providedIn: 'root'
})
export class ProductService {
  private apiUrl = 'http://localhost:8088/api/product';

  constructor(private http: HttpClient, private jwtService: JwtService) { }

  addProduct(product: Product): Observable<Product> {
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

}
