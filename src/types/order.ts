import { Product } from './product';

export interface Order {
  id: string;
  user_id: string;
  created_at: string;
  value: number;
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

export interface OrderToAdd {
  user_id: string;
  productsIds: string[];
  value: number;
}

export interface PostOrderResponse {
  success: boolean;
  order_id: string;
}

export interface DeleteOrderResponse {
  success: boolean;
  order_id: string;
}
