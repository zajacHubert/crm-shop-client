import { Product } from '@/types/product';

export const countOrderValue = (products: Product[]) => {
  const value = products.reduce(
    (prev, curr) => prev + Number(curr.product_price),
    0
  );
  return value.toFixed(2);
};
