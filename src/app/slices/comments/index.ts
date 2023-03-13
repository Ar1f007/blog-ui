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

    updateComment: builder.mutation({
      query: ({ commentId, body }) => ({
        url: `/comments/update/${commentId}`,
        method: 'PATCH',
        body,
      }),
      invalidatesTags: ['comments'],
    }),

    deleteComment: builder.mutation({
      query: (id) => ({
        url: `/comments/${id}`,
        method: 'DELETE',
      }),
      invalidatesTags: ['comments'],
    }),
  }),
});

export const {
  useGetCommentsQuery,
  useAddCommentMutation,
  useUpdateCommentMutation,
  useDeleteCommentMutation,
} = commentsApi;
