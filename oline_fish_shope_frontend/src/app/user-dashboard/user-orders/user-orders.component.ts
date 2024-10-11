import { Component } from '@angular/core';
import { OrderService } from '../../services/order.service';

@Component({
  selector: 'app-user-orders',
  templateUrl: './user-orders.component.html',
  styleUrls: ['./user-orders.component.css']
})
export class UserOrdersComponent {
  orders: any[] = []; // Replace with your Order model

  constructor(private orderService: OrderService) {
    this.loadOrders();
  }

  loadOrders() {
    this.orderService.getUserOrders().subscribe((orders) => {
      this.orders = orders;
    });
  }
}
