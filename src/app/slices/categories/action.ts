import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

import { handleError, transformOptions } from '../helpers';

import categoryApi from './services';

import type { CategoryState } from './types';
import type { Option } from '../helpers';

export const getCategoriesAction = createAsyncThunk<
  Option[],
  void,
  { state: CategoryState }
>(
  'categories/fetch',
  async (_, { rejectWithValue }) => {
    try {
      const { data } = await categoryApi.getCategories();

      const categories = transformOptions(data.categories);

      return categories;
    } catch (e) {
      return rejectWithValue(handleError(e));
    }
  },
  {
    condition: (_, { getState }) => {
      const { loading } = getState();

      if (loading === 'pending') {
        return false;
      }
    },
  },
);
