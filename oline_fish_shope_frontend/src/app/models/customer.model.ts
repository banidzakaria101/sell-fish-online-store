import { Order } from "./order.model";

export interface Customer {
  id: number;
  username: string;
  phoneNumber: string;
  orders: Order[];
}
