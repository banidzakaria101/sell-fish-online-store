import { Category } from "./category.model";

export interface Product {
  id?: number;
  name: string;
  description?: string;
  price: number;
  weight: number;
  stock: number;
  image?: string;
  available?: boolean;
  category: Category;

}
