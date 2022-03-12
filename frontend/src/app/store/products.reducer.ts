import { createReducer, on } from '@ngrx/store';
import {
  createProductFailure,
  createProductRequest,
  createProductSuccess,
  deleteProductFailure,
  deleteProductRequest,
  deleteProductSuccess,
  fetchProductFailure,
  fetchProductRequest,
  fetchProductsFailure,
  fetchProductsRequest,
  fetchProductsSuccess,
  fetchProductSuccess
} from './products.actions';
import { ProductsState } from './types';

const initialState: ProductsState = {
  products: [],
  product: null,
  fetchLoading: false,
  fetchError: null,
  createLoading: false,
  createError: null,
  deleteLoading: false,
  deleteError: null
};

export const productsReducer = createReducer(
  initialState,
  on(fetchProductsRequest, state => ({...state, fetchLoading: true})),
  on(fetchProductsSuccess, (state, {products}) => ({...state, fetchLoading: false, products})),
  on(fetchProductsFailure, (state, {error}) => ({
    ...state,
    fetchLoading: false,
    fetchError: error
  })),

  on(fetchProductRequest, state => ({...state, fetchLoading: true})),
  on(fetchProductSuccess, (state, {product}) => ({...state, fetchLoading: false, product})),
  on(fetchProductFailure, (state, {error}) => ({
    ...state,
    fetchLoading: false,
    fetchError: error
  })),

  on(createProductRequest, state => ({...state, createLoading: true})),
  on(createProductSuccess, state => ({...state, createLoading: false})),
  on(createProductFailure, (state, {error}) => ({
    ...state,
    createLoading: false,
    createError: error})),

  on(deleteProductRequest, state => ({...state, createLoading: true})),
  on(deleteProductSuccess, state => ({...state, createLoading: false})),
  on(deleteProductFailure, (state, {error}) => ({
    ...state,
    createLoading: false,
    createError: error})),
)
