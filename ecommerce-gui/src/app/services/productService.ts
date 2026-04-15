import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs";
import { Product } from "../common/product";
import { ProductCategory } from "../common/product-category";

@Injectable({
  providedIn: "root",
})
export class ProductService {
  private baseUrl = "http://localhost:8080/api/products";

  private categoryUrl = "http://localhost:8080/api/product-categories";

  constructor(private httpClient: HttpClient) {}

  getProductList(
    theCategoryId: number,
    pageNumber: number,
    pageSize: number,
  ): Observable<GetResponseProducts> {
    const searchUrl = `${this.baseUrl}/search/find-by-categoryId?categoryId=${theCategoryId}&page=${pageNumber}&size=${pageSize}`;
    return this.getProducts(searchUrl);
  }

  getAllProducts(
    pageNumber: number,
    pageSize: number,
  ): Observable<GetResponseProducts> {
    console.log(pageNumber, pageSize);
    const searchUrl = `${this.baseUrl}?page=${pageNumber}&size=${pageSize}`;
    return this.getProducts(searchUrl);
  }

  getProductById(theProductId: number): Observable<Product> {
    const productUrl = `${this.baseUrl}/${theProductId}`;
    return this.httpClient.get<Product>(productUrl);
  }

  getProductCategories(): Observable<ProductCategory[]> {
    return this.httpClient.get<ProductCategory[]>(this.categoryUrl);
  }

  searchProducts(
    theKeyword: string,
    pageNumber: number,
    pageSize: number,
  ): Observable<GetResponseProducts> {
    const searchUrl = `${this.baseUrl}/search/find-by-keyword?keyword=${encodeURIComponent(theKeyword)}&page=${pageNumber}&size=${pageSize}`;
    return this.getProducts(searchUrl);
  }

  private getProducts(searchUrl: string): Observable<GetResponseProducts> {
    return this.httpClient.get<GetResponseProducts>(searchUrl);
  }
}

interface GetResponseProducts {
  content: Product[];
  page: {
    number: number;
    size: number;
    totalElements: number;
    totalPages: number;
  };
}

