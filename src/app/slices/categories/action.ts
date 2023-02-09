import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

import categoryApi from './services';
import { formatCategoryOptions } from './utils';

export const getCategoriesAction = createAsyncThunk('categories/fetch', async (_, { rejectWithValue }) => {
  try {
    const { data } = await categoryApi.getCategories();

    const categories = formatCategoryOptions(data.categories);

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
