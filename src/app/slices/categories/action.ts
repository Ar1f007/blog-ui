import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

import { transformOptions } from '../helpers';

import categoryApi from './services';

export const getCategoriesAction = createAsyncThunk('categories/fetch', async (_, { rejectWithValue }) => {
  try {
    const { data } = await categoryApi.getCategories();

    const categories = transformOptions(data.categories);

    return categories;
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