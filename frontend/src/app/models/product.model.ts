export class Product {
  constructor(
    public id: string,
    public category: string,
    public user: string,
    public title: string,
    public price: number,
    public description: string,
    public image: string,
  ) {}
}

export interface ProductData {
  [key: string]: any;
  category: string;
  title: string,
  price: number;
  description: string;
  image: File;
}

export interface ApiProductData {
  _id: string,
  category: string,
  user: string,
  title: string,
  price: number,
  description: string,
  image: string
}
