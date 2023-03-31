import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/dist/query/react';

import { BASE_URL } from '../../../constant';

export const usersApi = createApi({
  reducerPath: 'usersApi',
  baseQuery: fetchBaseQuery({
    baseUrl: BASE_URL,
    credentials: 'include',
  }),
  tagTypes: ['user-details'],

  endpoints: (builder) => ({
    getMyDetails: builder.query({
      query: (userId) => `/profile/${userId}`,
      providesTags: ['user-details'],
    }),
  }),
});

export const { useGetMyDetailsQuery } = usersApi;
