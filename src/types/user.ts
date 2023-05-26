import { Order } from './order';
import { Role } from './role';

export interface User {
  id: string;
  name: string;
  email: string;
  role_id: string;
  role: Role;
  orders?: Order[];
}

export interface GetUsersResponse {
  data: User[];
  current_page: number;
  per_page: number;
  last_page: number;
  total: number;
}

export interface UserRegisterResponse {
  data: User;
}

export interface UserLoginResponse {
  jwt: string;
  user_logged: User;
}

export interface UserLoginError {
  data: {
    error: string;
  };
}

export interface UserRegisterError {
  data: {
    data: {
      email?: string;
      name?: string;
    };
  };
}

export interface UserLogoutResponse {
  success: boolean;
  message: string;
}

export interface Auth {
  jwt: string;
  user_logged: User;
}

export interface UserRefreshAuthResponse {
  data: Auth;
}

export interface UserDeleteResponse {
  success: boolean;
  user_id: string;
}
