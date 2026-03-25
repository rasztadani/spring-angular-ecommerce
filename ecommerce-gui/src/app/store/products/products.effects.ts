import { inject, Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { catchError, map, of, switchMap } from 'rxjs';
import { loadProducts, loadProductsFailure, loadProductsSuccess } from './products.actions';
import { ProductService } from '../../services/productService';

@Injectable()
export class ProductsEffects {
  private actions$ = inject(Actions);
  private productService = inject(ProductService);

  loadProducts$ = createEffect(() =>
    this.actions$.pipe(
      ofType(loadProducts),
      switchMap(({ categoryId, keyword }) => {
        if (keyword) {
          return this.productService.searchProducts(keyword).pipe(
            map((products) => loadProductsSuccess({ products })),
            catchError(() =>
              of(loadProductsFailure({ error: 'Nem sikerült betölteni a termékeket.' })),

            )
          );
        }

        const resolvedCategoryId = categoryId ?? 2;

        return this.productService.getProductList(resolvedCategoryId).pipe(
          map(products => loadProductsSuccess({ products })),
          catchError(() =>
            of(loadProductsFailure({ error: 'Nem sikerült betölteni a termékeket.' }))
          )
        );
      })
    )
  )

}
