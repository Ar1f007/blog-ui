import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

import userApi from './services';

import type { RegisterPayload } from './types';

export const registerUserAction = createAsyncThunk(
  'users/register',
  async (registerPayload: RegisterPayload, { rejectWithValue }) => {
    try {
      const { data } = await userApi.register(registerPayload);
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
  },
);
