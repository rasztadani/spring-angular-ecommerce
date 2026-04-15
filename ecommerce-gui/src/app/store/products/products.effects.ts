import { inject, Injectable } from "@angular/core";
import { Actions, createEffect, ofType } from "@ngrx/effects";
import { catchError, map, of, switchMap } from "rxjs";
import {
  loadProduct,
  loadProductFailure,
  loadProducts,
  loadProductsFailure,
  loadProductsSuccess,
  loadProductSuccess,
} from "./products.actions";
import { ProductService } from "../../services/productService";

@Injectable()
export class ProductsEffects {
  private actions$ = inject(Actions);
  private productService = inject(ProductService);

  loadProducts$ = createEffect(() =>
    this.actions$.pipe(
      ofType(loadProducts),
      switchMap(({ categoryId, keyword, pageNumber = 0, pageSize = 8 }) => {
        if (keyword) {
          return this.productService
            .searchProducts(keyword, pageNumber, pageSize)
            .pipe(
              map((response) =>
                loadProductsSuccess({
                  products: response.content ?? [],
                  pageNumber: response.page.number,
                  pageSize: response.page.size,
                  totalElements: response.page.totalElements,
                  totalPages: response.page.totalPages,
                }),
              ),
              catchError(() =>
                of(
                  loadProductsFailure({
                    error: "Nem sikerült betölteni a termékeket.",
                  }),
                ),
              ),
            );
        }

        if (categoryId != null) {
          return this.productService
            .getProductList(categoryId, pageNumber, pageSize)
            .pipe(
              map((response) =>
                loadProductsSuccess({
                  products: response.content ?? [],
                  pageNumber: response.page.number,
                  pageSize: response.page.size,
                  totalElements: response.page.totalElements,
                  totalPages: response.page.totalPages,
                }),
              ),
              catchError(() =>
                of(
                  loadProductsFailure({
                    error: "Nem sikerült betölteni a termékeket.",
                  }),
                ),
              ),
            );
        }

        return this.productService.getAllProducts(pageNumber, pageSize).pipe(
          map((response) =>
            loadProductsSuccess({
              products: response.content ?? [],
              pageNumber: response.page.number,
              pageSize: response.page.size,
              totalElements: response.page.totalElements,
              totalPages: response.page.totalPages,
            }),
          ),
          catchError(() =>
            of(
              loadProductsFailure({
                error: "Nem sikerült betölteni a termékeket.",
              }),
            ),
          ),
        );
      }),
    ),
  );

  loadProduct$ = createEffect(() =>
    this.actions$.pipe(
      ofType(loadProduct),
      switchMap(({ productId }) =>
        this.productService.getProductById(productId).pipe(
          map((product) => loadProductSuccess({ product })),
          catchError(() =>
            of(
              loadProductFailure({
                error: "Nem sikerült betölteni a termék részleteit.",
              }),
            ),
          ),
        ),
      ),
    ),
  );
}
