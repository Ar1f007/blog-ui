import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

import postApi from './services';

import type { CreatePost } from './types';

export const createPostAction = createAsyncThunk('posts/create', async (payload: CreatePost, { rejectWithValue }) => {
  try {
    const { data } = await postApi.createPost(payload);

    return data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      if (!error.response) {
        throw error;
      }

      return rejectWithValue(error.response.data);
    }

    throw new Error('Something went wrong!');
  }
});
