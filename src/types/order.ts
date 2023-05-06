import { Product } from './product';

export interface Order {
  id: string;
  user_id: string;
  created_at: string;
  user: {
    id: string;
    name: string;
    email: string;
    role_id: string;
  };
  products: Product[];
}

export interface GetOrdersResponse {
  current_page: number;
  data: Order[];
  per_page: number;
  last_page: number;
  total: number;
}
