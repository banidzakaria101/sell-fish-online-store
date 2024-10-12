import { Component, OnInit } from '@angular/core';
import { BasketService } from '../../services/basket.service';
import { Product } from '../../models/product.model';
import { Basket } from '../../models/basket.model';

@Component({
  selector: 'app-user-basket',
  templateUrl: './user-basket.component.html',
  styleUrls: ['./user-basket.component.css']
})
export class UserBasketComponent implements OnInit {
  basket: Basket | null = null;
  customerId: number = 1; // Set this to the current user's ID (fetch from authentication context)

  constructor(private basketService: BasketService) {}

  ngOnInit() {
    this.loadBasket();
  }

  loadBasket() {
    this.basketService.getBasket(this.customerId).subscribe(
      basket => {
        this.basket = basket; // Update local basket state
      },
      error => {
        console.error('Error fetching basket:', error);
      }
    );
  }

  removeFromBasket(productId: number) {
    this.basketService.removeFromBasket(this.customerId, productId).subscribe(
      updatedBasket => {
        this.basket = updatedBasket; // Update with the new basket state
      },
      error => {
        console.error('Error removing product from basket:', error);
      }
    );
  }

  clearBasket() {
    this.basketService.clearBasket(this.customerId).subscribe(
      updatedBasket => {
        this.basket = updatedBasket; 
      },
      error => {
        console.error('Error clearing basket:', error);
      }
    );
  }
}
