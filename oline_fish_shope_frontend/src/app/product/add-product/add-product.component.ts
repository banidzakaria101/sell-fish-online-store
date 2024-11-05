import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ProductService } from '../../services/product.service';
import { CategoryService } from '../../services/category.service';
import { AuthService } from '../../services/auth.service';
import { Category } from '../../models/category.model';

@Component({
  selector: 'app-add-product',
  templateUrl: './add-product.component.html',
  styleUrls: ['./add-product.component.css']
})
export class AddProductComponent implements OnInit {
  productForm: FormGroup;
  categories: Category[] = [];
  selectedImage: File | null = null;

  constructor(
    private fb: FormBuilder,
    private productService: ProductService,
    private categoryService: CategoryService,
    private authService: AuthService
  ) {
    this.productForm = this.fb.group({
      name: ['', Validators.required],
      description: [''],
      price: [0, [Validators.required, Validators.min(0)]],
      weight: [0, [Validators.required, Validators.min(0)]],
      stock: [0, [Validators.required, Validators.min(0)]],
      available: [true],
      category: [null, Validators.required]
    });
  }

  ngOnInit() {
    this.loadCategories();
  }

  loadCategories() {
    this.categoryService.getCategories().subscribe(categories => {
      this.categories = categories;
    });
  }

  onImageSelected(event: Event) {
    const input = event.target as HTMLInputElement;
    if (input.files && input.files.length > 0) {
      this.selectedImage = input.files[0];
    }
  }

  onSubmit() {
    if (this.productForm.valid) {
      const product = this.productForm.value;
      const formData = new FormData();
      formData.append('name', product.name);
      formData.append('description', product.description);
      formData.append('price', product.price.toString());
      formData.append('weight', product.weight.toString());
      formData.append('stock', product.stock.toString());
      formData.append('available', product.available.toString());
      formData.append('category_id', product.category);

      // Get the admin ID from AuthService
      const adminId = this.authService.getAdminId();
      console.log('Admin ID:', adminId);

      if (adminId) {
        formData.append('admin_id', adminId.toString());
      }

      if (this.selectedImage) {
        formData.append('file', this.selectedImage);
      }

      this.productService.addProduct(formData).subscribe({
          next: (addedProduct) => {
              console.log('Product added successfully:', addedProduct);
              this.productForm.reset();
              this.selectedImage = null;
          },
          error: (err) => {
              console.error('Error adding product:', err);
          }
      });
    }
  }
}