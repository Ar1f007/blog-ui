import { createAsyncThunk } from '@reduxjs/toolkit';

import { handleError } from '../helpers';

import postApi from './services';

import type {
  CreatePost,
  IsLikedQuery,
  IsLikedQueryRes,
  PostDetails,
} from './types';

export const createPostAction = createAsyncThunk(
  'posts/create',
  async (payload: CreatePost, { rejectWithValue }) => {
    try {
      const { data } = await postApi.createPost(payload);

      return data.post;
    } catch (error) {
      return rejectWithValue(handleError(error));
    }
  },
);

export const fetchPostsAction = createAsyncThunk(
  'posts/fetch',
  async (_, { rejectWithValue }) => {
    try {
      const { data } = await postApi.fetchPosts();

      return data.posts || [];
    } catch (error) {
      return rejectWithValue(handleError(error));
    }
  },
);

export const fetchSinglePostAction = createAsyncThunk<PostDetails, string>(
  'posts/fetch/singlePost',
  async (slug, { rejectWithValue }) => {
    try {
      const { data } = await postApi.fetchSinglePost(slug);

      return data.data;
    } catch (error) {
      return rejectWithValue(handleError(error));
    }
  },
);

export const isPostLikedAction = createAsyncThunk<
  IsLikedQueryRes,
  IsLikedQuery
>('posts/isLiked', async (queryParams, { rejectWithValue }) => {
  try {
    const { data } = await postApi.isPostLiked(queryParams);

    return data;
  } catch (error) {
    return rejectWithValue(handleError(error));
  }
});
