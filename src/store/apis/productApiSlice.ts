import { GetProductsResponse, Product } from '@/types/product';
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const productsApi = createApi({
  reducerPath: 'apiProducts',
  baseQuery: fetchBaseQuery({
    baseUrl: 'http://localhost:8000/api/products',
  }),
  tagTypes: ['Product'],
  endpoints(builder) {
    return {
      fetchProducts: builder.query<
        GetProductsResponse,
        { page: number; category?: string }
      >({
        query: (arg) => {
          const { page, category } = arg;
          return {
            url: '/',
            params: { page, category },
          };
        },
        providesTags: (result) =>
          result
            ? [
                ...result.data.map(({ id }) => ({
                  type: 'Product' as const,
                  id,
                })),
              ]
            : [{ type: 'Product', id: 'LIST' }],
      }),
    };
  },
});

export const { useFetchProductsQuery } = productsApi;
