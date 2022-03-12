import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { AppState } from '../store/types';
import { deleteProductRequest, fetchProductRequest } from '../store/products.actions';
import { ActivatedRoute } from '@angular/router';
import { Observable, Subscription } from 'rxjs';
import { Product } from '../models/product.model';
import { User } from '../models/user.model';

@Component({
  selector: 'app-product-info',
  templateUrl: './product-info.component.html',
  styleUrls: ['./product-info.component.sass']
})
export class ProductInfoComponent implements OnInit {
  product: Observable<Product | null>;
  productInfo!: Product;
  loading: Observable<boolean>;
  error: Observable<string | null>;
  user: Observable<User | null>;
  userSubscription!: Subscription;
  token = '';

  constructor(private store: Store<AppState>, private route: ActivatedRoute) {
    this.product = store.select(state => state.products.product);
    this.loading = store.select(state => state.products.fetchLoading);
    this.error = store.select(state => state.products.fetchError);
    this.user = store.select(state => state.users.user);
  }

  ngOnInit(): void {
    this.store.dispatch(fetchProductRequest({id: this.route.snapshot.params['id']}));
    this.product.subscribe(product => {
      this.productInfo = <Product>product

    });

  }

  deleteProduct(id: string) {
    this.store.dispatch(deleteProductRequest({id: id,token: this.token}))
  }
}
