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

@Injectable()

export class ProductsEffects {
  fetchProducts = createEffect(() => this.actions.pipe(
    ofType(fetchProductsRequest),
    mergeMap(() => this.productsService.getProducts().pipe(
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
    mergeMap(({productData, token}) => this.productsService.createProduct(productData,token).pipe(
      map(() => createProductSuccess()),
      tap(() => this.router.navigate(['/'])),
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

  constructor(
    private router: Router,
    private actions: Actions,
    private productsService: ProductService
  ) {}
}