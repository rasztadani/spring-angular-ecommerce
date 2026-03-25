import { ProductCategory } from './product-category';

describe('ProductCategory', () => {
  it('should create an instance', () => {
    const category = new ProductCategory(0, '');

    expect(category).toBeTruthy();
  });
});
