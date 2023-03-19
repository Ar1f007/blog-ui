import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/dist/query/react';

import { BASE_URL } from '../../../constant';

import type { TotalReaction } from './types';

export const postInfoApi = createApi({
  reducerPath: 'postInfoApi',
  baseQuery: fetchBaseQuery({
    baseUrl: BASE_URL,
  }),
  endpoints: (builder) => ({
    getTotalReactions: builder.query<TotalReaction, string>({
      query: (postId: string) => ({
        url: `/reactions/${postId}`,
      }),
    }),
  }),
});

export const { useGetTotalReactionsQuery } = postInfoApi;
