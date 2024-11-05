import { BasketProduct } from './basket-product.model';


export interface Basket {
  id: number;
  totalPrice: number;
  totalQuantity: number;
  products: BasketProduct[];
  customerId: number;
}
