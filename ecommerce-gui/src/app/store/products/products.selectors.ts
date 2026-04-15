import { createFeatureSelector, createSelector } from "@ngrx/store";
import { ProductsState } from "./products.models";

export const selectProductsState =
  createFeatureSelector<ProductsState>("products");

export const selectProducts = createSelector(
  selectProductsState,
  (state) => state.products,
);

export const selectSelectedProduct = createSelector(
  selectProductsState,
  (state) => state.selectedProduct,
);

export const selectProductsLoading = createSelector(
  selectProductsState,
  (state) => state.loading,
);

export const selectProductsError = createSelector(
  selectProductsState,
  (state) => state.error,
);

export const selectPageNumber = createSelector(
  selectProductsState,
  (state) => state.pageNumber,
);

export const selectPageSize = createSelector(
  selectProductsState,
  (state) => state.pageSize,
);

export const selectTotalElements = createSelector(
  selectProductsState,
  (state) => state.totalElements,
);

export const selectTotalPages = createSelector(
  selectProductsState,
  (state) => state.totalPages,
);

export const selectCurrentCategoryId = createSelector(
  selectProductsState,
  (state) => state.currentCategoryId,
);

export const selectCurrentKeyword = createSelector(
  selectProductsState,
  (state) => state.currentKeyword,
);