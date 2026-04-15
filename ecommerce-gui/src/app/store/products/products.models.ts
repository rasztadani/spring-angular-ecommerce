import { Product } from "../../common/product";

export interface ProductsState {
  products: Product[];
  selectedProduct: Product | null;
  loading: boolean;
  error: string | null;
  pageNumber: number;
  pageSize: number;
  totalElements: number;
  totalPages: number;
  currentCategoryId: number | null;
  currentKeyword: string | null;
}
