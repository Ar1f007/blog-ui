import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/dist/query/react';

import { BASE_URL } from '../../../constant';

import type { UserDetails } from './types';

export const usersApi = createApi({
  reducerPath: 'usersApi',
  baseQuery: fetchBaseQuery({
    baseUrl: BASE_URL,
    credentials: 'include',
  }),
  tagTypes: ['user-details'],

  endpoints: (builder) => ({
    getMyDetails: builder.query<UserDetails, string>({
      query: (userId) => `/users/profile/${userId}`,
      providesTags: ['user-details'],
    }),
  }),
});

export const { useGetMyDetailsQuery } = usersApi;
