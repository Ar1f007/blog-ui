import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

import { BASE_URL } from '../../../constant';

import type { CommentsData } from './types';

export const commentsApi = createApi({
  reducerPath: 'commentsApi',
  baseQuery: fetchBaseQuery({
    baseUrl: BASE_URL,
    credentials: 'include',
  }),
  refetchOnMountOrArgChange: 30,
  tagTypes: ['comments'],
  endpoints: (builder) => ({
    getComments: builder.query<CommentsData, string>({
      query: (id) => `/comments/${id}`,
      providesTags: ['comments'],
    }),

    addComment: builder.mutation({
      query: (payload) => ({
        url: '/comments',
        method: 'POST',
        body: payload,
      }),

      invalidatesTags: ['comments'],
    }),
  }),
});

export const { useGetCommentsQuery, useAddCommentMutation } = commentsApi;
