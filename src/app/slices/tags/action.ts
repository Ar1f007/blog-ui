import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

import { transformOptions } from '../helpers';

import tagApi from './services';

export const getAllTagActions = createAsyncThunk('tags/fetch', async (_, { rejectWithValue }) => {
  try {
    const { data } = await tagApi.getAllTags();

    const tags = transformOptions(data.tags);

    return tags;
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
