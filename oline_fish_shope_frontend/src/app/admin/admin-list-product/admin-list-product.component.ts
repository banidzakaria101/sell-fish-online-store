import { Component, OnInit } from '@angular/core';
import { ProductService } from '../../services/product.service';
import { Product } from '../../models/product.model';

@Component({
  selector: 'app-admin-list-product',
  templateUrl: './admin-list-product.component.html',
  styleUrls: ['./admin-list-product.component.css']
})
export class AdminListProductComponent implements OnInit {
  products: Product[] = [];

  constructor(private productService: ProductService) {}

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

  updateProduct(product: Product) {
    if (product && product.id) {
      this.productService.updateProduct(product.id, product).subscribe(
        (updatedProduct) => {
          console.log('Product updated successfully:', updatedProduct);
          const index = this.products.findIndex(p => p.id === updatedProduct.id);
          if (index > -1) {
            this.products[index] = updatedProduct;
          }
        },
        (error) => console.error('Error updating product:', error)
      );
    } else {
      console.error('Cannot update product: Invalid product or missing ID');
    }
  }
}
