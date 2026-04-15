import { Component, inject, OnInit } from "@angular/core";
import { AsyncPipe, CurrencyPipe } from "@angular/common";
import { ActivatedRoute, RouterLink } from "@angular/router";
import { Store } from "@ngrx/store";
import {
  selectCurrentCategoryId,
  selectCurrentKeyword,
  selectPageNumber,
  selectPageSize,
  selectProducts,
  selectProductsError,
  selectProductsLoading,
  selectTotalElements,
  selectTotalPages,
} from "../../store/products/products.selectors";
import { firstValueFrom, map } from "rxjs";
import { loadProducts } from "../../store/products/products.actions";
import { NgbPagination } from "@ng-bootstrap/ng-bootstrap";

const DEFAULT_PAGE_SIZE = 5;

@Component({
  selector: "app-product-list",
  imports: [CurrencyPipe, AsyncPipe, RouterLink, NgbPagination],
  standalone: true,
  templateUrl: "./product-list.html",
  styleUrl: "./product-list.css",
})
export class ProductListComponent implements OnInit {
  private store = inject(Store);
  private route = inject(ActivatedRoute);

  products$ = this.store.select(selectProducts);
  loading$ = this.store.select(selectProductsLoading);
  error$ = this.store.select(selectProductsError);
  pageNumber$ = this.store.select(selectPageNumber);
  pageSize$ = this.store.select(selectPageSize);
  totalPages$ = this.store.select(selectTotalPages);
  totalElements$ = this.store.select(selectTotalElements);
  currentCategoryId$ = this.store.select(selectCurrentCategoryId);
  currentKeyword$ = this.store.select(selectCurrentKeyword);

  ngOnInit(): void {
    this.route.paramMap
      .pipe(
        map((params) => {
          const keyword = params.get("keyword");
          const id = params.get("id");
          console.log(this.totalPages$);
          if (keyword) {
            return loadProducts({
              keyword,
              pageNumber: 0,
              pageSize: DEFAULT_PAGE_SIZE,
            });
          }

          if (id) {
            return loadProducts({
              categoryId: Number(id),
              pageNumber: 0,
              pageSize: DEFAULT_PAGE_SIZE,
            });
          }

          return loadProducts({ pageNumber: 0, pageSize: DEFAULT_PAGE_SIZE });
        }),
      )
      .subscribe((action) => this.store.dispatch(action));
  }

  async goToPage(pageNumber: number): Promise<void> {
    const currentPageSize = await firstValueFrom(this.pageSize$);
    const currentKeyword = await firstValueFrom(this.currentKeyword$);
    const currentCategoryId = await firstValueFrom(this.currentCategoryId$);

    if (currentKeyword) {
      this.store.dispatch(
        loadProducts({
          keyword: currentKeyword,
          pageNumber,
          pageSize: currentPageSize,
        }),
      );
      return;
    }

    if (currentCategoryId != null) {
      this.store.dispatch(
        loadProducts({
          categoryId: currentCategoryId,
          pageNumber,
          pageSize: currentPageSize,
        }),
      );
      return;
    }

    this.store.dispatch(
      loadProducts({
        pageNumber,
        pageSize: currentPageSize,
      }),
    );
  }

  changePageSize(pageSize: string): void {
    this.store.dispatch(
      loadProducts({
        pageNumber: 0,
        pageSize: parseInt(pageSize, 10),
      }),
    );
  }
}