import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Order } from '../models/order.model';

@Injectable({
  providedIn: 'root'
})
export class OrderService {
  private apiUrl = 'http://localhost:8088/api/orders'; // Adjust as needed

  constructor(private http: HttpClient) {}

  getCustomerOrders(customerId: number): Observable<Order[]> {
    return this.http.get<Order[]>(`${this.apiUrl}/orders/${customerId}`);
}

updateOrderStatus(orderId: number, status: string): Observable<Order> {
  return this.http.patch<Order>(`${this.apiUrl}/${orderId}/status?status=${status}`, {}); // Ensure your API supports this
}

  createOrder(customerId: number, productId: number): Observable<Order> {
    return this.http.post<Order>(`${this.apiUrl}/create?customerId=${customerId}&productId=${productId}`, {});
  }

  getAllOrders(): Observable<Order[]> {
    return this.http.get<Order[]>(`${this.apiUrl}/all`);
  }
}
