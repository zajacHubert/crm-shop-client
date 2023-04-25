export interface Product {
  id: string;
  product_name: string;
  product_desc: string;
  product_price: number;
  product_category: 'regular' | 'bargain' | 'sale' | 'newest';
}

export interface GetProductsResponse {
  current_page: number;
  data: Product[];
  per_page: number;
  last_page: number;
}
