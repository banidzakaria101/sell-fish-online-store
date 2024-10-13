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
  customerId: number = 1;

  constructor(private basketService: BasketService) {}

  ngOnInit() {
    this.loadBasket();
  }

  loadBasket() {
    this.basketService.getBasket(this.customerId).subscribe(
      basket => {
        this.basket = basket;
      },
      error => {
        console.error('Error fetching basket:', error);
      }
    );
  }

  removeFromBasket(productId: number) {
    this.basketService.removeFromBasket(this.customerId, productId).subscribe(
      updatedBasket => {
        this.basket = updatedBasket;
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
