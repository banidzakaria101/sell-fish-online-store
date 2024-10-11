import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class OrderService {
  private apiUrl = 'http://localhost:8088/api/orders';

  constructor(private http: HttpClient) {}

  getUserOrders(): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}/user-orders`);
}

}
