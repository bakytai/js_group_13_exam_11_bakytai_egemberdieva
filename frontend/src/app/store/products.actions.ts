import { createAction, props } from '@ngrx/store';
import { Product, ProductData } from '../models/product.model';

export const fetchProductsRequest = createAction(
  '[Products] Fetch Request',
  props<{id: string}>());
export const fetchProductsSuccess = createAction(
  '[Products] Fetch Success',
  props<{products: Product[]}>()
);
export const fetchProductsFailure = createAction(
  '[Products] Fetch Failure',
  props<{error: string}>()
);

export const fetchProductRequest = createAction(
  '[Product] Fetch Request',
  props<{id: string}>()
);
export const fetchProductSuccess = createAction(
  '[Product] Fetch Success',
  props<{product: Product}>()
);
export const fetchProductFailure = createAction(
  '[Product] Fetch Failure',
  props<{error: string}>()
);

export const createProductRequest = createAction(
  '[Products] Create Request',
  props<{productData: ProductData}>()
);
export const createProductSuccess = createAction(
  '[Products] Create Success',
  props<{product: Product}>()
);
export const createProductFailure = createAction(
  '[Products] Create Failure',
  props<{error: string}>()
);

export const deleteProductRequest = createAction(
  '[Products] Create Request',
  props<{id: string, token: string}>()
);
export const deleteProductSuccess = createAction(
  '[Products] Create Success'
);
export const deleteProductFailure = createAction(
  '[Products] Create Failure',
  props<{error: string}>()
);

