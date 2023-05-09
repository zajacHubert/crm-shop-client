import { DeleteProductResponse, Product } from '@/types/product';
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

import {
  DeleteOrderResponse,
  GetOrdersResponse,
  Order,
  OrderToAdd,
  PostOrderResponse,
} from '@/types/order';

export const ordersApi = createApi({
  reducerPath: 'apiOrders',
  baseQuery: fetchBaseQuery({
    baseUrl: 'http://localhost:8000/api/orders',
  }),
  tagTypes: ['Order'],
  endpoints(builder) {
    return {
      fetchOrders: builder.query<
        GetOrdersResponse,
        { page: number; sort_param?: string; direction?: string }
      >({
        query: (arg) => {
          const { page, sort_param, direction } = arg;
          return {
            url: '/',
            params: { page, sort_param, direction },
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
      addOrder: builder.mutation<PostOrderResponse, OrderToAdd>({
        query: (formAddProductValues) => ({
          url: '/',
          method: 'POST',
          body: formAddProductValues,
        }),
        invalidatesTags: (result) => {
          return [{ type: 'Order', id: result?.order_id }];
        },
      }),
      deleteOrder: builder.mutation<DeleteOrderResponse, string>({
        query: (id) => ({
          url: `/${id}`,
          method: 'DELETE',
        }),
        invalidatesTags: (result) => {
          return [{ type: 'Order', id: result?.order_id }];
        },
      }),
    };
  },
});

export const {
  useFetchOrdersQuery,
  useFetchOrderQuery,
  useAddOrderMutation,
  useDeleteOrderMutation,
} = ordersApi;
