import { Role } from '@/types/role';

import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const rolesApi = createApi({
  reducerPath: 'apiRoles',
  baseQuery: fetchBaseQuery({
    baseUrl: `${process.env.NEXT_PUBLIC_API}`,
  }),
  tagTypes: ['Role'],
  endpoints(builder) {
    return {
      fetchRoles: builder.query<Role[], void>({
        query: () => {
          return {
            url: '/roles',
          };
        },
      }),
    };
  },
});

export const { useFetchRolesQuery } = rolesApi;
