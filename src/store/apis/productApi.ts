import { FormAddProductValues, FormEditProductValues } from '@/types/forms';
import {
  DeleteProductResponse,
  GetProductsResponse,
  Product,
} from '@/types/product';
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const productsApi = createApi({
  reducerPath: 'apiProducts',
  baseQuery: fetchBaseQuery({
    baseUrl: `${process.env.NEXT_PUBLIC_API}`,
  }),
  tagTypes: ['Product'],
  endpoints(builder) {
    return {
      fetchProducts: builder.query<
        GetProductsResponse,
        { page: number; product_category?: string }
      >({
        query: (arg) => {
          const { page, product_category } = arg;
          return {
            url: '/products',
            params: { page, product_category },
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
      fetchProduct: builder.query<Product, string>({
        query: (id) => `products/${id}`,
        providesTags: (result) => {
          return [{ type: 'Product', id: result?.id }];
        },
      }),
      addProduct: builder.mutation<Product, FormAddProductValues>({
        query: (formAddProductValues) => ({
          url: '/products',
          method: 'POST',
          body: formAddProductValues,
        }),
        invalidatesTags: (result) => {
          return [{ type: 'Product', id: result?.id }];
        },
      }),
      editProduct: builder.mutation<Product, FormEditProductValues>({
        query: ({ id, ...formEditProductValues }) => ({
          url: `/products/${id}`,
          method: 'PUT',
          body: formEditProductValues,
        }),
        invalidatesTags: (result) => {
          return [{ type: 'Product', id: result?.id }];
        },
      }),
      deleteProduct: builder.mutation<DeleteProductResponse, string>({
        query: (id) => ({
          url: `/products/${id}`,
          method: 'DELETE',
        }),
        invalidatesTags: (result) => {
          return [{ type: 'Product', id: result?.id }];
        },
      }),
    };
  },
});

export const {
  useFetchProductsQuery,
  useFetchProductQuery,
  useAddProductMutation,
  useEditProductMutation,
  useDeleteProductMutation,
} = productsApi;
