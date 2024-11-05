// product-confirmation-dialog.component.ts
import { Component } from '@angular/core';

@Component({
  selector: 'app-product-confirmation-dialog',
  template: `
    <h2 mat-dialog-title>Product Added</h2>
    <div mat-dialog-content>
      <p>Your product has been added successfully!</p>
    </div>
    <div mat-dialog-actions>
      <button mat-button mat-dialog-close>OK</button>
    </div>
  `,
  styles: ['p { font-size: 1.2em; }']
})
export class ProductConfirmationDialogComponent {}
