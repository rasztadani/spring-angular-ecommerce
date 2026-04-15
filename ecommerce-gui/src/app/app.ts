import { Component, signal } from "@angular/core";
import { RouterOutlet } from "@angular/router";
import { ProductCategoryMenu } from "./components/product-category-menu/product-category-menu";
import { SearchComponent } from "./components/search/search";
import { NgbModule } from "@ng-bootstrap/ng-bootstrap";

@Component({
  selector: "app-root",
  imports: [RouterOutlet, ProductCategoryMenu, SearchComponent, NgbModule],
  standalone: true,
  templateUrl: "./app.html",
  styleUrl: "./app.css",
})
export class App {
  protected readonly title = signal("ecommerce-gui");
}
