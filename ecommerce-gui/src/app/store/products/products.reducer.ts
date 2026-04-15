import { createReducer, on } from "@ngrx/store";
import { ProductsState } from "./products.models";
import {
  loadProduct,
  loadProductFailure,
  loadProducts,
  loadProductsFailure,
  loadProductsSuccess,
  loadProductSuccess,
} from "./products.actions";

export const initialState: ProductsState = {
  products: [],
  selectedProduct: null,
  loading: false,
  error: null,
  pageNumber: 0,
  pageSize: 8,
  totalElements: 0,
  totalPages: 0,
  currentCategoryId: null,
  currentKeyword: null,
};

export const productsReducer = createReducer(
  initialState,
  on(loadProducts, (state, action) => ({
    ...state,
    loading: true,
    error: null,
    currentCategoryId: action.categoryId ?? null,
    currentKeyword: action.keyword ?? null,
    pageNumber: action.pageNumber ?? state.pageNumber,
    pageSize: action.pageSize ?? state.pageSize,
  })),
  on(loadProductsSuccess, (state, action) => ({
    ...state,
    products: action.products,
    loading: false,
    error: null,
    pageNumber: action.pageNumber,
    pageSize: action.pageSize,
    totalElements: action.totalElements,
    totalPages: action.totalPages,
  })),

  on(loadProductsFailure, (state, action) => ({
    ...state,
    loading: false,
    error: action.error,
  })),
  on(loadProduct, (state) => ({
    ...state,
    loading: true,
    error: null,
    selectedProduct: null,
  })),
  on(loadProductSuccess, (state, { product }) => ({
    ...state,
    selectedProduct: product,
    loading: false,
  })),
  on(loadProductFailure, (state, { error }) => ({
    ...state,
    loading: false,
    error,
  })),
);
