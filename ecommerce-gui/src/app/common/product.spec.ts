import { Product } from './product';

describe('Product', () => {
  it('should create an instance', () => {
    const product = new Product
    ('', '', '', 0, '', false, 0, new Date(), new Date());

    expect(product).toBeTruthy();
  });
});
