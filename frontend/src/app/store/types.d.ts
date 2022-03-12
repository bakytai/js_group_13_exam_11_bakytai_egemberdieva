import { Product } from '../models/product.model';
import { LoginError, RegisterError, User } from '../models/user.model';
import { Category } from '../models/category.model';

export type UserState = {
  user: null | User,
  registerLoading: boolean,
  registerError: null | RegisterError,
  loginLoading: boolean,
  loginError: null | LoginError
}

export type CategoriesState = {
  categories: Category[],
  fetchLoading: boolean,
  fetchError: null | string,
};

export type ProductsState = {
  products: Product[],
  product: Product | null,
  fetchLoading: boolean,
  fetchError: null | string,
  createLoading: boolean,
  createError: null | string,
  deleteLoading: boolean,
  deleteError: null | string
};

export type AppState = {
  users: UserState,
  categories: CategoriesState,
  products: ProductsState,
}
