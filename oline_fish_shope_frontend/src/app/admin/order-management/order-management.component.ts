import { Component, OnInit, ViewChild } from '@angular/core';
import { OrderService } from '../../services/order.service';
import { Order } from '../../models/order.model';
import { Status } from '../../enums/status.enum';
import { Table } from 'primeng/table';

@Component({
  selector: 'app-order-management',
  templateUrl: './order-management.component.html',
  styleUrls: ['./order-management.component.css']
})
export class OrderManagementComponent implements OnInit {
  @ViewChild('dt') dt: Table | undefined;

  orders: Order[] = [];
  statusOptions = [
    { label: 'Pending', value: Status.PENDING },
    { label: 'Shipped', value: Status.SHIPPED },
    { label: 'Delivered', value: Status.DELIVERED }
  ];

  constructor(private orderService: OrderService) {}

  ngOnInit() {
    this.loadOrders();
  }

  loadOrders() {
    this.orderService.getAllOrders().subscribe(
      orders => {
        this.orders = orders;
      },
      error => {
        console.error('Error fetching orders:', error);
      }
    );
  }

  updateOrderStatus(order: Order) {
    this.orderService.updateOrder(order).subscribe(
      () => {
        console.log('Order status updated successfully');
      },
      error => {
        console.error('Error updating order status:', error);
      }
    );
  }

  getTotalAmount(): number {
    return this.orders.reduce((sum, order) => sum + order.totalAmount, 0);
  }

  editOrder(order: Order) {
    console.log('Edit order:', order);
  }

  deleteOrder(order: Order) {
    console.log('Delete order:', order);
  }

  onGlobalFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dt?.filterGlobal(filterValue, 'contains');
  }
}
