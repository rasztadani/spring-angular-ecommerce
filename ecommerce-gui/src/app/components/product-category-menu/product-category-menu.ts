import { Component, signal } from "@angular/core";
import { ProductCategory } from "../../common/product-category";
import { ProductService } from "../../services/productService";
import { RouterLink, RouterLinkActive } from "@angular/router";

@Component({
  selector: "app-product-category-menu",
  imports: [RouterLink, RouterLinkActive],
  standalone: true,
  templateUrl: "./product-category-menu.html",
  styleUrl: "./product-category-menu.css",
})
export class ProductCategoryMenu {
  productCategories = signal<ProductCategory[]>([]);

  constructor(private productService: ProductService) {}

  ngOnInit() {
    this.listProductCategories();
  }

  listProductCategories() {
    this.productService.getProductCategories().subscribe((data) => {
      console.log("categories:", data);
      this.productCategories.set(data);
    });
  }
}
