import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Product } from '../../models/product.model';
import { Store } from '@ngrx/store';
import { AppState } from '../../store/types';
import { fetchProductsRequest } from '../../store/products.actions';
import { Category } from '../../models/category.model';
import { fetchCategoriesRequest } from '../../store/categories.actions';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.sass']
})
export class ProductsComponent implements OnInit {
  products: Observable<Product[]>;
  loadingProduct: Observable<boolean>;
  errorProduct: Observable<null | string>;
  categories: Observable<Category[]>;
  loading: Observable<boolean>;
  error: Observable<null | string>;
  title = 'All Items';

  constructor(private store: Store<AppState>) {
    this.products = store.select(state => state.products.products);
    this.loadingProduct = store.select(state => state.products.fetchLoading);
    this.errorProduct = store.select(state => state.products.fetchError);
    this.categories = store.select(state => state.categories.categories);
    this.loading = store.select(state => state.categories.fetchLoading);
    this.error = store.select(state => state.categories.fetchError);
  }

  ngOnInit(): void {
    this.store.dispatch(fetchProductsRequest({id: ''}));
    this.store.dispatch(fetchCategoriesRequest());
  }

  getProductOfCategory(id: string, title: string) {
    this.title = title;
    this.store.dispatch(fetchProductsRequest({id: id}));
  }
}
