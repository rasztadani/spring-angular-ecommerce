import { Routes } from "@angular/router";
import { ProductListComponent } from "./components/product-list/product-list";
import { ProductDetails } from "./components/product-details/product-details";

export const routes: Routes = [
  { path: "products/:id", component: ProductDetails },
  { path: "search/:keyword", component: ProductListComponent },
  { path: "category/:id", component: ProductListComponent },
  { path: "category", component: ProductListComponent },
  { path: "products", component: ProductListComponent },
  { path: "", redirectTo: "/products", pathMatch: "full" },
  { path: "**", redirectTo: "/products", pathMatch: "full" },
];
