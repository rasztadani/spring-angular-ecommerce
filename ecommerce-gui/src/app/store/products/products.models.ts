import { Product } from '../../common/product';

export interface ProductsState {
  products: Product[];
  loading: boolean;
  error: string | null;
}
