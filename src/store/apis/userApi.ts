import { FormLoginValues } from '@/types/forms';
import {
  UserLoginResponse,
  UserLogoutResponse,
  UserRefreshAuthResponse,
} from '@/types/user';
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { getCookie } from 'cookies-next';

export const usersApi = createApi({
  reducerPath: 'apiUsers',
  baseQuery: fetchBaseQuery({
    baseUrl: 'http://localhost:8000/api',
  }),
  tagTypes: ['User'],
  endpoints(builder) {
    return {
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
    };
  },
});

export const { useLoginMutation, useLogoutMutation, useRefreshAuthMutation } =
  usersApi;
