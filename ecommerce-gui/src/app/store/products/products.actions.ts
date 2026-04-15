import { createAction, props } from "@ngrx/store";
import { Product } from "../../common/product";

export const loadProducts = createAction(
  "[Products] Load Products",
  props<{
    categoryId?: number;
    keyword?: string;
    pageNumber?: number;
    pageSize?: number;
  }>(),
);

export const loadProductsSuccess = createAction(
  "[Products] Load Products Success",
  props<{
    products: Product[];
    pageNumber: number;
    pageSize: number;
    totalElements: number;
    totalPages: number;
  }>(),
);

export const loadProductsFailure = createAction(
  "[Products] Load Products Failure",
  props<{ error: string }>(),
);

export const loadProduct = createAction(
  "[Products] Load Product",
  props<{ productId: number }>(),
);

export const loadProductSuccess = createAction(
  "[Products] Load Product Success",
  props<{ product: Product }>(),
);

export const loadProductFailure = createAction(
  "[Products] Load Product Failure",
  props<{ error: string }>(),
);
