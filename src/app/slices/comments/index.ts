import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

import { BASE_URL } from '../../../constant';

import type { CommentsData } from './type';

export const commentsApi = createApi({
  reducerPath: 'commentsApi',
  baseQuery: fetchBaseQuery({
    baseUrl: BASE_URL,
  }),
  refetchOnMountOrArgChange: 30,
  endpoints: (builder) => ({
    getComments: builder.query<CommentsData, string>({
      query: (id) => `/comments/${id}`,
    }),
  }),
});

export const { useGetCommentsQuery } = commentsApi;
