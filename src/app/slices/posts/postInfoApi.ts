import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/dist/query/react';

import { BASE_URL } from '../../../constant';

import { setBookmark, setCurrViewPostLikesCount } from './slice';

import type {
  BookmarkParams,
  IsBookmarkedRes,
  ReactionCountRes,
  ReactionPayload,
} from './types';

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

    createOrRemoveBookmark: builder.mutation<IsBookmarkedRes, BookmarkParams>({
      query: (params) => ({
        url: `/bookmarks/${params.postId}/${params.userId}`,
        method: 'POST',
        body: {},
      }),

      onQueryStarted(arg, api) {
        api.queryFulfilled.then((res) => {
          api.dispatch(setBookmark(res.data.isBookmarked));
        });
      },
    }),

    isBookmarked: builder.query<IsBookmarkedRes, BookmarkParams>({
      query: (params) => ({
        url: `/bookmarks/${params.postId}/${params.userId}`,
        method: 'GET',
      }),

      onQueryStarted(arg, api) {
        api.queryFulfilled.then((res) => {
          api.dispatch(setBookmark(res.data.isBookmarked));
        });
      },
    }),
  }),
});

export const {
  useAddReactionToPostMutation,
  useCreateOrRemoveBookmarkMutation,
  useIsBookmarkedQuery,
} = postInfoApi;
