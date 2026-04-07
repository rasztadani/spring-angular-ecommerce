import { Component, OnInit, signal } from "@angular/core";
import { Product } from "../../common/product";
import { ProductService } from "../../services/productService";
import { ActivatedRoute, RouterLink } from "@angular/router";
import { CurrencyPipe } from "@angular/common";

@Component({
  selector: "app-product-details",
  imports: [CurrencyPipe, RouterLink],
  standalone: true,
  templateUrl: "./product-details.html",
  styleUrl: "./product-details.css",
})
export class ProductDetails implements OnInit {
  product = signal<Product | undefined>(undefined);

  constructor(
    private productService: ProductService,
    private route: ActivatedRoute,
  ) {}

  ngOnInit(): void {
    this.route.paramMap.subscribe((params) => {
      this.handleProductDetails();
    });
  }

  handleProductDetails(): void {
    const productId = Number(this.route.snapshot.paramMap.get("id"));
    if (productId) {
      this.productService.getProductById(productId).subscribe((product) => {
        this.product.set(product);
      });
    }
  }
}
