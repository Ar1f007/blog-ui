import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

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
      if (axios.isAxiosError(e)) {
        if (!e.response) {
          throw e;
        }

        return rejectWithValue(e.response.data);
      }

      throw new Error('Something went wrong!');
    }
  },

  {
    condition: (_, { getState }) => {
      const { status } = getState();

      if (status === 'pending') return false;
    },
  },
);
