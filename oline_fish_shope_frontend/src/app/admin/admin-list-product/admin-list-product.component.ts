import { Component, OnInit } from '@angular/core';
import { ProductService } from '../../services/product.service';
import { Product } from '../../models/product.model';
import { MessageService } from 'primeng/api'; // Import MessageService

@Component({
  selector: 'app-admin-list-product',
  templateUrl: './admin-list-product.component.html',
  styleUrls: ['./admin-list-product.component.css'],
  providers: [MessageService] // Provide MessageService
})
export class AdminListProductComponent implements OnInit {
  products: Product[] = [];
  editingProductId: number | null = null; // Track the product currently being edited

  constructor(private productService: ProductService, private messageService: MessageService) {}

  ngOnInit() {
    this.loadProducts();
  }

  loadProducts() {
    this.productService.listProducts().subscribe(
      (products) => {
        this.products = products;
      },
      (error) => console.error('Error loading products:', error)
    );
  }

  enableEditing(product: Product) {
    this.editingProductId = product.id; // Set the product ID to enable editing
  }

  updateProduct(product: Product) {
    if (product && product.id) {
      this.productService.updateProduct(product.id, product).subscribe(
        (updatedProduct) => {
          console.log('Product updated successfully:', updatedProduct);
          const index = this.products.findIndex(p => p.id === updatedProduct.id);
          if (index > -1) {
            this.products[index] = updatedProduct;
          }
          this.messageService.add({ severity: 'success', summary: 'Update Successful', detail: 'Product updated successfully!' }); // Show success message
          this.editingProductId = null; // Clear editing state
        },
        (error) => {
          console.error('Error updating product:', error);
          this.messageService.add({ severity: 'error', summary: 'Update Failed', detail: 'Error updating product!' }); // Show error message
        }
      );
    } else {
      console.error('Cannot update product: Invalid product or missing ID');
    }
  }
}