import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { environment } from '../../environments/environment';
import { Product, ProductData } from '../models/product.model';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  constructor(private http: HttpClient) {
  }

  getProducts(id: string) {
    return this.http.get<Product[]>(environment.apiUrl + `/products?category=${id}`).pipe(
      map(response => {
        return response.map(productData => {
          return new Product(
            productData._id,
            productData.category,
            productData.user,
            productData.title,
            productData.price,
            productData.description,
            productData.image);
        });
      })
    );
  };

  getProductInfo(id: string) {
    return this.http.get<Product>(environment.apiUrl + `/products/${id}`).pipe(
      map(product => {
        return new Product(product._id, product.category, product.user,
           product.title, product.price, product.description, product.image)
      })
    );
  };

  deleteProduct(id: string, token: string) {
    return this.http.delete(environment.apiUrl + `/products${id}`, {
      headers: new HttpHeaders({'Authorization': token})
    });
  }


  createProduct(productData: ProductData) {
    const formData = new FormData();

    Object.keys(productData).forEach(key => {
      if (productData[key] !== null) {
        formData.append(key, productData[key]);
      }
    });

    return this.http.post<Product>(environment.apiUrl + '/products', formData, {
      headers: new HttpHeaders({'Authorization': productData.user.token})
    });
  }
}
