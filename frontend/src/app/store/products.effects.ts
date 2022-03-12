import { Actions, createEffect, ofType } from '@ngrx/effects';
import { Injectable } from '@angular/core';
import {
  createProductFailure,
  createProductRequest,
  createProductSuccess, deleteProductFailure,
  deleteProductRequest,
  deleteProductSuccess,
  fetchProductFailure,
  fetchProductRequest,
  fetchProductsFailure,
  fetchProductsRequest,
  fetchProductsSuccess,
  fetchProductSuccess
} from './products.actions';
import { catchError, mergeMap, of, tap } from 'rxjs';
import { map } from 'rxjs';
import { Router } from '@angular/router';
import { ProductService } from '../services/products.service';
import { HelpersService } from '../services/helpers.service';

@Injectable()

export class ProductsEffects {

  constructor(
    private router: Router,
    private actions: Actions,
    private productsService: ProductService,
    private helpers: HelpersService,
  ) {}

  fetchProducts = createEffect(() => this.actions.pipe(
    ofType(fetchProductsRequest),
    mergeMap(({id}) => this.productsService.getProducts(id).pipe(
      map(products => fetchProductsSuccess({products})),
      catchError(() => of(fetchProductsFailure({error: 'Something went wrong'})))
    ))
  ));

  fetchProduct = createEffect(() => this.actions.pipe(
    ofType(fetchProductRequest),
    mergeMap(({id}) => this.productsService.getProductInfo(id).pipe(
      map(product => fetchProductSuccess({product})),
      catchError(() => of(fetchProductFailure({error: 'Something went wrong'})))
    ))
  ));

  createProduct = createEffect(() => this.actions.pipe(
    ofType(createProductRequest),
    mergeMap(({productData}) => this.productsService.createProduct(productData).pipe(
      map(product => createProductSuccess({product})),
      tap(() => {
        this.helpers.openSnackbar('Created new product successful');
        void this.router.navigate(['/']);
      }),
      catchError(() => of(createProductFailure({error: 'Wrong Data'})))
    ))
  ));


  deleteProduct = createEffect(() => this.actions.pipe(
    ofType(deleteProductRequest),
    mergeMap(({id, token}) => this.productsService.deleteProduct(id,token).pipe(
      map(() => deleteProductSuccess()),
      tap(() => this.router.navigate(['/'])),
      catchError(() => of(deleteProductFailure({error: 'Wrong Data'})))
    ))
  ));


}
