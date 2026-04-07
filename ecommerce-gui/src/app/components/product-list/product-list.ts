import { Component, inject, OnInit } from "@angular/core";
import { AsyncPipe, CurrencyPipe } from "@angular/common";
import { ActivatedRoute, RouterLink } from "@angular/router";
import { Store } from "@ngrx/store";
import {
  selectProducts,
  selectProductsError,
  selectProductsLoading,
} from "../../store/products/products.selectors";
import { map } from "rxjs";
import { loadProducts } from "../../store/products/products.actions";

@Component({
  selector: "app-product-list",
  imports: [CurrencyPipe, AsyncPipe, RouterLink],
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

  ngOnInit(): void {
    this.route.paramMap
      .pipe(
        map((params) => {
          const keyword = params.get("keyword");
          const id = params.get("id");
          if (keyword) {
            return loadProducts({ keyword });
          }
          return loadProducts({ categoryId: id ? Number(id) : 2 });
        }),
      )
      .subscribe((action) => this.store.dispatch(action));
  }
}
