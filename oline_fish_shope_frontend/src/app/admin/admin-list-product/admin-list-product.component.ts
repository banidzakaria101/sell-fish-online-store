import { Component, OnInit, ViewChild } from '@angular/core';
import { MatTable, MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { ProductService } from '../../services/product.service';
import { Product } from '../../models/product.model';

@Component({
  selector: 'app-admin-list-product',
  templateUrl: './admin-list-product.component.html',
  styleUrls: ['./admin-list-product.component.css']
})
export class AdminListProductComponent implements OnInit {
  displayedColumns: string[] = ['id', 'name', 'price', 'stock', 'available', 'actions'];
  dataSource!: MatTableDataSource<Product>;

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  @ViewChild(MatTable) table!: MatTable<Product>;

  constructor(private productService: ProductService) {}

  ngOnInit() {
    this.loadProducts();
  }

  loadProducts() {
    this.productService.listProducts().subscribe(
      (products) => {
        this.dataSource = new MatTableDataSource(products);
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
      },
      (error) => console.error('Error loading products:', error)
    );
  }

  updateProduct(product: Product) {
    if (product && product.id) {
      this.productService.updateProduct(product.id, product).subscribe(
        (updatedProduct) => {
          console.log('Product updated successfully:', updatedProduct);
          const index = this.dataSource.data.findIndex(p => p.id === updatedProduct.id);
          if (index > -1) {
            this.dataSource.data[index] = updatedProduct;
            this.dataSource._updateChangeSubscription();
          }
        },
        (error) => console.error('Error updating product:', error)
      );
    } else {
      console.error('Cannot update product: Invalid product or missing ID');
    }
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }
}
