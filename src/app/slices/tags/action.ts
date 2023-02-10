import { createAsyncThunk } from '@reduxjs/toolkit';

import { handleError, transformOptions } from '../helpers';

import tagApi from './services';

import type { TagState } from './types';
import type { Option } from '../helpers';

export const getAllTagActions = createAsyncThunk<
  Option[],
  void,
  { state: TagState }
>(
  'tags/fetch',

  async (_, { rejectWithValue }) => {
    try {
      const { data } = await tagApi.getAllTags();

      const tags = transformOptions(data.tags);

      return tags;
    } catch (e) {
      return rejectWithValue(handleError(e));
    }
  },

  {
    condition: (_, { getState }) => {
      const { status } = getState();

      if (status === 'pending') return false;
    },
  },
);
