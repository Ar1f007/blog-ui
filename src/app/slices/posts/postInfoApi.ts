import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/dist/query/react';

import { BASE_URL } from '../../../constant';

import { setCurrViewPostLikesCount } from './slice';

import type { ReactionCountRes, ReactionPayload } from './types';

export const postInfoApi = createApi({
  reducerPath: 'postInfoApi',
  baseQuery: fetchBaseQuery({
    baseUrl: BASE_URL,
    credentials: 'include',
  }),
  endpoints: (builder) => ({
    addReactionToPost: builder.mutation<ReactionCountRes, ReactionPayload>({
      query: (data) => ({
        url: `/posts/reactions`,
        method: 'POST',
        body: data,
      }),

      onQueryStarted(arg, api) {
        api.queryFulfilled.then((res) => {
          api.dispatch(setCurrViewPostLikesCount(res.data.reactionCount));
        });
      },
    }),
  }),
});

export const { useAddReactionToPostMutation } = postInfoApi;
