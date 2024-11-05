import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProductConfirmationDialogComponent } from './product-confirmation-dialog.component';

describe('ProductConfirmationDialogComponent', () => {
  let component: ProductConfirmationDialogComponent;
  let fixture: ComponentFixture<ProductConfirmationDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ProductConfirmationDialogComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ProductConfirmationDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
