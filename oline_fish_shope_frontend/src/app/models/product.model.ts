import { Category } from "./category.model";

export interface Product {
  isFavorite: any;
  id: number;
  name: string;
  description: string;
  price: number;
  weight: number;
  stock: number;
  imagePath: string;
  available: boolean;
  category: Category;
  adminId: number;
  quantity: number;


}
