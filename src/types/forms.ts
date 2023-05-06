import { Product } from './product';

export interface FormLoginValues {
  email: string;
  password: string;
}

export interface FormRegisterValues {
  name: string;
  email: string;
  password: string;
  role_id: string;
}

export interface FormAddProductValues {
  product_name: string;
  product_desc: string;
  product_price: number;
  product_category: 'regular' | 'bargain' | 'sale' | 'newest';
}

export type FormEditProductValues = Partial<Product>;
