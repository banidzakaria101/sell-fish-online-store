import { Component, OnInit, ViewChild } from '@angular/core';
import { OrderService } from '../../services/order.service';
import { MessageService } from 'primeng/api';
import { Table } from 'primeng/table';
import { Order } from '../../models/order.model';

@Component({
  selector: 'app-order-management',
  templateUrl: './order-management.component.html',
  styleUrls: ['./order-management.component.css'],
  providers: [MessageService]
})
export class OrderManagementComponent implements OnInit {
  @ViewChild('dt') dt: Table | undefined;

  orders: any[] = [];
  statusOptions = [
    { label: 'Pending', value: 'PENDING' },
    { label: 'Shipped', value: 'SHIPPED' },
    { label: 'Delivered', value: 'DELIVERED' }
  ];

  constructor(private orderService: OrderService, private messageService: MessageService) {}

  ngOnInit() {
    this.loadOrders(); 
  }

  loadOrders() {
    this.orderService.getAllOrders().subscribe(
      (orders) => this.orders = orders,
      (error) => console.error('Error fetching orders:', error)
    );
  }

  onStatusChange(order: any) {
  }

  updateOrderStatus(order: Order) {
    console.log('Updating order:', order);  // Log the order object
    this.orderService.updateOrderStatus(order.id, order.status).subscribe(
        () => {
            this.messageService.add({ severity: 'success', summary: 'Success', detail: 'Order status updated successfully' });
            this.loadOrders();  
        },
        (error) => console.error('Error updating order status:', error)
    );
}

  getTotalAmount(): number {
    return this.orders.reduce((sum, order) => sum + order.totalAmount, 0);
  }

  editOrder(order: any) {
    console.log('Edit order:', order);
  }

  deleteOrder(order: any) {
    console.log('Delete order:', order);
  }

  onGlobalFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dt?.filterGlobal(filterValue, 'contains');
  }
}
