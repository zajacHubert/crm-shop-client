import { User } from './../../types/user';
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { getCookie } from 'cookies-next';
import { FormEditUserValues } from '../../types/forms';
import { FormLoginValues, FormRegisterValues } from '@/types/forms';
import {
  GetUsersResponse,
  UserDeleteResponse,
  UserLoginResponse,
  UserLogoutResponse,
  UserRefreshAuthResponse,
  UserRegisterResponse,
} from '@/types/user';

export const usersApi = createApi({
  reducerPath: 'apiUsers',
  baseQuery: fetchBaseQuery({
    baseUrl: 'http://localhost:8000/api',
  }),
  tagTypes: ['User'],
  endpoints(builder) {
    return {
      fetchUsers: builder.query<GetUsersResponse, { page: number }>({
        query: (arg) => {
          const { page } = arg;
          return {
            url: '/users',
            params: { page },
          };
        },
        providesTags: (result) =>
          result
            ? [
                ...result.data.map(({ id }) => ({
                  type: 'User' as const,
                  id,
                })),
              ]
            : [{ type: 'User', id: 'LIST' }],
      }),
      fetchUser: builder.query<User, string>({
        query: (id) => `/users/${id}`,
        providesTags: (result) => {
          return [{ type: 'User', id: result?.id }];
        },
      }),
      register: builder.mutation<UserRegisterResponse, FormRegisterValues>({
        query: (formRegisterValues) => ({
          url: '/register',
          method: 'POST',
          body: formRegisterValues,
        }),
      }),
      login: builder.mutation<UserLoginResponse, FormLoginValues>({
        query: (formLoginValues) => ({
          url: '/login',
          method: 'POST',
          body: formLoginValues,
        }),
      }),
      logout: builder.mutation<UserLogoutResponse, {}>({
        query: () => ({
          url: '/logout',
          method: 'POST',
        }),
      }),
      refreshAuth: builder.mutation<UserRefreshAuthResponse, {}>({
        query: () => ({
          url: '/refresh-auth',
          method: 'POST',
          headers: {
            Authorization: `Bearer ${getCookie('jwt')}`,
          },
        }),
      }),
      editUser: builder.mutation<User, FormEditUserValues>({
        query: ({ id, ...formEditUserValues }) => ({
          url: `/users/${id}`,
          method: 'PUT',
          body: formEditUserValues,
        }),
        invalidatesTags: (result) => {
          return [{ type: 'User', id: result?.id }];
        },
      }),
      deleteUser: builder.mutation<UserDeleteResponse, string>({
        query: (id) => ({
          url: `/users/${id}`,
          method: 'DELETE',
        }),
        invalidatesTags: (result) => {
          return [{ type: 'User', id: result?.user_id }];
        },
      }),
    };
  },
});

export const {
  useFetchUsersQuery,
  useFetchUserQuery,
  useLoginMutation,
  useRegisterMutation,
  useLogoutMutation,
  useRefreshAuthMutation,
  useEditUserMutation,
  useDeleteUserMutation,
} = usersApi;
