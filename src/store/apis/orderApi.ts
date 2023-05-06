import {
  DeleteProductResponse,
  FormEditProductValues,
  Product,
} from '@/types/product';
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { FormAddProductValues } from '../../types/product';
import { GetOrdersResponse, Order } from '@/types/order';

export const ordersApi = createApi({
  reducerPath: 'apiOrders',
  baseQuery: fetchBaseQuery({
    baseUrl: 'http://localhost:8000/api/orders',
  }),
  tagTypes: ['Order'],
  endpoints(builder) {
    return {
      fetchOrders: builder.query<GetOrdersResponse, { page: number }>({
        query: (arg) => {
          const { page } = arg;
          return {
            url: '/',
            params: { page },
          };
        },
        providesTags: (result) =>
          result
            ? [
                ...result.data.map(({ id }) => ({
                  type: 'Order' as const,
                  id,
                })),
              ]
            : [{ type: 'Order', id: 'LIST' }],
      }),
      fetchOrder: builder.query<Order, string>({
        query: (id) => `/${id}`,
        providesTags: (result) => {
          return [{ type: 'Order', id: result?.id }];
        },
      }),
      addOrder: builder.mutation<Product, FormAddProductValues>({
        query: (formAddProductValues) => ({
          url: '/',
          method: 'POST',
          body: formAddProductValues,
        }),
        invalidatesTags: (result) => {
          return [{ type: 'Order', id: result?.id }];
        },
      }),
      editOrder: builder.mutation<Product, FormEditProductValues>({
        query: ({ id, ...formEditProductValues }) => ({
          url: `/${id}`,
          method: 'PUT',
          body: formEditProductValues,
        }),
        invalidatesTags: (result) => {
          return [{ type: 'Order', id: result?.id }];
        },
      }),
      deleteOrder: builder.mutation<DeleteProductResponse, string>({
        query: (id) => ({
          url: `/${id}`,
          method: 'DELETE',
        }),
        invalidatesTags: (result) => {
          return [{ type: 'Order', id: result?.id }];
        },
      }),
    };
  },
});

export const {
  useFetchOrdersQuery,
  useFetchOrderQuery,
  useAddOrderMutation,
  useEditOrderMutation,
  useDeleteOrderMutation,
} = ordersApi;
