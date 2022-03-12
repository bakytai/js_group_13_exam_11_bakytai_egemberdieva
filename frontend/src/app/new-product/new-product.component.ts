import { Component, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Store } from '@ngrx/store';
import { ProductData } from '../models/product.model';
import { AppState } from '../store/types';
import { Observable } from 'rxjs';
import { User } from '../models/user.model';
import { Category } from '../models/category.model';
import { createProductRequest } from '../store/products.actions';
import { fetchCategoriesRequest } from '../store/categories.actions';

@Component({
  selector: 'app-new-product',
  templateUrl: './new-product.component.html',
  styleUrls: ['./new-product.component.sass']
})
export class NewProductComponent implements OnInit {
  @ViewChild('f') form!: NgForm;
  categories: Observable<Category[]>;
  user: Observable<User | null>;
  userObj!: User;
  loading: Observable<boolean>;
  error: Observable<null | string>;

  constructor(private store: Store<AppState>) {
    this.categories = store.select(state => state.categories.categories);
    this.loading = store.select(state => state.categories.fetchLoading);
    this.error = store.select(state => state.categories.fetchError);
    this.user = store.select(state => state.users.user);
  }

  ngOnInit(): void {
    this.user.subscribe(user => {
      if (user) {
        this.userObj = <User>user
      }
    })
    this.store.dispatch(fetchCategoriesRequest());
  }

  onSubmit() {
    const productData = this.form.value;
    const product: ProductData = {
      title: productData.title,
      category: productData.category,
      description: productData.description,
      price: productData.price,
      image: productData.image,
      user: {
        _id: this.userObj._id,
        displayName: this.userObj.displayName,
        phoneNumber: this.userObj.phoneNumber,
        token: this.userObj.token
      }
    }

    console.log(product);
    this.store.dispatch(createProductRequest({productData: product}));
  }
}
