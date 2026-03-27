import {
  ApplicationConfig,
  provideBrowserGlobalErrorListeners,
} from "@angular/core";
import { provideRouter } from "@angular/router";

import { routes } from "./app.routes";
import { provideStore } from "@ngrx/store";
import { productsReducer } from "./store/products/products.reducer";
import { provideEffects } from "@ngrx/effects";
import { ProductsEffects } from "./store/products/products.effects";
import { provideStoreDevtools } from "@ngrx/store-devtools";
import { provideHttpClient } from "@angular/common/http";

export const appConfig: ApplicationConfig = {
  providers: [
    provideHttpClient(),
    provideStore({
      products: productsReducer,
    }),
    provideEffects([ProductsEffects]),
    provideBrowserGlobalErrorListeners(),
    provideRouter(routes),
    provideStoreDevtools({ maxAge: 25, logOnly: false }),
  ],
};
