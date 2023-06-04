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
    deactivateAccount: builder.mutation({
      query: (userId) => ({
        url: `/users/deactivate-account/${userId}`,
        method: 'PATCH',
      }),
    }),

    followUser: builder.mutation({
      query: (userId) => ({
        url: `/users/follow`,
        method: 'PATCH',
        body: { userId },
      }),
    }),
    unfollowUser: builder.mutation({
      query: (userId) => ({
        url: `/users/unfollow`,
        method: 'PATCH',
        body: { userId },
      }),
    }),
  }),
});

export const {
  useGetMyDetailsQuery,
  useDeactivateAccountMutation,
  useFollowUserMutation,
  useUnfollowUserMutation,
} = usersApi;
