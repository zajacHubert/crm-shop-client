import { Role } from '@/types/role';

import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const rolesApi = createApi({
  reducerPath: 'apiRoles',
  baseQuery: fetchBaseQuery({
    baseUrl: 'http://localhost:8000/api/roles',
  }),
  tagTypes: ['Role'],
  endpoints(builder) {
    return {
      fetchRoles: builder.query<Role[], void>({
        query: () => {
          return {
            url: '/',
          };
        },
      }),
    };
  },
});

export const { useFetchRolesQuery } = rolesApi;
