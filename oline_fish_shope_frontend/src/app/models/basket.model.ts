import { Product } from './product.model';


export interface Basket {
  id: number;
  totalPrice: number;
  totalQuantity: number;
  products: Product[];
  customerId: number;
}
