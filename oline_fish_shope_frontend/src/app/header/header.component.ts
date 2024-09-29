import { Component } from '@angular/core';
import { CartService } from '../services/cart.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent {
  cartItemCount: number = 0;

  constructor(private cartService: CartService) {
    this.cartService.getCartItems().subscribe((items) => {
      this.cartItemCount = items.length;
    });
  }
}
