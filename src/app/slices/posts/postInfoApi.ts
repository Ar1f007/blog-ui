import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/dist/query/react';

import { BASE_URL } from '../../../constant';

import type { IsLikedQuery, ReactionPayload } from './types';

export const postInfoApi = createApi({
  reducerPath: 'postInfoApi',
  baseQuery: fetchBaseQuery({
    baseUrl: BASE_URL,
    credentials: 'include',
  }),
  endpoints: (builder) => ({
    addReactionToPost: builder.mutation({
      query: (data: ReactionPayload) => ({
        url: `/posts/reactions`,
        method: 'POST',
        body: data,
      }),

      onQueryStarted(arg, api) {
        api.queryFulfilled.then((res) => {
          console.log(res);
        });
      },
    }),
  }),
});

export const { useAddReactionToPostMutation } = postInfoApi;
