import { Component, signal } from '@angular/core';
import { RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';
import { ProductListComponent } from './components/product-list/product-list';
import { ProductCategoryMenu } from './components/product-category-menu/product-category-menu';
import { SearchComponent } from './components/search/search';

@Component({
  selector: 'app-root',
  imports: [
    RouterOutlet,
    ProductCategoryMenu,
    SearchComponent,
  ],
  templateUrl: './app.html',
  styleUrl: './app.css',
})
export class App {
  protected readonly title = signal('angular-ecommerce');
}
