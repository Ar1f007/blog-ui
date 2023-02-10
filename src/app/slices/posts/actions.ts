import { createAsyncThunk } from '@reduxjs/toolkit';

import { handleError } from '../helpers';

import postApi from './services';

import type { CreatePost } from './types';

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
