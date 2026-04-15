import { Component, inject, OnInit } from "@angular/core";
import { ActivatedRoute, RouterLink } from "@angular/router";
import { AsyncPipe, CurrencyPipe } from "@angular/common";
import { Store } from "@ngrx/store";
import {
  selectProductsError,
  selectProductsLoading,
  selectSelectedProduct,
} from "../../store/products/products.selectors";
import { map } from "rxjs";
import { loadProduct } from "../../store/products/products.actions";

@Component({
  selector: "app-product-details",
  imports: [CurrencyPipe, AsyncPipe, RouterLink],
  standalone: true,
  templateUrl: "./product-details.html",
  styleUrl: "./product-details.css",
})
export class ProductDetails implements OnInit {
  private store = inject(Store);
  private route = inject(ActivatedRoute);

  product$ = this.store.select(selectSelectedProduct);
  loading$ = this.store.select(selectProductsLoading);
  error$ = this.store.select(selectProductsError);

  ngOnInit(): void {
    this.route.paramMap
      .pipe(map((params) => Number(params.get("id"))))
      .subscribe((productId) => {
        if (productId) {
          this.store.dispatch(loadProduct({ productId }));
        }
      });
  }
}
