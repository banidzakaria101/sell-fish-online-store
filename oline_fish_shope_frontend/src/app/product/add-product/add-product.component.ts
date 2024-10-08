import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ProductService } from '../../services/product.service';
import { Product } from '../../models/product.model';

@Component({
  selector: 'app-add-product',
  templateUrl: './add-product.component.html',
  styleUrls: ['./add-product.component.css']
})
export class AddProductComponent {
  productForm: FormGroup;

  categories = [
    { key: 'FRESH_FISH', name: 'Fresh Fish', icon: '🐟' },
    { key: 'SHELLFISH', name: 'Shellfish', icon: '🦐' },
    { key: 'SUSHI_GRADE', name: 'Sushi Grade', icon: '🍣' },
    { key: 'CEPHALOPODS', name: 'Cephalopods', icon: '🐙' },
    { key: 'CRUSTACEANS', name: 'Crustaceans', icon: '🦀' },
    { key: 'CANNED_FISH', name: 'Canned Fish', icon: '🥫' }
  ];


  constructor(private fb: FormBuilder, private productService: ProductService) {
    this.productForm = this.fb.group({
      name: ['', Validators.required],
      description: [''],
      price: [0, [Validators.required, Validators.min(0)]],
      weight: [0, [Validators.required, Validators.min(0)]],
      stock: [0, [Validators.required, Validators.min(0)]],
      image: [''],
      available: [true]
    });
  }


  onSubmit() {
    if (this.productForm.valid) {
      const product: Product = this.productForm.value;
      this.productService.addProduct(product).subscribe({
        next: (addedProduct) => {
          console.log('Product added successfully:', addedProduct);
          this.productForm.reset(); 
        },
        error: (err) => {
          console.error('Error adding product:', err);
        }
      });
    }
  }
}
