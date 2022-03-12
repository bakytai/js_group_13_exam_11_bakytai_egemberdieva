import { User } from './user.model';
import { Category } from './category.model';

export class Product {
  constructor(
    public _id: string,
    public category: Category,
    public user: User,
    public title: string,
    public price: number,
    public description: string,
    public image: string,
  ) {}
}

export interface ProductData {
  [key: string]: any;
  category: Category;
  title: string,
  price: number;
  description: string;
  image: File;
  user: User
}


