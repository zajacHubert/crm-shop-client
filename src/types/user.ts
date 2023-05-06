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

export interface UserRegisterResponse {
  data: User;
}

export interface UserLoginResponse {
  jwt: string;
  user_logged: User;
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
