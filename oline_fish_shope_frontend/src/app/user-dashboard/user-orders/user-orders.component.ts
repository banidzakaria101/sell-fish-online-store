import { Component, OnInit } from '@angular/core';
import { OrderService } from '../../services/order.service';
import { JwtService } from '../../services/jwt.service';  // Import JwtService
import { Order } from '../../models/order.model';

@Component({
  selector: 'app-user-orders',
  templateUrl: './user-orders.component.html',
  styleUrls: ['./user-orders.component.css']
})
export class UserOrdersComponent implements OnInit {
  orders: Order[] = [];
  customerId: number | null = null;

  constructor(
    private orderService: OrderService,
    private jwtService: JwtService 
  ) {}

  ngOnInit() {
    this.loadCustomerId();
    this.loadOrders();
  }

  loadCustomerId() {
    const token = this.jwtService.getToken();
    this.customerId = this.jwtService.getUserId(token);

    if (!this.customerId) {
      console.error('User ID not found in token');
    }
  }

  loadOrders() {
    if (this.customerId) {
      this.orderService.getCustomerOrders(this.customerId).subscribe(
        orders => {
          this.orders = orders;
        },
        error => {
          console.error('Error fetching orders:', error);
        }
      );
    } else {
      console.error('Cannot load orders: Customer ID is null');
    }
  }
}
