import { Component, OnInit } from '@angular/core';
import { CustomerService } from '../../services/customer.service';
import { Customer } from '../../models/customer.model';

@Component({
  selector: 'app-user-management',
  templateUrl: './user-management.component.html',
  styleUrls: ['./user-management.component.css',
],
providers: [CustomerService]})
export class UserManagementComponent implements OnInit {
  customers: Customer[] = [];

  constructor(private customerService: CustomerService) {}

  ngOnInit() {
    this.loadCustomers();
  }

  loadCustomers() {
    this.customerService.getAllCustomers().subscribe(
      customers => {
        this.customers = customers;
      },
      error => {
        console.error('Error fetching customers:', error);
      }
    );
  }

  getTotalOrders(customer: Customer): number {
    return customer.orders ? customer.orders.length : 0;
  }

  getTotalAmount(customer: Customer): number {
    return customer.orders.reduce((sum, order) => sum + order.totalAmount, 0);
  }
}
