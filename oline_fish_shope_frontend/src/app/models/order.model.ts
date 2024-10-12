
import { Role } from '../enums/role';
import { User } from './user.model';
import { Product } from './product.model';

export interface Order {
  id: number;
  orderDate: string;
  status: string;
  totalAmount: number;
  customer: User;
  product: Product;
}
