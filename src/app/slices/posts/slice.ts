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

export const { clearCurrentPostData } = postSlice.actions;
export default postSlice.reducer;
