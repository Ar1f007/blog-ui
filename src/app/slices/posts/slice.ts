import { createSlice } from '@reduxjs/toolkit';

import {
  createPostAction,
  fetchPostsAction,
  fetchSinglePostAction,
} from './actions';

import type { PostsState } from './types';

const initialState = {
  loading: false,
  error: null,
  posts: [],
  currentPost: null,
  currentlyViewedPost: null,
} as PostsState;

const postSlice = createSlice({
  name: 'posts',
  initialState,
  reducers: {
    clearCurrentPostData: (state) => {
      state.currentPost = null;
    },

    incrementCount: (state, action) => {
      if (!state.currentlyViewedPost) return;

      if (action.payload === 'like') {
        state.currentlyViewedPost.post.likesCount += 1;
      }

      if (action.payload === 'comment') {
        state.currentlyViewedPost.post.totalComments += 1;
      }
    },

    decrementCount: (state, action) => {
      if (!state.currentlyViewedPost) return;
      if (action.payload === 'like') {
        state.currentlyViewedPost.post.likesCount -= 1;
      }

      if (action.payload === 'comment') {
        state.currentlyViewedPost.post.totalComments -= 1;
      }
    },

    setCurrViewPostLikesCount: (state, action) => {
      if (!state.currentlyViewedPost) return;

      state.currentlyViewedPost.post.likesCount = action.payload;
    },

    setCommentCount: (state, action) => {
      if (!state.currentlyViewedPost) return;

      state.currentlyViewedPost.post.totalComments = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(createPostAction.pending, (state) => {
      state.loading = true;
    });

    builder.addCase(createPostAction.fulfilled, (state, action) => {
      state.loading = false;
      state.currentPost = action.payload;
      state.error = null;
    });

    builder.addCase(createPostAction.rejected, (state, action) => {
      state.loading = false;
      state.currentPost = null;

      if (action.payload) {
        state.error = action.payload;
      } else {
        state.error = action.error;
      }
    });
    // ----------------------------------------------------------------------
    builder.addCase(fetchPostsAction.pending, (state) => {
      state.loading = true;
    });

    builder.addCase(fetchPostsAction.fulfilled, (state, action) => {
      state.loading = false;
      state.posts = action.payload;
      state.error = null;
    });

    builder.addCase(fetchPostsAction.rejected, (state, action) => {
      state.loading = false;
      state.posts = [];

      if (action.payload) {
        state.error = action.payload;
      } else {
        state.error = action.error;
      }
    });
    // ----------------------------------------------------------------------
    builder.addCase(fetchSinglePostAction.pending, (state) => {
      state.loading = true;
    });

    builder.addCase(fetchSinglePostAction.fulfilled, (state, action) => {
      state.loading = false;
      state.currentlyViewedPost = action.payload;
      state.error = null;
    });

    builder.addCase(fetchSinglePostAction.rejected, (state, action) => {
      state.loading = false;
      state.currentlyViewedPost = null;

      if (action.payload) {
        state.error = action.payload;
      } else {
        state.error = action.error;
      }
    });
  },
});

export const {
  clearCurrentPostData,
  incrementCount,
  decrementCount,
  setCommentCount,
  setCurrViewPostLikesCount,
} = postSlice.actions;
export default postSlice.reducer;
