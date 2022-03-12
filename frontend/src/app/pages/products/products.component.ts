import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Product } from '../../models/product.model';
import { Store } from '@ngrx/store';
import { AppState } from '../../store/types';
import { fetchProductsRequest } from '../../store/products.actions';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.sass']
})
export class ProductsComponent implements OnInit {
  products: Observable<Product[]>
  loading: Observable<boolean>
  error: Observable<null | string>

  constructor(private store: Store<AppState>) {
    this.products = store.select(state => state.products.products);
    this.loading = store.select(state => state.products.fetchLoading);
    this.error = store.select(state => state.products.fetchError);
  }

  ngOnInit(): void {
    this.store.dispatch(fetchProductsRequest());
  }

}
